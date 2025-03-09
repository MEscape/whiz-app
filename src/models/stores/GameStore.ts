import { Instance, SnapshotOut, types } from 'mobx-state-tree'
import RNFS from 'react-native-fs'

import { translate } from '@/i18n'
import { sendData, TransferUser } from '@/services'
import { base64ToImage, shortenString } from '@/util'

import { Images } from 'assets/images'

import { getRootStore } from '../helpers/getRootStore'

export const TransferUserModel = types
  .model('TransferUser')
  .props({
    answer: types.maybeNull(types.frozen()),
    equippedEmoji: types.maybeNull(types.string),
    isHost: types.optional(types.boolean, false),
    points: types.optional(types.number, 0),
    prevRank: types.optional(types.number, 1),
    profileImage: types.maybeNull(types.string),
    rank: types.optional(types.number, 1),
    username: types.string,
  })
  .actions(self => ({
    setAnswer: (answer: any) => {
      self.answer = answer
    },
  }))

export const CollectionModel = types
  .model('Collection')
  .props({
    currentlySelecting: types.optional(types.boolean, false),
    currentStage: types.maybeNull(types.frozen()),
    id: types.maybeNull(types.string),
    image: types.union(
      types.maybeNull(types.string),
      types.enumeration('Images', Object.values(Images)),
    ),
    name: types.maybeNull(types.string),
  })
  .actions(self => ({
    clear: () => {
      self.image = Images.CLASSIC
      self.name = translate('collection.classicChaos') as string
      self.id = 'CLASSIC_CHAOS'
    },
    setCurrentlySelecting: (isSelecting: boolean) => {
      self.currentlySelecting = isSelecting
    },
    setCurrentStage: (stage: any) => {
      self.currentStage = stage
    },
  }))

export const StatsModel = types
  .model('Stats')
  .props({
    gamesLost: types.optional(types.number, 0),
    gamesWon: types.optional(types.number, 0),
    playTime: types.optional(types.number, 0),
    ranks: types.optional(types.array(types.number), []),
    timerIntervalId: types.maybeNull(types.frozen<NodeJS.Timeout>()),
  })
  .views(self => ({
    get averageRank() {
      if (self.ranks.length === 0) return 1

      return self.ranks.reduce((acc, current) => acc + current, 0) / self.ranks.length
    },
    get gamesLostOverall() {
      const root = getRootStore(self)
      return root.userStore.stats.gamesLost + self.gamesLost
    },
    get gamesWonOverall() {
      const root = getRootStore(self)
      return root.userStore.stats.gamesWon + self.gamesWon
    },
    get totalGamesPlayed() {
      return self.gamesWon + self.gamesLost
    },
    get totalGamesPlayedOverall() {
      const root = getRootStore(self)
      const stats = root.userStore.stats

      return self.gamesWon + self.gamesLost + stats.gamesLost + stats.gamesWon
    },
    get winRate() {
      const total = self.gamesWon + self.gamesLost
      return total > 0 ? Math.round((self.gamesWon / total) * 100) : 0
    },
    get winRateOverall() {
      const root = getRootStore(self)
      const stats = root.userStore.stats
      const total = self.gamesWon + self.gamesLost + stats.gamesLost + stats.gamesWon
      const gamesWonTotal = self.gamesWon + stats.gamesWon

      return total > 0 ? Math.round((gamesWonTotal / total) * 100) : 0
    },
  }))
  .actions(self => ({
    clear() {
      self.gamesLost = 0
      self.gamesWon = 0
      self.playTime = 0
      self.timerIntervalId = null
    },
    startTimer() {
      const startTime = new Date().getTime()

      self.timerIntervalId = setInterval(() => {
        const currentTime = new Date().getTime()
        self.playTime = Math.floor((currentTime - startTime) / 1000) // Update play time in seconds
      }, 1000)
    },
    stopTimer() {
      if (self.timerIntervalId) {
        clearInterval(self.timerIntervalId)
        self.timerIntervalId = null
      }
    },
  }))

export const GameStoreModel = types
  .model('GameStore')
  .props({
    collection: types.optional(CollectionModel, {
      id: 'CLASSIC_CHAOS',
      image: Images.CLASSIC,
      name: translate('collection.classicChaos') as string,
    }),
    isHost: types.optional(types.boolean, false),
    lobbyId: types.optional(types.string, ''),
    myId: types.maybeNull(types.string),
    processedImages: types.map(types.string),
    stats: types.optional(StatsModel, {}),
    users: types.map(TransferUserModel),
  })
  .views(self => ({
    get myUser() {
      console.log('myUser', self.users.get(self.myId))
      return self.users.get(self.myId) || null
    },
    get remainingParticipants() {
      return [
        {
          equippedEmoji: '1',
          points: 100,
          profileImage: 'image1.png',
          rank: 1,
          userId: 'user4',
          username: 'Player One',
        },
        {
          equippedEmoji: '2',
          points: 80,
          profileImage: 'image2.png',
          rank: 1,
          userId: 'user5',
          username: 'Player Two',
        },
        {
          equippedEmoji: '3',
          points: 60,
          profileImage: 'image3.png',
          rank: 1,
          userId: 'user6',
          username: 'Player Three',
        },
      ]
    },
    get topThreeUsers() {
      return [
        {
          equippedEmoji: '1',
          points: 100,
          profileImage: 'image1.png',
          rank: 1,
          userId: 'user1',
          username: 'Player One',
        },
        {
          equippedEmoji: '2',
          points: 80,
          profileImage: 'image2.png',
          rank: 1,
          userId: 'user2',
          username: 'Player Two',
        },
        {
          equippedEmoji: '3',
          points: 60,
          profileImage: 'image3.png',
          rank: 1,
          userId: 'user3',
          username: 'Player Three',
        },
      ]
    },
  }))
  .actions(self => ({
    clearStore() {
      self.users.clear()
      self.lobbyId = ''
      self.isHost = false
      self.processedImages.clear()
      self.stats.clear()
      self.myId = null
      self.collection.clear()
      self.collection.setCurrentlySelecting(false)
      self.stats.clear()
    },
    setCollection: async (collection: { image: string; name: string; id: string }) => {
      self.collection.image = collection.image
      self.collection.name = collection.name
      self.collection.id = collection.id

      const image = Object.values(Images).includes(collection.image as Images)
        ? collection.image
        : await RNFS.readFile(collection.image, 'base64')

      sendData({ body: { ...collection, image }, method: 'POST', path: '/collection' })
    },
    setIsHost: (isHost: boolean) => {
      self.isHost = isHost
    },
    setLobbyId: (lobbyId: string) => {
      self.lobbyId = lobbyId
    },
    setMyId: (id: string) => {
      self.myId = id
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
    setRemoteCollection: async (collection: { image: string; name: string; id: string }) => {
      if (self.isHost) return

      const image = Object.values(Images).includes(collection.image as Images)
        ? collection.image
        : await base64ToImage(collection.image)
      self.collection.image = image
      self.collection.name = collection.name
      self.collection.id = collection.id
    },
    setUsers: (users: Record<string, TransferUser>) => {
      self.users.replace(users)
    },
  }))

export interface GameStore extends Instance<typeof GameStoreModel> {}
export interface GameStoreSnapshot extends SnapshotOut<typeof GameStoreModel> {}
