import React, { memo, useEffect } from 'react'
import { Pressable, Vibration, View } from 'react-native'

import { Icon, Text } from 'blueprints'
import { observer } from 'mobx-react-lite'

import { useAppContext } from '@/context'

import { Audios, AudioUris } from 'assets/audios'

import { EMOJI_INVENTORY } from '@/constants/emojis'
import { useAudioPlayer } from '@/hooks/useAudioPlayer'

const EmojiItem = memo(
  ({
    emoji,
    isEquipped,
    isLocked,
    onPress,
    requiredLevel,
  }: {
    emoji: string
    isLocked: boolean
    requiredLevel: number
    isEquipped: boolean
    onPress: () => void
  }) => (
    <Pressable onPress={onPress}>
      <View className="relative">
        <View
          className={`w-12 h-12 rounded-lg items-center justify-center ${
            isLocked ? 'bg-secondary/50' : isEquipped ? 'bg-accent' : 'bg-secondary'
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
        {isEquipped && (
          <View className="absolute -top-1 -right-1 bg-accent rounded-full p-1">
            <Icon name="checkmark-circle" library="Ionicons" color="text-white" size={14} />
          </View>
        )}
      </View>
    </Pressable>
  ),
)

export const Inventory = memo(
  observer(() => {
    const { userStore } = useAppContext()
    const { isPlaying, loadAudio, playAudio, stopAudio } = useAudioPlayer()

    useEffect(() => {
      loadAudio(AudioUris[Audios.EQUIP_SOUND])
    }, [loadAudio])

    const handleEmojiPress = async (emojiId: string) => {
      if (
        !userStore.canEquipEmoji(EMOJI_INVENTORY.find(e => e.id === emojiId)?.requiredLevel ?? 0)
      ) {
        return
      }

      if (isPlaying) stopAudio()
      playAudio()
      Vibration.vibrate(10)

      if (userStore.equippedEmoji === emojiId) {
        userStore.equipEmoji(null)
      } else {
        userStore.equipEmoji(emojiId)
      }
    }

    return (
      <View className="px-4 py-6">
        <Text variant="h3" className="mb-2" tx="profile.inventory" />
        <View className="flex-row flex-wrap justify-start gap-2">
          {EMOJI_INVENTORY.map(item => (
            <EmojiItem
              key={item.id}
              emoji={item.emoji}
              isLocked={userStore.level < item.requiredLevel}
              requiredLevel={item.requiredLevel}
              isEquipped={userStore.equippedEmoji === item.id}
              onPress={() => handleEmojiPress(item.id)}
            />
          ))}
        </View>
      </View>
    )
  }),
)
