import React, { useEffect, useRef } from 'react'
import { Pressable, View } from 'react-native'

import { Text } from 'blueprints'
import LottieView from 'lottie-react-native'
import { cssInterop } from 'nativewind'

import { Animations, AnimationUris } from 'assets/animations'

interface LevelUpAnimationProps {
  level: number
  onAnimationFinish?: () => void
}

export const LevelUpAnimation = ({ level, onAnimationFinish }: LevelUpAnimationProps) => {
  const animationRef = useRef<LottieView>(null)

  useEffect(() => {
    if (animationRef.current) {
      console.log('Animation ref is set, playing animation...')
      animationRef.current.play()
    } else {
      console.log('animationRef is still null')
    }
  }, [level])

  cssInterop(LottieView, { className: 'style' })

  const handleManualAnimationFinish = () => {
    if (animationRef.current) {
      animationRef.current.reset()
    }

    onAnimationFinish()
  }

  return (
    <>
      <Pressable
        className="absolute inset-0 items-center justify-center bg-black opacity-50 transition-opacity ease-in-out duration-200"
        onPress={handleManualAnimationFinish}
      />
      <View className="absolute inset-0 flex items-center justify-center">
        <LottieView
          ref={animationRef}
          source={AnimationUris[Animations.LEVEL_UP]}
          autoPlay={false}
          loop={false}
          className="mb-4 h-56 w-56"
          onAnimationFinish={onAnimationFinish}
        />
        <Text
          variant="h1"
          textColor="text-accent"
          className="mt-4 text-center animate-bounce text-7xl"
          text={`Level ${level}!`}
          onPress={() => animationRef.current.play()}
        />
      </View>
    </>
  )
}
