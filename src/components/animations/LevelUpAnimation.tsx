import React, { useEffect, useRef } from 'react'
import { View } from 'react-native'
import LottieView from 'lottie-react-native'

import { Text } from 'blueprints'
import { Animations } from 'assets/animations'

interface LevelUpAnimationProps {
  level: number
  onAnimationFinish?: () => void
}

export const LevelUpAnimation = ({ level, onAnimationFinish }: LevelUpAnimationProps) => {
  const animationRef = useRef<LottieView>(null)

  useEffect(() => {
    if (animationRef.current) {
      animationRef.current.play()
    }
  }, [level])

  return (
    <View className="absolute inset-0 items-center justify-center bg-black/50">
      <View className="items-center">
        <LottieView
          ref={animationRef}
          source={Animations.LEVEL_UP}
          autoPlay={false}
          loop={false}
          style={{ width: 200, height: 200 }}
          onAnimationFinish={onAnimationFinish}
        />
        <Text
          variant="h1"
          textColor="text-accent"
          className="mt-4 text-center animate-bounce"
          text={`Level ${level}!`}
        />
      </View>
    </View>
  )
} 