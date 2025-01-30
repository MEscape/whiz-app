import React, { memo } from 'react'
import { View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

import { Text } from 'blueprints'
import { progressGradient, progressGradientDark } from '@/constants/colors'
import { useAppContext } from '@/context'

interface LevelProgressProps {
  level: number
  experience: number
  experienceToNextLevel: number
  experienceProgress: number
}

export const LevelProgress = memo(({ 
  level, 
  experience, 
  experienceToNextLevel, 
  experienceProgress 
}: LevelProgressProps) => {
  const { isDarkMode } = useAppContext()
  const gradientColors = isDarkMode ? progressGradientDark : progressGradient
  
  return (
    <View className="px-4 py-2">
      <View className="flex-row justify-between items-center mb-1">
        <Text variant="h3" className="font-bold">
          Level {level}
        </Text>
        <Text variant="caption">
          {experience}/{experienceToNextLevel} XP
        </Text>
      </View>
      
      <View className="h-3 bg-secondary/30 rounded-full overflow-hidden">
        <LinearGradient
          colors={gradientColors}
          start={[0, 0.5]}
          end={[1, 0.5]}
          className="h-full rounded-full"
          style={{ width: `${experienceProgress * 100}%` }}
        />
      </View>
      
      <Text variant="caption" className="mt-1 text-right text-accent">
        {Math.round(experienceProgress * 100)}% to Level {level + 1}
      </Text>
    </View>
  )
})
