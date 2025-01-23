import React from 'react'
import { SafeAreaView, View } from 'react-native'

import { Button, Image, Text } from 'blueprints'
import { LinearGradient } from 'expo-linear-gradient'

import { BackgroundVideo, Typewriter } from '@/components'
import { blackGradient } from '@/constants'
import { useAppContext } from '@/context'

import { Images } from 'assets/images'
import { Videos } from 'assets/videos'

import { useHeader } from '@/hooks/useHeader'

export default function HomeScreen() {
  const { toggleTheme } = useAppContext()

  useHeader(
    {
      backgroundColor: 'transparent',
      TitleActionComponent: <Image src={Images.LOGO_DARK} classNameContainer="h-16 w-16 p-2" />,
    },
    [],
  )

  return (
    <SafeAreaView className="flex h-full from-purple-600 to-blue-600">
      <BackgroundVideo videoSource={Videos.PARTY_VIDEO} />
      <LinearGradient
        colors={blackGradient}
        start={[1, 1]}
        end={[1, 0]}
        className="h-full w-full absolute z-20">
        <View className="flex flex-1 mx-[30px] my-[80px]">
          <View className="flex flex-1">
            <Typewriter
              sentences={[
                'Welcome to the typewriter effect!',
                'React Native with NativeWind is awesome!',
                'Keep building amazing projects.',
              ]}
              typingSpeed={100}
              pauseDuration={1500}
            />
          </View>
          <View className="flex flex-1 gap-y-2">
            <Button className="h-12" text="Lobby erstellen" variant="primary" />
            <Button className="h-12" text="Lobby beitreten" variant="primary" />
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  )
}
