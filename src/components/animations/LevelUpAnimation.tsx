import React from 'react'

import { Animation, Text } from 'blueprints'

import { Animations, AnimationUris } from 'assets/animations'
import { useWindowDimensions } from 'react-native'

interface LevelUpAnimationProps {
  level: number
  onAnimationFinish?: () => void
}

export const LevelUpAnimation = ({ level, onAnimationFinish }: LevelUpAnimationProps) => {
  const {height} = useWindowDimensions()
  return (
    <Animation style={{height}} source={AnimationUris[Animations.LEVEL_UP]} resizeMode='cover' onAnimationFinish={onAnimationFinish}>
      <Text
        variant="h1"
        textColor="text-accent"
        className="mt-4 text-center animate-bounce text-7xl"
        text={`Level ${level}!`}
      />
    </Animation>
  )
}
