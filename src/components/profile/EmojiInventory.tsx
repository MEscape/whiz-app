import React, { memo } from 'react'
import { Pressable, View } from 'react-native'

import { Icon, Text } from 'blueprints'
import { EMOJI_INVENTORY } from '@/constants/emojis'

interface EmojiInventoryProps {
  userLevel: number
}

const EmojiItem = memo(
  ({ emoji, isLocked, requiredLevel }: { emoji: string; isLocked: boolean; requiredLevel: number }) => (
    <View className="relative">
      <View
        className={`w-12 h-12 m-1 rounded-lg items-center justify-center ${
          isLocked ? 'bg-secondary/50' : 'bg-secondary'
        }`}>
        {isLocked ? (
          <View className="items-center">
            <Icon name="lock-closed" library="Ionicons" color="text-secondary" size={20} />
            <Text variant="caption" textColor="text-secondary" className="mt-1">
              Lvl {requiredLevel}
            </Text>
          </View>
        ) : (
          <Text variant="h2">{emoji}</Text>
        )}
      </View>
    </View>
  ),
)

export const EmojiInventory = memo(({ userLevel }: EmojiInventoryProps) => {
  return (
    <View className="px-4 py-2">
      <Text variant="h3" className="mb-2">
        Emoji Inventory
      </Text>
      <View className="flex-row flex-wrap justify-start">
        {EMOJI_INVENTORY.map(item => (
          <Pressable
            key={item.id}
            onPress={() => {
              // Optional: Show tooltip or description when pressed
              if (userLevel >= item.requiredLevel) {
                // Handle emoji selection
              }
            }}>
            <EmojiItem
              emoji={item.emoji}
              isLocked={userLevel < item.requiredLevel}
              requiredLevel={item.requiredLevel}
            />
          </Pressable>
        ))}
      </View>
    </View>
  )
}) 