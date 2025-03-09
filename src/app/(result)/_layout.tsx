import React, { useCallback } from 'react'
import { BackHandler } from 'react-native'

import { useFocusEffect } from '@react-navigation/native'
import { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import { Stack, usePathname } from 'expo-router'

const stackScreenOptions: NativeStackNavigationOptions = {
  animation: 'slide_from_right',
  headerShown: false,
  presentation: 'transparentModal',
}

export default function GameLayout() {
  const pathname = usePathname()

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        console.log('Back pressed:', pathname)
        return true
      }

      BackHandler.addEventListener('hardwareBackPress', onBackPress)

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress)
      }
    }, [pathname]),
  )

  return (
    <Stack screenOptions={stackScreenOptions}>
      <Stack.Screen name="question" />
      <Stack.Screen name="ranking" />
    </Stack>
  )
}
