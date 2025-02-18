import TcpSocket from 'react-native-tcp-socket'

import { getIpV4 } from '../util'
import { PeerService } from './PeerService'
import TcpEventManager from './TcpEventManager'

let tcpClient: TcpSocket.Socket | null = null

export interface TransferUser {
  username: string
  profileImage: string
  equippedEmoji: string
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

export const handleJoinLobby = async (ip: string, transferUser: TransferUser) => {
  try {
    tcpClient = TcpSocket.createConnection({ host: ip, port: 8080 }, () => {
      console.log(`Connected to TCP server at ${ip}:8080`)
      TcpEventManager.emit('connected')

      sendData({
        body: { user: transferUser },
        method: 'POST',
        path: '/lobby'
      })
    })

    tcpClient.on('data', (data) => {
      const dataString = data.toString()
      console.log('Received from server:', dataString)
      TcpEventManager.emit('data', JSON.parse(dataString))
    })

    tcpClient.on('error', (error) => {
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
}

export const sendData = (data: RequestObject) => {
  if (!tcpClient) {
    console.warn('Cannot send data: TCP client is not connected')
    return false
  }

  try {
    tcpClient.write(JSON.stringify(data))
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
