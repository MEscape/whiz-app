import React from 'react'

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'

import 'react-native-reanimated'

import '../../global.css'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { customFontsToLoad } from '@/constants'
import { LocalizationProvider, ThemeProvider } from '@/context'
import { usePreloadAssets, useWeeklyNotification } from '@/hooks'
import { useInitialRootStore } from '@/models'

SplashScreen.preventAutoHideAsync()

const stackScreenOptions: NativeStackNavigationOptions = {
  animation: 'slide_from_right',
  headerShown: false,
  presentation: 'transparentModal',
}

export default function RootLayout() {
  const [areFontsLoaded, fontLoadError] = useFonts(customFontsToLoad)
  const isLoadingAssets = usePreloadAssets()

  const { rehydrated } = useInitialRootStore()
  useWeeklyNotification()

  if (!rehydrated || (!areFontsLoaded && !fontLoadError) || isLoadingAssets) {
    return null
  }

  setTimeout(SplashScreen.hideAsync, 500)

  return (
    <ThemeProvider>
      <LocalizationProvider>
        <GestureHandlerRootView>
          <BottomSheetModalProvider>
            <Stack screenOptions={stackScreenOptions}>
              <Stack.Screen name="onboarding" />
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="inverted" />
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </LocalizationProvider>
    </ThemeProvider>
  )
}
