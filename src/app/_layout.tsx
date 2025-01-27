import { usePreloadAssets } from '@/hooks'

import React, { useEffect } from 'react'

import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import 'react-native-reanimated'

import '../../global.css'
import { customFontsToLoad } from '@/constants'
import { LocalizationProvider, ThemeProvider } from '@/context'
import { useInitialRootStore } from '@/models'

SplashScreen.preventAutoHideAsync()

const stackScreenOptions = { headerShown: false }

export default function RootLayout() {
  const [areFontsLoaded, fontLoadError] = useFonts(customFontsToLoad)
  const isLoadingAssets = usePreloadAssets()

  const { rehydrated } = useInitialRootStore()

  if (!rehydrated || (!areFontsLoaded && !fontLoadError) || isLoadingAssets) {
    return null
  }

  setTimeout(SplashScreen.hideAsync, 500)

  return (
    <ThemeProvider>
      <LocalizationProvider>
        <Stack screenOptions={stackScreenOptions}>
          <Stack.Screen name="onboarding" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </LocalizationProvider>
    </ThemeProvider>
  )
}
