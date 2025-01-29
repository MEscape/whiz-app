import { Instance, SnapshotOut, types } from 'mobx-state-tree'

export const UserStoreModel = types
  .model('UserStore')
  .props({
    isActive: types.optional(types.boolean, false),
    profileImage: types.maybeNull(types.string),
    username: types.optional(types.string, ''),
  })
  .views(self => ({
    get canProceed() {
      return !self.isActive || self.username.trim().length > 0
    },
    get userExists() {
      return self.username.trim().length > 0
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
  }))

export interface UserStore extends Instance<typeof UserStoreModel> {}
export interface UserStoreSnapshot extends SnapshotOut<typeof UserStoreModel> {}
