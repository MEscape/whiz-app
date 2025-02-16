// src/routes/LobbyRoutes.ts

import LobbyController from '../controllers/LobbyController'

interface ResponseObject {
  data?: any
  error?: string
  status: number
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
    socket: any, // Ideally, you can replace `any` with the specific type for your socket (e.g. TcpSocket.Socket)
    method: string,
    path: string,
    body: any = null,
  ): Promise<ResponseObject> {
    try {
      // If the path is exactly '/lobby' and the method is POST, create a new lobby.
      if (path === '/lobby' && method === 'POST') {
        return await LobbyController.createLobby(socket, body)
      }

      // For paths like '/lobby/:lobbyId', deconstruct the path to obtain the lobbyId.
      const pathParts = path.split('/').filter(Boolean) // removes any empty strings
      if (pathParts[0] === 'lobby' && pathParts[1]) {
        const lobbyId = pathParts[1]
        if (method === 'GET') {
          return await LobbyController.getLobby(socket, lobbyId)
        } else if (method === 'DELETE') {
          return await LobbyController.deleteLobby(socket, lobbyId)
        }
      }

      return { error: 'Route not found', status: 404 }
    } catch (error: any) {
      console.error('Error handling LobbyRoutes:', error)
      return { error: error.message || 'Internal server error', status: 500 }
    }
  }
}

export default LobbyRoutes
