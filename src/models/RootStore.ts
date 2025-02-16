import { Instance, SnapshotOut, types } from 'mobx-state-tree'

import { CollectionStoreModel } from './stores/CollectionStore'

import { SettingStoreModel, UserStoreModel } from '@/models/stores'
import { TcpStoreModel } from '@/models/stores/TCPStore'

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model('RootStore').props({
  collectionStore: types.optional(CollectionStoreModel, {}),
  settingStore: types.optional(SettingStoreModel, {}),
  tcpStore: types.optional(TcpStoreModel, {}),
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
