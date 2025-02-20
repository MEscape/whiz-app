import React, { useCallback } from 'react'
import { BackHandler } from 'react-native'

import { useFocusEffect } from '@react-navigation/native'
import { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import { Stack, usePathname, useRouter } from 'expo-router'

import { handleDisconnect } from '@/services/LobbyService'

const stackScreenOptions: NativeStackNavigationOptions = {
  animation: 'slide_from_right',
  headerShown: false,
  presentation: 'transparentModal',
}

export default function GameLayout() {
  const router = useRouter()
  const pathname = usePathname()

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        console.log('Back pressed:', pathname)
        if (pathname === '/lobby') {
          handleDisconnect()
        }
        router.back()
        return true
      }

      BackHandler.addEventListener('hardwareBackPress', onBackPress)

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress)
      }
    }, [pathname])
  )

  return (
    <Stack screenOptions={stackScreenOptions}>
      <Stack.Screen name="lobby" />
    </Stack>
  )
}
