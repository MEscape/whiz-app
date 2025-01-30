import React from 'react'
import { View } from 'react-native'

import { useAppContext } from '@/context'

import { Text } from 'blueprints/Text'

export const LevelProgress = () => {
  const { userStore } = useAppContext()

  return (
    <View className="px-4 py-2">
      <Text variant="caption" className="mb-1">
        Level {userStore.level}
      </Text>
      <View className="h-2 bg-secondary rounded-full">
        <View
          className="h-full bg-accent rounded-full"
          style={{ width: `${userStore.experienceProgress * 100}%` }}
        />
      </View>
      <Text variant="caption" className="mt-1 text-right">
        {userStore.experience}/{userStore.experienceToNextLevel} XP
      </Text>
    </View>
  )
}
