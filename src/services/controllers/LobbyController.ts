// src/controllers/LobbyController.ts

import TcpServer from 'react-native-tcp-socket'

import { encodeIp, getIpV4 } from '@/util'

// Import TransferUser type
import { TransferUser } from '../LobbyService'

export interface Lobby {
  id: string
  users: Record<string, TransferUser>
}

export interface ResponseObject {
  data?: any
  message?: string
  error?: string
  status: number
}

class LobbyController {
  private static currentLobby: Lobby | null = null

  static async joinLobby(
    socket: TcpServer.Socket,
    body: { user: TransferUser } | null,
  ): Promise<ResponseObject> {
    try {
      const remoteAddress = socket.remoteAddress || ''

      if (!this.currentLobby) {
        const ip = await getIpV4()
        this.currentLobby = {
          id: encodeIp(ip),
          users: {},
        }
      }

      // Add or update user
      this.currentLobby.users[remoteAddress] = body?.user || null

      console.log('Current lobby users:', this.currentLobby.users)
      return { data: this.currentLobby, status: 201 }
    } catch (error: any) {
      console.error('Error joining lobby:', error)
      return { error: error.message, status: 400 }
    }
  }

  static async getLobby(): Promise<ResponseObject> {
    if (!this.currentLobby) {
      return { error: 'No active lobby', status: 404 }
    }
    return { data: this.currentLobby, status: 200 }
  }

  static async deleteLobby(): Promise<ResponseObject> {
    this.currentLobby = null
    return { message: 'Lobby deleted', status: 200 }
  }

  static async handleImage(body: { image: string }): Promise<ResponseObject> {
    try {
      // For example, you could log or store the image
      console.log('Received image (base64) of length:', body.image.length)

      /*return {
        data: { image: body.image },
        message: 'New image received',
        status: 200,
      }*/
    } catch (error: any) {
      console.error('Error handling image:', error)
      return { error: error.message, status: 400 }
    }
  }
}

export default LobbyController
