import { Instance, SnapshotOut, types } from 'mobx-state-tree'

import { TransferUser } from '@/services'

export const TransferUserModel = types
  .model('TransferUser')
  .props({
    equippedEmoji: types.maybeNull(types.string),
    isHost: types.optional(types.boolean, false),
    profileImage: types.maybeNull(types.string),
    username: types.string,
  }) 

export const GameStoreModel = types
  .model('GameStore')
  .props({
    isHost: types.optional(types.boolean, false),
    lobbyId: types.optional(types.string, ''),
    users: types.map(TransferUserModel),
  })
  .actions(self => ({
    clearStore() {
      self.users.clear()
      self.lobbyId = ''
      self.isHost = false
    },
    setIsHost: (isHost: boolean) => {
      self.isHost = isHost
    },
    setLobbyId: (lobbyId: string) => {
      self.lobbyId = lobbyId
    },
    setProfileImage: (imageData: Record<string, string>) => {
      const [userId, imageUrl] = Object.entries(imageData)[0]
      const user = self.users.get(userId)
      if (user) {
        user.profileImage = imageUrl
      }
    },
    setUsers: (users: Record<string, TransferUser>) => {
      self.users.replace(users)
    }
  }))

export interface GameStore extends Instance<typeof GameStoreModel> {}
export interface GameStoreSnapshot extends SnapshotOut<typeof GameStoreModel> {}
