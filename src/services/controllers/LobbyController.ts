// src/controllers/LobbyController.ts

import TcpServer from 'react-native-tcp-socket'

import { encodeIp, getIpV4, shortenString } from '@/util'

// Import TransferUser type
import { TransferUser } from '../LobbyService'

export interface Lobby {
  id: string
  users: Record<string, TransferUser>
  collection?: { image: string; name: string }
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

  static async processImage(
    socket: TcpServer.Socket,
    body: { image: string } | null,
  ): Promise<ResponseObject> {
    try {
      const remoteAddress = socket.remoteAddress || ''

      if (!this.currentLobby) {
        return { error: 'No lobby found', status: 400 }
      }

      if (!this.currentLobby.users[remoteAddress]) {
        return { error: 'User not found in lobby', status: 404 }
      }

      if (!body?.image) {
        return { error: 'No image found in request body', status: 400 }
      }

      this.currentLobby.users[remoteAddress].profileImage = body.image

      console.log('Processed image:', shortenString(this.currentLobby.users[remoteAddress].profileImage))
      return { data: { image: {[remoteAddress]: body.image} }, status: 201 }
    } catch (error: any) {
      console.error('Error processing image:', error)
      return { error: error.message, status: 400 }
    }
  }

  static async setCollection(body: { image: string; name: string }): Promise<ResponseObject> {
    try {
      if (!this.currentLobby) {
        return { error: 'No lobby found', status: 400 }
      }

      this.currentLobby.collection = body
      console.log('Set collection:', `{image: ${shortenString(body.image)}, name: ${body.name}}`)
      return { data: {collection: body}, status: 201 }
    } catch (error: any) {
      console.error('Error setting collection:', error)
      return { error: error.message, status: 400 }
    }
  }
}

export default LobbyController
