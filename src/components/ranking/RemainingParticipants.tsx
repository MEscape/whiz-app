import React from 'react'
import { ScrollView, View } from 'react-native'

import { Text } from 'blueprints'

import { useAppContext } from '@/context'
import { translate } from '@/i18n'

import ProfileImage from '@/components/ProfileImage'

export const RemainingParticipants = () => {
  const { gameStore } = useAppContext()

  return (
    <ScrollView
      className="mt-4 px-4"
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}>
      {gameStore.remainingParticipants.map(player => {
        const profileImage = gameStore.processedImages.get(player.userId) || ''

        return (
          <View
            key={player.userId}
            className="flex flex-row items-center justify-between p-2 border-b border-secondary">
            <View className="flex flex-row items-center gap-x-2">
              <Text variant="h2" className="mr-2">
                {player.rank}#
              </Text>
              <ProfileImage
                imageUrl={profileImage}
                disabled={true}
                equippedEmojiId={player.equippedEmoji}
                size="small"
              />
              <Text textColor={player.userId === gameStore.myId ? 'text-accent' : 'text-text'}>
                {player.userId === gameStore.myId ? translate('common.me') : player.username}
              </Text>
            </View>
            <Text variant="small" textColor="text-gray">
              {player.points} points
            </Text>
          </View>
        )
      })}
    </ScrollView>
  )
}
