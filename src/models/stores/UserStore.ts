import { Instance, SnapshotOut, types } from 'mobx-state-tree'

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
      while (self.experience >= self.experienceToNextLevel) {
        self.experience -= self.experienceToNextLevel
        self.level += 1
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
  }))

export interface UserStore extends Instance<typeof UserStoreModel> {}
export interface UserStoreSnapshot extends SnapshotOut<typeof UserStoreModel> {}
