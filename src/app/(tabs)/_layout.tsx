import React, { useEffect } from 'react'
import { View } from 'react-native'

import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'
import { useNavigationState } from '@react-navigation/core'
import { Icon, Text } from 'blueprints'
import { LinearGradient } from 'expo-linear-gradient'
import { Tabs, useRootNavigationState } from 'expo-router'
import { observer } from 'mobx-react-lite'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { blackGradient } from '@/constants'
import { useAppContext } from '@/context'

const TabLayout = observer(() => {
  const { gameStore, isDarkMode, router, userStore } = useAppContext()
  const { bottom } = useSafeAreaInsets()
  const rootNavigationState = useRootNavigationState()
  const currentRoute = useNavigationState(state => state?.routes[state.index].state?.index)

  const tabHeight = bottom + 50
  const withGradient = !isDarkMode || currentRoute === 0 || currentRoute === undefined

  const screenOptions: BottomTabNavigationOptions = {
    headerShown: false,
    tabBarBackground: () =>
      withGradient ? (
        <LinearGradient colors={blackGradient} style={{ height: tabHeight + 20 }} />
      ) : (
        <View style={{ backgroundColor: 'transparent', height: tabHeight + 20 }} />
      ),
    tabBarHideOnKeyboard: true,
    tabBarStyle: {
      backgroundColor: 'transparent',
      borderTopWidth: 0,
      display: gameStore.collection.currentlySelecting ? 'none' : 'flex',
      elevation: 0,
      height: tabHeight,
      marginBottom: 12,
      position: 'absolute',
    },
  }

  useEffect(() => {
    if (rootNavigationState?.key != null && !userStore.userExists) {
      router.replace('/onboarding')
    }
  }, [rootNavigationState, userStore.userExists])

  return (
    <Tabs screenOptions={screenOptions} backBehavior="history">
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              library="Ionicons"
              name={focused ? 'home' : 'home-outline'}
              color={withGradient ? 'text-white' : 'text-black'}
            />
          ),
          tabBarLabel: () => (
            <Text
              variant="caption"
              textColor={withGradient ? 'text-white' : 'text-black'}
              tx="tabs.home"></Text>
          ),
        }}
      />
      <Tabs.Screen
        name="collection"
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              library="Ionicons"
              name={focused ? 'library' : 'library-outline'}
              color={withGradient ? 'text-white' : 'text-black'}
            />
          ),
          tabBarLabel: () => (
            <Text
              variant="caption"
              textColor={withGradient ? 'text-white' : 'text-black'}
              tx="tabs.collections"></Text>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              library="Ionicons"
              name={focused ? 'person' : 'person-outline'}
              color={withGradient ? 'text-white' : 'text-black'}
            />
          ),
          tabBarLabel: () => (
            <Text
              variant="caption"
              textColor={withGradient ? 'text-white' : 'text-black'}
              tx="tabs.profile"></Text>
          ),
        }}
      />
    </Tabs>
  )
})

export default TabLayout
