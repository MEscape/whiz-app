import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Animated, FlatList, SafeAreaView, TextInput, TouchableOpacity, View } from 'react-native'

import { FlashList } from '@shopify/flash-list'
import { EmptyState, Icon } from 'blueprints'
import { useLocalSearchParams } from 'expo-router'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'
import { cssInterop } from 'nativewind'

import { Search } from '@/components'
import { PlayTypes } from '@/constants'
import { useAppContext } from '@/context'
import { useHeader } from '@/hooks'
import { CustomAlert, showSuccessToast } from '@/util'

import { Data, DataUris } from 'assets/data'

import { CollectionItemProps } from '@/components/collection'
import { BottomInfo, TaskCreator, TaskHeader, TaskItem } from '@/components/task'

export interface Task {
  id: string
  name: string
  answers: Array<string>
  solution: number
  type: PlayTypes
}

const LibraryList = ({ editable, filteredData, refId }) => {
  const [openItemId, setOpenItemId] = useState(null)

  const handleToggle = (id: string) => {
    setOpenItemId(prevId => (prevId === id ? null : id))
  }

  return (
    <View className="flex-1">
      {filteredData && filteredData.length > 0 ? (
        <FlatList
          contentContainerStyle={{ paddingVertical: 20 }}
          data={filteredData}
          extraData={openItemId}
          renderItem={({ item }: { item: Task }) => (
            <TaskItem
              item={item}
              isOpen={openItemId === item.id}
              onToggle={() => handleToggle(item.id)}
              refId={refId}
              editable={editable !== false}
            />
          )}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <EmptyState className="mb-20" />
      )}
    </View>
  )
}

const LibraryScreen = observer(() => {
  const params = useLocalSearchParams()
  const { collectionStore, language, router } = useAppContext()

  const inputRef = useRef<TextInput>(null)
  const [showSearch, setShowSearch] = useState(false)
  const [animation] = useState(new Animated.Value(0))

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

  const item = (params.item ? JSON.parse(params.item) : null) as CollectionItemProps
  const dataKey = mapIdToDataKey(item.id)
  const data = useMemo(() => {
    return dataKey ? DataUris[dataKey] : collectionStore.getTasks(item.id)
  }, [dataKey, toJS(collectionStore.tasksByRefId), item.id])

  const filteredData = useMemo(() => {
    return data.filter(item => {
      return item.name.toLowerCase().includes(collectionStore.searchTerm)
    })
  }, [collectionStore.searchTerm, data])

  useEffect(() => {
    collectionStore.setSearchTerm('')

    return () => collectionStore.setSearchTerm('')
  }, [])

  const toggleSearch = () => {
    setShowSearch(prev => !prev)
    inputRef.current.focus()
    Animated.timing(animation, {
      duration: 300,
      toValue: showSearch ? 0 : 1,
      useNativeDriver: false,
    }).start()
  }

  const handleDelete = () => {
    CustomAlert.alert({
      background: 'bg-secondary',
      messageTx: 'alert.deleteReminder',
      messageTxOptions: { itemName: item.name },
      onConfirm: () => {
        console.log(collectionStore.deleteCollection(item.id))
        router.back()
        showSuccessToast('success.delete', undefined, { itemName: item.name })
      },
      titleTx: 'alert.delete',
    })
  }

  useHeader(
    {
      leftIcon: 'arrow-back',
      leftIconLibrary: 'Ionicons',
      onLeftPress: router.back,
      RightActionComponent: (
        <Search
          toggleSearch={toggleSearch}
          animation={animation}
          ref={inputRef}
          onChangeText={collectionStore.setSearchTerm}
        />
      ),
    },
    [router, animation, showSearch],
  )

  cssInterop(FlashList, { className: 'style' })

  return (
    <SafeAreaView className="flex-1 bg-primary px-4 py-2">
      <TaskHeader item={item} />
      <LibraryList filteredData={filteredData} refId={item.id} editable={item.editable} />
      {item.editable !== false && (
        <>
          <TaskCreator refId={item.id} />
          <TouchableOpacity
            className="absolute right-5 bottom-10 z-20 w-16 h-16 rounded-full bg-secondary flex justify-center items-center"
            onPress={handleDelete}>
            <Icon name="trash" library="Ionicons" size={26} />
          </TouchableOpacity>
        </>
      )}
      {filteredData.length > 0 && <BottomInfo />}
    </SafeAreaView>
  )
})

export default LibraryScreen
