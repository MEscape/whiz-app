import { Instance, SnapshotOut, types } from 'mobx-state-tree'

import { TransferUser } from '@/services'

export const GameStoreModel = types
  .model('GameStore')
  .props({
    isHost: types.optional(types.boolean, false),
    lobbyId: types.optional(types.string, ''),
    users: types.map(types.frozen<TransferUser>()),
  })
  .actions(self => ({
    setIsHost: (isHost: boolean) => {
      self.isHost = isHost
    },
    setLobbyId: (lobbyId: string) => {
      self.lobbyId = lobbyId
    },
    setUsers: (users: Record<string, TransferUser>) => {
      self.users.replace(users)
    },
  }))

export interface GameStore extends Instance<typeof GameStoreModel> {}
export interface GameStoreSnapshot extends SnapshotOut<typeof GameStoreModel> {}
