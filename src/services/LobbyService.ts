import RNFS from 'react-native-fs'
import TcpSocket from 'react-native-tcp-socket'

import { getIpV4, shortenString } from '@/util'

import { PeerService } from './PeerService'
import TcpEventManager from './TcpEventManager'
import { version } from '@/constants'

let tcpClient: TcpSocket.Socket | null = null

export interface TransferUser {
  username: string
  profileImage: string
  equippedEmoji: string
  isHost: boolean
}

export const handleCreateLobby = async (transferUser: TransferUser) => {
  try {
    const peerService = PeerService.getInstance()

    if (!peerService.isServerRunning) {
      peerService.startServer()
      console.log('Server started on this device')
    }

    const ip = await getIpV4()
    handleJoinLobby(ip, transferUser)
  } catch (error) {
    console.error('Error creating lobby:', error)
    TcpEventManager.emit('error', error)
  }
}

  let messageBuffer: string = ''
  const MESSAGE_DELIMITER = '<<<EOF>>>'

export const handleJoinLobby = async (ip: string, transferUser: TransferUser) => {
  try {
    tcpClient = TcpSocket.createConnection({ host: ip, port: 8080 }, async () => {
      console.log(`Connected to TCP server at ${ip}:8080`)
      TcpEventManager.emit('connected', transferUser.isHost)

      sendData({
        body: { user: {...transferUser, profileImage: null} },
        method: 'POST',
        path: '/lobby',
      })

      if (transferUser.profileImage) {
        const base64Image = await RNFS.readFile(transferUser.profileImage, 'base64')

        sendData({
          body: { image: base64Image },
          method: 'POST',
          path: '/image',
        })
      }
    })

    tcpClient.on('data', data => {
      messageBuffer += data.toString('utf-8')
      if (data.toString('utf-8').endsWith(MESSAGE_DELIMITER)) {
        try {
          const cleanMessage = messageBuffer.slice(0, -MESSAGE_DELIMITER.length)
          console.log('Received from server:', shortenString(cleanMessage))
          const parsedData = JSON.parse(cleanMessage)            

          if (parsedData.data.image) {
            TcpEventManager.emit('image', parsedData.data.image)
          } else {
            TcpEventManager.emit('data', parsedData)
          }
        } catch (error) {
          console.error('Error processing message:', error)
        }

        messageBuffer = ''
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
  data = {...data, version}

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
    tcpClient.destroy()
    tcpClient = null

    const peerService = PeerService.getInstance()
    if (peerService.isServerRunning) {
      peerService.stopServer()
      console.log('Server stopped on this device')
    }

    TcpEventManager.emit('close')
  } else {
    console.warn('No TCP client to disconnect.')
  }
}
