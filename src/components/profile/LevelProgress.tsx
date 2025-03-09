import React from 'react'
import { View } from 'react-native'

import { Text } from 'blueprints'
import { LinearGradient } from 'expo-linear-gradient'
import { observer } from 'mobx-react-lite'

import { progressGradient, progressGradientDark } from '@/constants'
import { useAppContext } from '@/context'

export const LevelProgress = observer(() => {
  const { isDarkMode, userStore } = useAppContext()
  const gradientColors = isDarkMode ? progressGradientDark : progressGradient

  return (
    <View className="px-4 py-2">
      <View className="flex-row justify-between items-center mb-1">
        <Text variant="h3" className="font-bold">
          Level {userStore.level}
        </Text>
        <Text variant="caption">
          {userStore.experience}/{userStore.experienceToNextLevel} XP
        </Text>
      </View>

      <View className="h-3 bg-secondary/30 rounded-full overflow-hidden bg-secondary">
        <LinearGradient
          colors={gradientColors}
          start={[0, 0.5]}
          end={[1, 0.5]}
          className="h-full rounded-full"
          style={{ width: `${userStore.experienceProgress * 100}%` }}
        />
      </View>
    </View>
  )
})
