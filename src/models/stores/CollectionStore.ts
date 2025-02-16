import { Instance, SnapshotOut, types } from 'mobx-state-tree'

import { Task } from '@/app/library'
import { FormData } from '@/components/collection'

export const CollectionModel = types.model('Collection').props({
  created: types.string,
  elements: types.number,
  id: types.identifier,
  image: types.maybeNull(types.string),
  name: types.string,
})

export const TaskModel = types.model('Task').props({
  answers: types.maybeNull(types.array(types.string)),
  id: types.identifier,
  name: types.string,
  refId: types.number,
  solution: types.maybeNull(types.number),
  type: types.number,
})

export const CollectionStoreModel = types
  .model('CollectionStore')
  .props({
    collections: types.array(CollectionModel),
    isCreating: types.optional(types.boolean, false),
    searchTerm: types.optional(types.string, ''),
    tasksByRefId: types.map(types.map(TaskModel)),
  })
  .views(self => ({
    getCollection(id: string) {
      const collection = self.collections.find(c => c.id === id)
      if (!collection) return undefined

      return collection
    },
    getTasks(id: string) {
      const taskMap = self.tasksByRefId.get(id)
      return taskMap ? Array.from(taskMap.values()) : []
    },
  }))
  .actions(self => ({
    addCollection(formData: FormData) {
      const lastKey =
        self.collections.length > 0 ? Math.max(...self.collections.map(c => parseInt(c.id))) : -1
      const newId = (lastKey + 1).toString()

      const newCollection = CollectionModel.create({
        created: new Date().toISOString().split('T')[0],
        elements: 0,
        id: newId,
        image: formData?.img,
        name: formData?.name.trim(),
      })

      self.collections.push(newCollection)
      self.isCreating = true
    },
    addTask(refId: string, taskData: Task) {
      if (!self.tasksByRefId.has(refId)) {
        self.tasksByRefId.set(refId, {})
      }

      const taskMap = self.tasksByRefId.get(refId)!
      const lastKey = taskMap.size > 0 ? Math.max(...Array.from(taskMap.keys()).map(Number)) : -1
      const newId = (lastKey + 1).toString()

      const newTask = TaskModel.create({
        answers: taskData.answers || null,
        id: newId,
        name: taskData.name.trim(),
        refId: parseInt(refId),
        solution: parseInt(taskData.solution) || null,
        type: taskData.type,
      })

      taskMap.set(newId, newTask)
      self.incrementCollection(refId, true)
      return true
    },
    clearCollections() {
      self.collections.clear()
      self.tasksByRefId.clear()
    },
    deleteCollection(id: string) {
      const collectionIndex = self.collections.findIndex(c => c.id === id)
      if (collectionIndex !== -1) {
        self.collections.splice(collectionIndex, 1)
        return true
      }
      return false
    },
    deleteTask(refId: string, taskId: string) {
      // Remove task from the tasksByRefId map
      const taskMap = self.tasksByRefId.get(refId)
      if (taskMap && taskMap.has(taskId)) {
        taskMap.delete(taskId)
        self.incrementCollection(refId, false)
        return true
      }

      return false
    },
    incrementCollection(id: string, add: boolean) {
      const collection = self.collections.find(c => c.id === id)
      if (!collection) return false

      if (add) {
        collection.elements++
      } else {
        collection.elements--
      }
      return true
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

      collection.name = formData.name.trim()
      if (formData.img) {
        collection.image = formData.img
      }
      return true
    },
  }))

export interface CollectionStore extends Instance<typeof CollectionStoreModel> {}
export interface CollectionStoreSnapshot extends SnapshotOut<typeof CollectionStoreModel> {}
