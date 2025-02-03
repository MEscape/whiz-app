import React, { useCallback, useMemo, useState } from 'react'
import { FlatList, useWindowDimensions, View } from 'react-native'

import { SceneMap, TabBar, TabView } from 'react-native-tab-view'

import { useAppContext } from '@/context'
import { translate } from '@/i18n'

import { CollectionItem } from './CollectionItem'
import collections from './collections'

const CollectionList = ({ data }) => (
  <View className="flex-1">
    <FlatList
      contentContainerStyle={{ paddingBottom: 66 }}
      data={data}
      overScrollMode="never"
      renderItem={({ item }) => <CollectionItem item={item} />}
      keyExtractor={item => item.id}
    />
  </View>
)

const renderScene = SceneMap({
  own: () => <CollectionList data={collections} />,
  served: () => <CollectionList data={collections.slice(2)} />,
})

export const CollectionTabView = () => {
  const [index, setIndex] = useState(0)
  const { isDarkMode, language } = useAppContext()
  const layout = useWindowDimensions()

  const routes = useMemo(
    () => [
      { key: 'served', title: translate('collection.served') },
      { key: 'own', title: translate('collection.own') },
    ],
    [language],
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
    <TabView
      overScrollMode="never"
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar}
    />
  )
}
