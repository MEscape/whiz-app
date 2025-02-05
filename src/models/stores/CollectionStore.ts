import { Instance, SnapshotOut, t, types } from 'mobx-state-tree'
import { FormData } from '@/components/collection'

export const CollectionModel = types
  .model('Collection')
  .props({
    id: types.identifier,
    name: types.string,
    description: types.maybeNull(types.string),
    image: types.maybeNull(types.string),
    elements: types.number
  })

export const CollectionStoreModel = types
  .model('CollectionStore')
  .props({
    collections: types.array(CollectionModel),
    isCreating: types.optional(types.boolean, false),
  })
  .actions(self => ({
    addCollection(formData: FormData) {
      const id = self.collections.length === 0 ? 0 :self.collections[self.collections.length - 1].id + 1
      const newCollection = {
        id: id.toString(),
        name: formData?.name,
        created: new Date().toISOString().split('T')[0],
        coverImage: formData?.img,
        elements: 0,
      }
      self.collections.push(newCollection)
      self.isCreating = true
    },
    setIsCreating(state: boolean) {
      self.isCreating = state
    },
  }))

export interface CollectionStore extends Instance<typeof CollectionStoreModel> {}
export interface CollectionStoreSnapshot extends SnapshotOut<typeof CollectionStoreModel> {}
