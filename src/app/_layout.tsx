import React from 'react'

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

export default function RootLayout() {
  const [areFontsLoaded, fontLoadError] = useFonts(customFontsToLoad)

  const { rehydrated } = useInitialRootStore(() => {
    // This runs after the root store has been initialized and rehydrated.
    setTimeout(SplashScreen.hideAsync, 500)
  })

  if (!rehydrated || (!areFontsLoaded && !fontLoadError)) {
    return null
  }

  return (
    <ThemeProvider>
      <LocalizationProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </LocalizationProvider>
    </ThemeProvider>
  )
}
