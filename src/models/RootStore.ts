import { Instance, SnapshotOut, types } from 'mobx-state-tree'

import { CollectionStoreModel } from './stores/CollectionStore'

import { SettingStoreModel, UserStoreModel } from '@/models/stores'
import { GameStoreModel } from '@/models/stores/GameStore'

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model('RootStore').props({
  collectionStore: types.optional(CollectionStoreModel, {}),
  gameStore: types.optional(GameStoreModel, {}),
  settingStore: types.optional(SettingStoreModel, {}),
  userStore: types.optional(UserStoreModel, {}),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
