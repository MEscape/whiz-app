import TcpServer from 'react-native-tcp-socket'

import { shortenString } from '@/util'

import { LobbyRoutes } from './routes/LobbyRoutes'

import LobbyController, { ResponseObject } from '@/services/controllers/LobbyController'

export class PeerService {
  private static instance: PeerService | null = null
  private server: TcpServer.Server | null = null
  public connections = new Map<string, TcpServer.Socket>()
  public isServerRunning = false

  private messageBuffers = new Map<string, string>()
  private readonly MESSAGE_DELIMITER = '<<<EOF>>>'

  public static getInstance(): PeerService {
    if (!PeerService.instance) {
      PeerService.instance = new PeerService()
    }
    return PeerService.instance
  }

  public startServer(port = 8080) {
    if (this.isServerRunning) {
      console.log('Server is already running')
      return
    }

    this.server = TcpServer.createServer(socket => {
      socket.setEncoding('utf-8')
      const remoteAddress = socket.remoteAddress || ''
      this.connections.set(remoteAddress, socket)
      this.messageBuffers.set(remoteAddress, '')

      console.log('User connected:', remoteAddress)

      socket.on('data', async data => {
        // Get the existing buffer for this client and append new data.
        const currentBuffer = this.messageBuffers.get(remoteAddress) || ''
        const newBuffer = currentBuffer + data.toString('utf-8')
        this.messageBuffers.set(remoteAddress, newBuffer)

        // Process all complete messages in the buffer.
        let delimiterIndex = newBuffer.indexOf(this.MESSAGE_DELIMITER)
        while (delimiterIndex !== -1) {
          // Extract complete message (without the delimiter).
          const completeMessage = newBuffer.slice(0, delimiterIndex)
          // Update the buffer with the remaining part.
          this.messageBuffers.set(
            remoteAddress,
            newBuffer.slice(delimiterIndex + this.MESSAGE_DELIMITER.length),
          )

          try {
            const parsedData = JSON.parse(completeMessage)
            console.log('Received message <server>:', shortenString(completeMessage))
            await this.routeRequest(socket, parsedData)
          } catch (error) {
            console.error('Error processing message:', error)
            socket.write(JSON.stringify({ error: 'Invalid request format', status: 400 }))
          }

          // Get the updated buffer and check for another complete message.
          const updatedBuffer = this.messageBuffers.get(remoteAddress)
          delimiterIndex = updatedBuffer.indexOf(this.MESSAGE_DELIMITER)
        }
      })

      socket.on('close', () => {
        console.log('User disconnected')
        this.connections.delete(socket.remoteAddress || '')
      })

      socket.on('error', err => {
        console.error('Socket error:', err)
        this.connections.delete(socket.remoteAddress || '')
      })
    })

    this.server?.listen({ host: '0.0.0.0', port }, () => {
      console.log(`TCP server started on port ${port}`)
      this.isServerRunning = true
    })
  }

  public stopServer() {
    if (this.server) {
      this.connections.forEach(socket => socket.end())
      this.server.close()
      this.isServerRunning = false
      LobbyController.clearCurrentLobby()
    }
  }

  public sendData(data: ResponseObject, clientId?: string) {
    const message = JSON.stringify(data) + this.MESSAGE_DELIMITER

    if (clientId || data?.clientId) {
      // Send to specific client
      const socket = this.connections.get(clientId)
      if (socket) {
        socket.write(message)
      } else {
        console.warn(`Client ${clientId} not found`)
      }
    } else {
      // Broadcast to all clients
      this.connections.forEach(socket => {
        socket.write(message)
      })
    }
  }

  private async routeRequest(socket: TcpServer.Socket, data: any) {
    const { body, clientId, method, path } = data
    const response = await LobbyRoutes.handleRequest(socket, method, path, body)
    this.sendData(response, clientId)
  }
}
