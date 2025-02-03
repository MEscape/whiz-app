import { Instance, SnapshotOut, types } from 'mobx-state-tree'

export const SettingStoreModel = types
  .model('SettingStore')
  .props({
    volumeMusic: types.optional(types.number, 1.0),
    volumeSound: types.optional(types.number, 1.0),
  })
  .actions(self => ({
    setVolumeMusic: (volumeMusic: number) => {
      self.volumeMusic = volumeMusic
    },
    setVolumeSound: (volumeSound: number) => {
      self.volumeSound = volumeSound
    },
  }))

export interface SettingStore extends Instance<typeof SettingStoreModel> {}
export interface SettingStoreSnapshot extends SnapshotOut<typeof SettingStoreModel> {}
