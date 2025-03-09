import React from 'react'

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import * as Sentry from '@sentry/react-native'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'

import 'react-native-reanimated'

import '../../global.css'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Toast from 'react-native-toast-message'

import { customFontsToLoad } from '@/constants'
import { CustomAlertProvider, LocalizationProvider, ThemeProvider } from '@/context'
import { usePreloadAssets, useWeeklyNotification } from '@/hooks'
import { useInitialRootStore } from '@/models'

SplashScreen.preventAutoHideAsync()

Sentry.init({
  dsn: 'https://ef3eb8306b9a61067bc052f2e695d0c2@o4508925277175808.ingest.de.sentry.io/4508925280059472',

  // profilesSampleRate is relative to tracesSampleRate.
  // Here, we'll capture profiles for 100% of transactions.
  profilesSampleRate: 1.0,

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Set tracesSampleRate to 1.0 to capture 100% of transactions for tracing.
  // We recommend adjusting this value in production.
  // Learn more at
  // https://docs.sentry.io/platforms/react-native/configuration/options/#traces-sample-rate
  tracesSampleRate: 1.0,

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
})

const stackScreenOptions: NativeStackNavigationOptions = {
  animation: 'slide_from_right',
  headerShown: false,
  presentation: 'transparentModal',
}

const RootLayout = () => {
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
            <CustomAlertProvider>
              <Stack screenOptions={stackScreenOptions}>
                <Stack.Screen name="onboarding" />
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="+not-found" />
                <Stack.Screen name="library" />
                <Stack.Screen name="settings" />
                <Stack.Screen name="(game)" />
              </Stack>
              <StatusBar style="inverted" />
              <Toast />
            </CustomAlertProvider>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </LocalizationProvider>
    </ThemeProvider>
  )
}

export default Sentry.wrap(RootLayout)
