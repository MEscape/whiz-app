import React from 'react'
import { SafeAreaView } from 'react-native'

import { Text } from 'blueprints'
import { LinearGradient } from 'expo-linear-gradient'

import { BackgroundVideo, Typewriter } from '@/components'
import { blackGradient } from '@/constants'
import { useTheme } from '@/context'

import { Videos } from 'assets/videos'

export default function HomeScreen() {
  const { toggleTheme } = useTheme()

  return (
    <SafeAreaView className="flex h-full from-purple-600 to-blue-600">
      <BackgroundVideo videoSource={Videos.PARTY_VIDEO} />
      <LinearGradient
        colors={blackGradient}
        start={[1, 1]}
        end={[1, 0]}
        className="h-full w-full absolute z-20">
        <Typewriter
          sentences={[
            'Welcome to the typewriter effect!',
            'React Native with NativeWind is awesome!',
            'Keep building amazing projects.',
          ]}
          typingSpeed={100}
          pauseDuration={1500}
        />

        <Text variant="h1" textColor="text">
          Welcome to Tailwind
        </Text>
        <Text variant="h1" textColor="accent" onPress={toggleTheme}>
          Dark/Light
        </Text>
      </LinearGradient>
    </SafeAreaView>
  )
}
