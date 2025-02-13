import { Instance, SnapshotOut, types } from 'mobx-state-tree'

import { FormData } from '@/components/collection'

export const CollectionModel = types.model('Collection').props({
  created: types.string,
  elements: types.number,
  id: types.identifier,
  image: types.maybeNull(types.string),
  name: types.string,
})

export const CollectionStoreModel = types
  .model('CollectionStore')
  .props({
    collections: types.array(CollectionModel),
    isCreating: types.optional(types.boolean, false),
    searchTerm: types.optional(types.string, '')
  })
  .actions(self => ({
    addCollection(formData: FormData) {
      const id =
        self.collections.length === 0 ? 0 : self.collections[self.collections.length - 1].id + 1
      const newCollection = {
        created: new Date().toISOString().split('T')[0],
        elements: 0,
        id: id.toString(),
        image: formData?.img,
        name: formData?.name,
      }

      self.collections.push(newCollection)
      self.isCreating = true
    },
    setIsCreating(state: boolean) {
      self.isCreating = state
    },
    setSearchTerm(text: string) {
      self.searchTerm = text.toLowerCase()
    },
    updateCollection(id: string, formData: FormData): boolean {
      const collection = self.collections.find(c => c.id === id)
      if (!collection) return false
      
      collection.name = formData.name
      if (formData.img) {
        collection.image = formData.img
      }
      return true
    }
  }))

export interface CollectionStore extends Instance<typeof CollectionStoreModel> {}
export interface CollectionStoreSnapshot extends SnapshotOut<typeof CollectionStoreModel> {}
