import React from 'react'
import { View } from 'react-native'

import { LinearGradient } from 'expo-linear-gradient'

import { blackGradient } from '@/constants'
import { useAppContext } from '@/context'

import { ImageUris } from 'assets/images'

import { Image } from 'blueprints/Image'
import { Text } from 'blueprints/Text'

export const ResultHeader = () => {
  const { gameStore } = useAppContext()

  return (
    <>
      <Image
        src={ImageUris[gameStore.collection.image] || gameStore.collection.image}
        classNameContainer="absolute inset-0"
      />
      <LinearGradient colors={blackGradient} className="absolute inset-0" />
      <View className="absolute bottom-0 h-1 w-full bg-accent" />
      <View className="absolute inset-0 p-2 flex justify-center">
        <View className="p-4">
          <Text variant="h1" tx="tabs.result" textColor="text-accent" uppercase />
          <Text variant="h3" text={gameStore.collection.name} />
        </View>
        <Text variant="body" text={gameStore.collection.currentStage.name} />
      </View>
    </>
  )
}
