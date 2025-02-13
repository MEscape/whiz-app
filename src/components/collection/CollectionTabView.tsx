import React, { useCallback, useMemo, useState } from 'react'
import { FlatList, useWindowDimensions, View } from 'react-native'

import { Animation, EmptyState } from 'blueprints'
import { observer } from 'mobx-react-lite'
import { SceneMap, TabBar, TabView } from 'react-native-tab-view'

import { useAppContext } from '@/context'
import { translate } from '@/i18n'

import { Animations, AnimationUris } from 'assets/animations'

import { CollectionItem } from './CollectionItem'
import collections from './collections'

const CollectionList = observer(({ data }) => {
const { collectionStore } = useAppContext()

  const filteredData = useMemo(() => {
    return data.filter(collection => {
      const collectionName = collection.name || translate(collection.nameTx)
      return collectionName.toLowerCase().includes(collectionStore.searchTerm)
    });
  }, [collectionStore.searchTerm, data]);

  return (
    <View className="flex-1">
      {filteredData && filteredData.length > 0 ? (
        <FlatList
          contentContainerStyle={{ paddingBottom: 66 }}
          data={filteredData}
          overScrollMode="never"
          renderItem={({ item }) => <CollectionItem item={item} />}
          keyExtractor={item => item.id}
        />
      ) : (
        <EmptyState className="mb-20" />
      )}
    </View>
  )
})

export const CollectionTabView = observer(() => {
  const [index, setIndex] = useState(0)
  const { collectionStore, isDarkMode, language } = useAppContext()
  const layout = useWindowDimensions()

  const routes = useMemo(
    () => [
      { key: 'served', title: translate('collection.served') },
      { key: 'own', title: translate('collection.own') },
    ],
    [language],
  )

  const renderScene = useMemo(
    () =>
      SceneMap({
        own: () => <CollectionList data={collectionStore.collections} />,
        served: () => <CollectionList data={collections} />,
      }),
    [],
  )

  const renderTabBar = useCallback(
    props => (
      <TabBar
        {...props}
        style={{
          backgroundColor: 'transparent',
          borderBottomColor: isDarkMode ? '#e7e3e3' : '#2d2c2c',
          borderBottomWidth: 1,
          elevation: 0,
        }}
        indicatorStyle={{
          backgroundColor: '#62a399',
          borderRadius: 2,
          height: 4,
          marginLeft: '5%',
          width: '40%',
        }}
        activeColor="#62a399"
        inactiveColor={isDarkMode ? '#e7e3e3' : '#2d2c2c'}
      />
    ),
    [],
  )

  return (
    <>
      <TabView
        overScrollMode="never"
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
      {collectionStore.isCreating && (
        <Animation
          source={AnimationUris[Animations.CREATED]}
          className='h-56 w-56'
          onAnimationFinish={() => collectionStore.setIsCreating(false)}
        />
      )}
    </>
  )
})
