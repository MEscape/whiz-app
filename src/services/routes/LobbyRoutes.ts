// src/routes/LobbyRoutes.ts

import TcpServer from 'react-native-tcp-socket'

import LobbyController from '../controllers/LobbyController'

import { Codes } from '@/services/Codes'

interface ResponseObject {
  data?: any
  error?: string
  status: number
  code: string
}

export class LobbyRoutes {
  /**
   * Handles incoming requests and delegates to the correct LobbyController method.
   * @param socket - The client socket.
   * @param method - HTTP-like method (GET, POST, DELETE).
   * @param path - The endpoint path.
   * @param body - Request body.
   * @returns A response object with either data or an error message.
   */
  static async handleRequest(
    socket: TcpServer.Socket,
    method: string,
    path: string,
    body: any = null,
  ): Promise<ResponseObject> {
    try {
      if (path === '/image' && method === 'POST') {
        return await LobbyController.processImage(socket, body)
      }

      if (path === '/lobby' && method === 'POST') {
        return await LobbyController.joinLobby(socket, body)
      }

      if (path === '/collection' && method === 'POST') {
        return await LobbyController.setCollection(body)
      }

      if (path === '/stage' && method === 'POST') {
        return await LobbyController.setStage(body)
      }

      return { code: Codes.ROUTE_NOT_FOUND, error: 'Route not found', status: 404 }
    } catch (error: any) {
      console.error('Error handling LobbyRoutes:', error)
      return {
        code: error.code || Codes.UNEXPECTED_ERROR,
        error: error.message || 'Internal server error',
        status: 500,
      }
    }
  }
}

export default LobbyRoutes
