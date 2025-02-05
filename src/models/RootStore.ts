import { Instance, SnapshotOut, types } from 'mobx-state-tree'

import { SettingStoreModel, UserStoreModel } from '@/models/stores'
import { CollectionStoreModel } from './stores/CollectionStore'

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model('RootStore').props({
  settingStore: types.optional(SettingStoreModel, {}),
  userStore: types.optional(UserStoreModel, {}),
  collectionStore: types.optional(CollectionStoreModel, {})
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
