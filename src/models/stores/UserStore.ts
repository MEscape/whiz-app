import { Instance, SnapshotOut, types } from 'mobx-state-tree'

export const PartyStatsModel = types
  .model('PartyStats')
  .props({
    totalPartiesHosted: types.optional(types.number, 0),
    totalPartiesJoined: types.optional(types.number, 0),
    totalPlayTime: types.optional(types.number, 0), // in minutes
    gamesWon: types.optional(types.number, 0),
    gamesLost: types.optional(types.number, 0),
    favoriteGameType: types.maybeNull(types.string),
    lastPlayedAt: types.maybeNull(types.Date),
  })
  .views(self => ({
    get winRate() {
      const total = self.gamesWon + self.gamesLost
      return total > 0 ? Math.round((self.gamesWon / total) * 100) : 0
    },
    get totalGamesPlayed() {
      return self.gamesWon + self.gamesLost
    },
    get formattedPlayTime() {
      const hours = Math.floor(self.totalPlayTime / 60)
      const minutes = self.totalPlayTime % 60
      return `${hours}h ${minutes}m`
    },
  }))

export const UserStoreModel = types
  .model('UserStore')
  .props({
    claimedRewards: types.optional(types.array(types.string), []),
    experience: types.optional(types.number, 0),
    gamesPlayed: types.optional(types.number, 0),
    isActive: types.optional(types.boolean, false),
    level: types.optional(types.number, 1),
    profileImage: types.maybeNull(types.string),
    username: types.optional(types.string, ''),
    stats: types.optional(PartyStatsModel, {}),
    isLevelingUp: types.optional(types.boolean, false),
  })
  .views(self => ({
    get canProceed() {
      return !self.isActive || self.username.trim().length > 0
    },
    get experienceProgress() {
      return self.experience / self.experienceToNextLevel
    },
    get experienceToNextLevel() {
      return self.level * 100 // Simple progression: each level needs level * 100 XP
    },
    get userExists() {
      return self.username.trim().length > 0
    },
  }))
  .actions(self => ({
    addExperience(amount: number) {
      self.experience += amount
      const initialLevel = self.level
      
      while (self.experience >= self.experienceToNextLevel) {
        self.experience -= self.experienceToNextLevel
        self.level += 1
      }
      
      if (self.level > initialLevel) {
        self.isLevelingUp = true
      }
    },
    claimReward(rewardId: string) {
      self.claimedRewards.push(rewardId)
    },
    clearProfile() {
      self.username = ''
      self.profileImage = null
    },
    incrementGamesPlayed() {
      self.gamesPlayed += 1
    },
    setIsActive(state: boolean) {
      self.isActive = state
    },
    setProfileImage(imageUri: any | null) {
      self.profileImage = imageUri
    },
    setUsername(name: string) {
      self.username = name
    },
    updateGameStats(won: boolean, gameType: string, playTime: number) {
      if (won) self.stats.gamesWon += 1
      else self.stats.gamesLost += 1
      
      self.stats.totalPlayTime += playTime
      self.stats.lastPlayedAt = new Date()
      self.stats.favoriteGameType = gameType // You might want to make this more sophisticated
    },
    incrementHostedParties() {
      self.stats.totalPartiesHosted += 1
    },
    incrementJoinedParties() {
      self.stats.totalPartiesJoined += 1
    },
    setIsLevelingUp(state: boolean) {
      self.isLevelingUp = state
    },
  }))

export interface UserStore extends Instance<typeof UserStoreModel> {}
export interface UserStoreSnapshot extends SnapshotOut<typeof UserStoreModel> {}
