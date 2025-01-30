import React from 'react'
import { View } from 'react-native'

import { Text } from 'blueprints/Text'

const emojis = ['🎮', '🎲', '🎯', '🎪', '🎨', '🎭', '🎪', '🎯']

export const Inventory = () => {
  return (
    <View className="px-4 py-2">
      <Text variant="h3" className="mb-2" tx="profile.inventory" />
      <View className="flex-row flex-wrap gap-2">
        {emojis.map((emoji, index) => (
          <View
            key={index}
            className="w-12 h-12 bg-secondary rounded-lg items-center justify-center">
            <Text variant="h2">{emoji}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}
