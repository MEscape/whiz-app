import React, { useState } from 'react'
import { TouchableOpacity, View } from 'react-native'

import { Button, Image, Text } from 'blueprints'
import { LinearGradient } from 'expo-linear-gradient'
import { observer } from 'mobx-react-lite'

import { blackGradient } from '@/constants'
import { useAppContext } from '@/context'
import { sendData } from '@/services'

import { ImageUris } from 'assets/images'

export const StartSection = observer(({ disabled }: { disabled: boolean }) => {
  const { gameStore, router } = useAppContext()
  const [isLoading, setIsLoading] = useState(false)

  const handleChangeCollection = () => {
    gameStore.setCurrentlySelecting(true)
    router.push('/collection')
  }

  const handleStartGame = () => {
    setIsLoading(true)
    sendData({ body: { route: '/(game)/game' }, method: 'POST', path: '/force' })
  }

  return (
    <View className="absolute bottom-6 w-full p-4">
      <TouchableOpacity
        onPress={handleChangeCollection}
        className="relative w-full h-32 flex justify-center items-center"
        //disabled={disabled || isLoading}
      >
        <Image
          src={ImageUris[gameStore?.collection.image] || gameStore?.collection.image}
          classNameContainer="absolute top-0 left-0 w-full h-32 rounded-tl-md rounded-tr-md overflow-hidden"
        />
        <LinearGradient
          colors={blackGradient}
          className="absolute top-0 left-0 w-full h-32 rounded-tl-md rounded-tr-md"
        />
        <Text variant="h2" textColor="text-white" text={gameStore?.collection.name} />
      </TouchableOpacity>
      <Button
        //disabled={disabled || isLoading}
        isLoading={isLoading}
        tx="common.start"
        className="h-12 rounded-tr-none rounded-tl-none"
        onPress={handleStartGame}
      />
    </View>
  )
})
