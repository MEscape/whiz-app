import TcpServer from 'react-native-tcp-socket'

import { encodeIp, getIpV4, shortenString } from '@/util'

import type { TransferUser } from '../LobbyService'

import { Task } from '@/app/library'
import { Codes } from '@/services/Codes'

export interface Lobby {
  id: string
  users: Record<string, TransferUser>
  collection?: { image: string; name: string }
  stage?: Task
}

export interface ResponseObject {
  data?: any
  message?: string
  error?: string
  status: number
  code: string
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

      if (Object.keys(this.currentLobby.users).length >= 16) {
        return { code: Codes.TOO_MANY_USERS, error: 'Too many Users in the Lobby', status: 400 }
      }

      this.currentLobby.users[remoteAddress] = body?.user || null

      console.log('Current lobby users:', this.currentLobby.users)
      return { code: Codes.LOBBY, data: this.currentLobby, status: 201 }
    } catch (error: any) {
      console.error('Error joining lobby:', error)
      return { code: error.code || Codes.UNEXPECTED_ERROR, error: error.message, status: 400 }
    }
  }

  static async processImage(
    socket: TcpServer.Socket,
    body: { image: string } | null,
  ): Promise<ResponseObject> {
    try {
      const remoteAddress = socket.remoteAddress || ''

      if (!this.currentLobby) {
        return { code: Codes.LOBBY_NOT_FOUND, error: 'No lobby found', status: 400 }
      }

      if (!this.currentLobby.users[remoteAddress]) {
        return { code: Codes.USER_NOT_FOUND, error: 'User not found in lobby', status: 404 }
      }

      if (!body?.image) {
        return { code: Codes.IMAGE_NOT_FOUND, error: 'No image found in request body', status: 400 }
      }

      this.currentLobby.users[remoteAddress].profileImage = body.image

      console.log(
        'Processed image:',
        shortenString(this.currentLobby.users[remoteAddress].profileImage),
      )
      return { code: Codes.IMAGE, data: { image: { [remoteAddress]: body.image } }, status: 201 }
    } catch (error: any) {
      console.error('Error processing image:', error)
      return { code: error.code || Codes.UNEXPECTED_ERROR, error: error.message, status: 400 }
    }
  }

  static async setCollection(body: { image: string; name: string }): Promise<ResponseObject> {
    try {
      if (!this.currentLobby) {
        return { code: Codes.LOBBY_NOT_FOUND, error: 'No lobby found', status: 400 }
      }

      this.currentLobby.collection = body
      console.log('Set collection:', `{image: ${shortenString(body.image)}, name: ${body.name}}`)
      return { code: Codes.COLLECTION, data: { collection: body }, status: 201 }
    } catch (error: any) {
      console.error('Error setting collection:', error)
      return { code: error.code || Codes.UNEXPECTED_ERROR, error: error.message, status: 400 }
    }
  }

  static async setStage(body: Task): Promise<ResponseObject> {
    try {
      if (!this.currentLobby) {
        return { code: Codes.LOBBY_NOT_FOUND, error: 'No lobby found', status: 400 }
      }

      this.currentLobby.stage = body

      return { code: Codes.STAGE, data: body, status: 201 }
    } catch (error: any) {
      console.error('Error setting collection:', error)
      return { code: error.code || Codes.UNEXPECTED_ERROR, error: error.message, status: 400 }
    }
  }
}

export default LobbyController
