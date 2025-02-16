// src/controllers/LobbyController.ts

import { encodeIp, getIpV4 } from '@/util';

export interface Lobby {
  id: string;
  name: string;
  users: string[];
}

export interface ResponseObject {
  data?: any;
  message?: string;
  error?: string;
  status: number;
}

export interface CreateLobbyBody {
  name: string;
}

class LobbyController {
  /**
   * Creates a new lobby with the provided name.
   * @param socket - The client socket.
   * @param body - Request body containing lobby details.
   * @returns Response with lobby data.
   */
  static async createLobby(
    socket: any, // Replace `any` with your specific socket type if available.
    body: CreateLobbyBody
  ): Promise<ResponseObject> {
    try {
      if (!body || !body.name) {
        throw new Error('Lobby name is required');
      }

      const ip = await getIpV4();
      const lobbyId = encodeIp(ip);

      const lobby: Lobby = {
        id: lobbyId,
        name: body.name,
        users: [socket.remoteAddress]
      };

      console.log(`Lobby created: ${lobbyId}`);
      return { data: lobby, status: 201 };
    } catch (error: any) {
      console.error('Error creating lobby:', error);
      return { error: error.message, status: 400 };
    }
  }

  /**
   * Retrieves the lobby information by its ID.
   * @param socket - The client socket.
   * @param lobbyId - ID of the lobby.
   * @returns Lobby data.
   */
  static async getLobby(socket: any, lobbyId: string): Promise<ResponseObject> {
    try {
      if (!lobbyId) {
        throw new Error('Lobby ID is required');
      }
      // Example: Return dummy lobby info; integrate with your data store if needed.
      console.log(`Lobby fetched: ${lobbyId}`);
      return { data: { id: lobbyId, users: [] }, status: 200 };
    } catch (error: any) {
      console.error('Error fetching lobby:', error);
      return { error: error.message, status: 404 };
    }
  }

  /**
   * Deletes the specified lobby.
   * @param socket - The client socket.
   * @param lobbyId - ID of the lobby to delete.
   * @returns Response message.
   */
  static async deleteLobby(socket: any, lobbyId: string): Promise<ResponseObject> {
    try {
      if (!lobbyId) {
        throw new Error('Lobby ID is required');
      }
      console.log(`Lobby deleted: ${lobbyId}`);
      return { message: 'Lobby deleted', status: 200 };
    } catch (error: any) {
      console.error('Error deleting lobby:', error);
      return { error: error.message, status: 400 };
    }
  }
}

export default LobbyController;
