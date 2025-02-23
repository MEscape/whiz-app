import React, { useMemo } from 'react'
import { View } from 'react-native'

import { observer } from 'mobx-react-lite'
import { FlatList } from 'react-native-gesture-handler'

import { useAppContext } from '@/context'

import { Button } from 'blueprints/Button'
import { Text } from 'blueprints/Text'

import { rewards } from '@/constants/rewards'

export const Rewards = observer(() => {
  const { userStore } = useAppContext()

  const { availableRewards, lockedRewards } = useMemo(() => {
    const available = rewards
      .filter(reward => userStore.gamesPlayed >= reward.requirement)
      .sort((a, b) => a.requirement - b.requirement)

    const locked = rewards
      .filter(reward => userStore.gamesPlayed < reward.requirement)
      .sort((a, b) => a.requirement - b.requirement)

    return { availableRewards: available, lockedRewards: locked }
  }, [userStore.gamesPlayed])

  const combinedRewards = [...availableRewards, ...lockedRewards].filter(
    item => !userStore.claimedRewards.includes(item.id),
  )

  return (
    <View className="px-4 py-6">
      <Text variant="h3" className="mb-2" tx="profile.availableRewards" />
      <FlatList
        data={combinedRewards}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        overScrollMode="never"
        ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
        renderItem={({ item }) => (
          <View className="bg-secondary p-3 rounded-lg w-40 min-h-36 flex justify-between items-center">
            <View>
              <Text variant="caption" tx={item.txKeyPath} />
              <Text variant="caption" textColor="text-accent">
                +{item.xp} XP
              </Text>
            </View>

            <Button
              variant={userStore.gamesPlayed < item.requirement ? 'secondary' : 'primary'}
              tx="common.collect"
              outerClassName="mt-2 w-full"
              disabled={userStore.gamesPlayed < item.requirement}
              onPress={() => userStore.claimReward(item)}
            />
          </View>
        )}
      />
    </View>
  )
})
