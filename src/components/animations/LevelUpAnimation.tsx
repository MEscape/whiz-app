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
    // Small delay to ensure component is mounted
    const timer = setTimeout(() => {
      if (animationRef.current) {
        animationRef.current.reset()
        animationRef.current.play()
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  cssInterop(LottieView, { className: 'style' })

  const handleManualAnimationFinish = () => {
    if (onAnimationFinish) {
      onAnimationFinish()
    }
  }

  return (
    <>
      <Pressable
        className="absolute inset-0 items-center justify-center bg-black/50"
        onPress={handleManualAnimationFinish}
      />
      <View className="absolute inset-0 flex items-center justify-center">
        <LottieView
          ref={animationRef}
          source={AnimationUris[Animations.LEVEL_UP]}
          autoPlay={true}
          loop={false}
          className="mb-4 h-56 w-56"
          onAnimationFinish={handleManualAnimationFinish}
        />
        <Text
          variant="h1"
          textColor="text-accent"
          className="mt-4 text-center animate-bounce text-7xl"
          text={`Level ${level}!`}
        />
      </View>
    </>
  )
}
