import React from 'react'
import { View } from 'react-native'

import { FlashList } from '@shopify/flash-list'

import { useAppContext } from '@/context'

import { Button } from 'blueprints/Button'
import { Text } from 'blueprints/Text'

const rewards = [
  { id: '1', requirement: 1, title: 'Played 1 game', xp: 100 },
  { id: '2', requirement: 5, title: 'Reached level 5', xp: 500 },
]

export const Rewards = () => {
  const { userStore } = useAppContext()

  return (
    <View className="px-4 py-2">
      <Text variant="h3" className="mb-2" tx="profile.availableRewards" />
      <FlashList
        data={rewards}
        horizontal
        estimatedItemSize={200}
        ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
        renderItem={({ item }) => (
          <View className="bg-secondary p-3 rounded-lg w-40">
            <Text variant="caption">{item.title}</Text>
            <Text variant="caption" textColor="text-accent">
              +{item.xp} XP
            </Text>
            <Button
              variant={userStore.gamesPlayed < item.requirement ? 'secondary' : 'primary'}
              tx="common.collect"
              className="mt-2"
              disabled={userStore.gamesPlayed < item.requirement}
              onPress={() => {
                userStore.claimReward(item.id)
                userStore.addExperience(item.xp)
              }}
            />
          </View>
        )}
      />
    </View>
  )
}
