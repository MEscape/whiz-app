import { Instance, SnapshotOut, types } from 'mobx-state-tree'
import RNFS from 'react-native-fs'

import { translate } from '@/i18n'
import { sendData, TransferUser } from '@/services'
import { base64ToImage, shortenString } from '@/util'

import { Images } from 'assets/images'

export const TransferUserModel = types
  .model('TransferUser')
  .props({
    equippedEmoji: types.maybeNull(types.string),
    isHost: types.optional(types.boolean, false),
    profileImage: types.maybeNull(types.string),
    username: types.string,
  }) 

export const CollectionModel = types.model('Collection').props({
  currentlySelecting: types.optional(types.boolean, false),
  image: types.union(
    types.maybeNull(types.string),
    types.enumeration("Images", Object.values(Images))
  ),
  name: types.maybeNull(types.string),
})

export const GameStoreModel = types
  .model('GameStore')
  .props({
    collection: types.optional(CollectionModel, {
      image: Images.CLASSIC,
      name: translate('collection.classicChaos') as string
    }),
    isHost: types.optional(types.boolean, false),
    lobbyId: types.optional(types.string, ''),
    processedImages: types.map(types.string),
    users: types.map(TransferUserModel)
  })
  .actions(self => ({
    clearCollection: () => {
      self.collection.image = Images.CLASSIC
      self.collection.name = translate('collection.classicChaos') as string
    },
    clearStore() {
      self.users.clear()
      self.lobbyId = ''
      self.isHost = false
      self.processedImages.clear()
      self.clearCollection()
      self.setCurrentlySelecting(false)
    },
    setCollection: async (collection: { image: string; name: string }) => {
      self.collection.image = collection.image
      self.collection.name = collection.name

      const image = Object.values(Images).includes(collection.image as Images)
        ? collection.image : await RNFS.readFile(collection.image, 'base64')

      sendData({body: {...collection, image}, method: 'POST', path: '/collection'})
    },
    setCurrentlySelecting: (isSelecting: boolean) => {
      self.collection.currentlySelecting = isSelecting
    },
    setIsHost: (isHost: boolean) => {
      self.isHost = isHost
    },
    setLobbyId: (lobbyId: string) => {
      self.lobbyId = lobbyId
    },
    setProcessedImages: (userId: string, imageUrl: string) => {
      self.processedImages.set(userId, imageUrl)
    },
    setProfileImage: (imageData: Record<string, string>) => {
      const [userId, imageUrl] = Object.entries(imageData)[0]
      console.log('Setting profile image:', userId, shortenString(imageUrl))
      const user = self.users.get(userId)
      if (user) {
        user.profileImage = imageUrl
      }
    },
    setRemoteCollection: async (collection: { image: string; name: string }) => {
      if (self.isHost) return
      
      const image = Object.values(Images).includes(collection.image as Images)
        ? collection.image : await base64ToImage(collection.image)
      self.collection.image = image
      self.collection.name = collection.name
    },
    setUsers: (users: Record<string, TransferUser>) => {
      self.users.replace(users)
    }
  }))

export interface GameStore extends Instance<typeof GameStoreModel> {}
export interface GameStoreSnapshot extends SnapshotOut<typeof GameStoreModel> {}
