import React from 'react'

import { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import { Stack } from 'expo-router'

const stackScreenOptions: NativeStackNavigationOptions = {
  animation: 'slide_from_right',
  headerShown: false,
  presentation: 'transparentModal',
}

export default function GameLayout() {
  return (
    <Stack screenOptions={stackScreenOptions}>
        <Stack.Screen name="lobby" />
    </Stack>
  )
}
