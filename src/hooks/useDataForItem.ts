import { useMemo } from 'react'

import { toJS } from 'mobx'

import { useAppContext } from '@/context'

import { Data, DataUris } from 'assets/data'

export const useDataForItem = (itemId: string) => {
  const { collectionStore, language } = useAppContext()

  const mapIdToDataKey = (id: string) => {
    const currLanguage = language.toUpperCase()

    switch (id) {
      case 'CLASSIC_CHAOS':
        return Data[`${currLanguage}_CLASSIC_CHAOS`]
      case 'SURVIVAL':
        return Data[`${currLanguage}_SURVIVAL`]
      case 'DISORDERLY':
        return Data[`${currLanguage}_DISORDERLY`]
      default:
        return undefined
    }
  }

  const dataKey = mapIdToDataKey(itemId)

  return useMemo(() => {
    return dataKey ? DataUris[dataKey] : collectionStore.getTasks(itemId)
  }, [dataKey, toJS(collectionStore.tasksByRefId), itemId])
}
