import React, { useEffect } from 'react'

import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'
import { Icon, Text } from 'blueprints'
import { LinearGradient } from 'expo-linear-gradient'
import { Tabs, useRootNavigationState } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { blackGradient } from '@/constants'
import { useAppContext } from '@/context'

export default function TabLayout() {
  const { router, userStore } = useAppContext()
  const { bottom } = useSafeAreaInsets()
  const rootNavigationState = useRootNavigationState()
  const tabHeight = bottom + 50

  const screenOptions: BottomTabNavigationOptions = {
    headerShown: false,
    tabBarBackground: () => (
      <LinearGradient colors={blackGradient} style={{ height: tabHeight + 20 }} />
    ),
    tabBarHideOnKeyboard: true,
    tabBarStyle: {
      backgroundColor: 'transparent',
      borderTopWidth: 0,
      elevation: 0,
      height: tabHeight,
      marginBottom: 12,
      position: 'absolute',
    },
  }

  useEffect(() => {
    if (rootNavigationState?.key != null && !userStore.userExists) {
      //router.replace('/onboarding')
    }
  }, [rootNavigationState, userStore.userExists])

  return (
    <Tabs screenOptions={screenOptions}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon library="Ionicons" name={focused ? 'home' : 'home-outline'} color="text-white" />
          ),
          tabBarLabel: () => <Text variant="caption" textColor="text-white" tx="tabs.home"></Text>,
        }}
      />
    </Tabs>
  )
}
