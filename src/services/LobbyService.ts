import RNFS from 'react-native-fs'
import TcpSocket from 'react-native-tcp-socket'

import { version } from '@/constants'
import { getIpV4, shortenString, showErrorToast } from '@/util'

import { PeerService } from './PeerService'
import TcpEventManager from './TcpEventManager'

import { Codes } from '@/services/Codes'

let tcpClient: TcpSocket.Socket | null = null

export interface TransferUser {
  username: string
  profileImage: string
  equippedEmoji: string
  isHost: boolean
  points: number
  rank: number
  prevRank: number
}

export const createLobby = async (transferUser: TransferUser) => {
  try {
    const peerService = PeerService.getInstance()

    if (!peerService.isServerRunning) {
      peerService.startServer()
      console.log('Server started on this device')
    }

    const ip = await getIpV4()
    joinLobby(ip, transferUser)
  } catch (error) {
    console.error('Error creating lobby:', error)
    TcpEventManager.emit('error', error)
  }
}

let messageBuffer: string = ''
const MESSAGE_DELIMITER = '<<<EOF>>>'
let initialize = false

export const joinLobby = async (ip: string, transferUser: TransferUser) => {
  try {
    const timeout = setTimeout(() => {
      console.error('Connection timeout: Unable to join lobby')
      showErrorToast('error.unableConnect')
      if (tcpClient) {
        tcpClient.destroy()
        tcpClient = null
      }
    }, 5000)

    tcpClient = TcpSocket.createConnection({ host: ip, port: 8080 }, async () => {
      initialize = true

      clearTimeout(timeout)
      console.log(`Connected to TCP server at ${ip}:8080`)

      sendData({
        body: { user: { ...transferUser, profileImage: null } },
        method: 'POST',
        path: '/lobby',
      })
    })

    tcpClient.on('data', async data => {
      // Append new data to the accumulated buffer.
      messageBuffer += data.toString('utf-8')

      // Look for the delimiter in the current buffer.
      let delimiterIndex = messageBuffer.indexOf(MESSAGE_DELIMITER)

      // Process each complete message (data before a delimiter)
      while (delimiterIndex !== -1) {
        // Extract the complete message (without the delimiter)
        const completeMessage = messageBuffer.slice(0, delimiterIndex)

        // Remove the processed message and the delimiter from the buffer.
        messageBuffer = messageBuffer.slice(delimiterIndex + MESSAGE_DELIMITER.length)

        try {
          console.log('Received from server:', shortenString(completeMessage))
          const parsedData = JSON.parse(completeMessage)

          if (parsedData?.code === Codes.IMAGE) {
            TcpEventManager.emit('image', parsedData.data.image)
          } else if (parsedData?.error) {
            TcpEventManager.emit('error', parsedData)

            if (parsedData?.code === Codes.TOO_MANY_USERS) {
              initialize = false
              if (tcpClient) {
                tcpClient.destroy()
                tcpClient = null
              }
            }
          } else {
            if (initialize) {
              TcpEventManager.emit('connected', {
                id: tcpClient.remoteAddress,
                isHost: transferUser.isHost,
              })
              initialize = false

              if (transferUser.profileImage) {
                const base64Image = await RNFS.readFile(transferUser.profileImage, 'base64')

                sendData({
                  body: { image: base64Image },
                  method: 'POST',
                  path: '/image',
                })
              }
            }

            TcpEventManager.emit('data', parsedData)
          }
        } catch (error) {
          console.error('Error processing message:', error)
        }

        delimiterIndex = messageBuffer.indexOf(MESSAGE_DELIMITER)
      }
    })

    tcpClient.on('error', error => {
      console.error('Client TCP error:', error)
      TcpEventManager.emit('error', error)
    })

    tcpClient.on('close', () => {
      console.log('TCP client connection closed')
      TcpEventManager.emit('close')
      tcpClient = null
    })
  } catch (error) {
    console.error('Error joining lobby:', error)
    TcpEventManager.emit('error', error)
  }
}

export interface RequestObject {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  path: string
  body?: any
  version?: string
}

export const sendData = (data: RequestObject) => {
  data = { ...data, version }

  if (!tcpClient) {
    console.warn('Cannot send data: TCP client is not connected')
    return false
  }

  try {
    tcpClient.write(JSON.stringify(data) + MESSAGE_DELIMITER)
    return true
  } catch (error) {
    console.error('Error sending data:', error)
    TcpEventManager.emit('error', error)
    return false
  }
}

export const handleDisconnect = () => {
  if (tcpClient) {
    console.log('Disconnecting TCP client...')
    sendData({ method: 'DELETE', path: `/lobby` })
    tcpClient.destroy()
    tcpClient = null

    const peerService = PeerService.getInstance()
    if (peerService.isServerRunning) {
      peerService.stopServer()
      console.log('Server stopped on this device')
    }
  } else {
    console.warn('No TCP client to disconnect.')
  }
}
