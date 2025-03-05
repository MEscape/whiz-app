import TcpServer from 'react-native-tcp-socket'

import { PeerService } from '@/services'
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
  clientId?: string
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

  static async leaveLobby(socket: TcpServer.Socket) {
    try {
      const remoteAddress = socket.remoteAddress || ''

      if (!this.currentLobby) {
        return { code: Codes.LOBBY_NOT_FOUND, error: 'No lobby found', status: 400 }
      }

      if (!this.currentLobby.users[remoteAddress]) {
        return { code: Codes.USER_NOT_FOUND, error: 'User not found in lobby', status: 404 }
      }

      console.log(
        'User Removed from the lobby:',
        this.currentLobby.users[remoteAddress],
        `${Object.keys(this.currentLobby.users).length - 1}/16 left`,
      )
      delete this.currentLobby.users[remoteAddress]
      PeerService.getInstance().connections.delete(remoteAddress)

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

      if (body.type === 4) setImmediate(() => this.buildRandomPairs())
      return { code: Codes.STAGE, data: body, status: 201 }
    } catch (error: any) {
      console.error('Error setting collection:', error)
      return { code: error.code || Codes.UNEXPECTED_ERROR, error: error.message, status: 400 }
    }
  }

  static async buildRandomPairs() {
    const users = Object.keys(this.currentLobby.users)
    for (let i = users.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[users[i], users[j]] = [users[j], users[i]]
    }

    for (let i = 0; i < users.length; i += 2) {
      if (i + 1 > users.length) {
        const user1 = users[i]
        const user2 = users[i + 1]

        // Send each user their pair
        PeerService.getInstance().sendData(
          {
            code: Codes.PAIR,
            data: { id: user2, username: this.currentLobby.users[user2].username },
            status: 201,
          },
          user1,
        )
        PeerService.getInstance().sendData(
          {
            code: Codes.PAIR,
            data: { id: user1, username: this.currentLobby.users[user1].username },
            status: 201,
          },
          user2,
        )

        console.log(`Paired ${user1} with ${user2}`)
      } else {
        PeerService.getInstance().sendData({ code: Codes.PAIR, status: 204 }, users[i])
        console.warn(`User ${users[i]} has no pair`)
      }
    }
  }
}

export default LobbyController
