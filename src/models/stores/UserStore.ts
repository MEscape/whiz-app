import { Instance, SnapshotOut, types } from 'mobx-state-tree'

export const UserStoreModel = types
  .model('UserStore')
  .props({
    isActive: types.optional(types.boolean, false),
    profileImage: types.maybeNull(types.string),
    username: types.optional(types.string, ''),
    level: types.optional(types.number, 1),
    experience: types.optional(types.number, 0),
    gamesPlayed: types.optional(types.number, 0),
    claimedRewards: types.optional(types.array(types.string), []),
  })
  .views(self => ({
    get canProceed() {
      return !self.isActive || self.username.trim().length > 0
    },
    get userExists() {
      return self.username.trim().length > 0
    },
    get experienceToNextLevel() {
      return self.level * 100 // Simple progression: each level needs level * 100 XP
    },
    get experienceProgress() {
      return self.experience / self.experienceToNextLevel
    },
  }))
  .actions(self => ({
    clearProfile() {
      self.username = ''
      self.profileImage = null
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
    addExperience(amount: number) {
      self.experience += amount
      while (self.experience >= self.experienceToNextLevel) {
        self.experience -= self.experienceToNextLevel
        self.level += 1
      }
    },
    incrementGamesPlayed() {
      self.gamesPlayed += 1
    },
    claimReward(rewardId: string) {
      self.claimedRewards.push(rewardId)
    },
  }))

export interface UserStore extends Instance<typeof UserStoreModel> {}
export interface UserStoreSnapshot extends SnapshotOut<typeof UserStoreModel> {}
