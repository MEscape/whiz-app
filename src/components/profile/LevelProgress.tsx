import React, { memo } from 'react'
import { View } from 'react-native'

import { Text } from 'blueprints'
import { LinearGradient } from 'expo-linear-gradient'

import { progressGradient, progressGradientDark } from '@/constants'
import { useAppContext } from '@/context'

interface LevelProgressProps {
  level: number
  experience: number
  experienceToNextLevel: number
  experienceProgress: number
}

export const LevelProgress = memo(
  ({ experience, experienceProgress, experienceToNextLevel, level }: LevelProgressProps) => {
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

        <View className="h-3 bg-secondary/30 rounded-full overflow-hidden bg-secondary">
          <LinearGradient
            colors={gradientColors}
            start={[0, 0.5]}
            end={[1, 0.5]}
            className="h-full rounded-full"
            style={{ width: `${experienceProgress * 100}%` }}
          />
        </View>
      </View>
    )
  },
)
