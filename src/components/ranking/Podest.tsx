import React from 'react'
import { View } from 'react-native'

import { Icon, Text } from 'blueprints'

import { useAppContext } from '@/context'
import { translate } from '@/i18n'

import ProfileImage from '@/components/ProfileImage'

export const Podest = () => {
  const { gameStore } = useAppContext()

  const colors = [
    'rgba(199,168,51,0.8)', // Yellow for 1st
    'rgba(156, 163, 175, 0.8)', // Gray for 2nd
    'rgba(251, 146, 60, 0.8)', // Orange for 3rd
  ]

  return (
    <View className="flex flex-row items-stretch justify-center p-6 space-y-4 gap-x-2">
      {gameStore.topThreeUsers.map((player, index) => {
        const profileImage = gameStore.processedImages.get(player.userId) || ''

        return (
          <View
            key={player.userId}
            className="flex items-center justify-between w-1/3 rounded-lg p-4"
            style={{
              backgroundColor: colors[index],
            }}>
            <View
              className={`rounded-full p-1 ${player.userId === gameStore.myId ? 'bg-accent' : 'bg-white'}`}>
              <ProfileImage
                imageUrl={profileImage}
                disabled={true}
                equippedEmojiId={player.equippedEmoji}
              />
            </View>
            <Text variant="h2" className="mt-2">
              {player.userId === gameStore.myId ? translate('common.me') : player.username}
            </Text>
            <Text className="mt-1 text-white text-lg">{player.points} points</Text>
            <Icon
              library="Ionicons"
              name={index === 0 ? 'trophy' : 'medal'}
              size={24}
              color="text-black"
              className="mt-2"
            />
          </View>
        )
      })}
    </View>
  )
}
