import React from 'react'

import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'
import { Icon, Text } from 'blueprints'
import { LinearGradient } from 'expo-linear-gradient'
import { Tabs } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { blackGradient } from '@/constants'

export default function TabLayout() {
  const { bottom } = useSafeAreaInsets()
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

  return (
    <Tabs screenOptions={screenOptions}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon library="Ionicons" name={focused ? 'home' : 'home-outline'} color="fixedWhite" />
          ),
          tabBarLabel: () => <Text variant="caption" textColor="fixedWhite" tx="tabs.home"></Text>,
        }}
      />
    </Tabs>
  )
}
