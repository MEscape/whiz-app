import React from 'react'
import { TouchableOpacity, View } from 'react-native'

import { Icon, Text } from 'blueprints'

import { useAppContext } from '@/context'

interface GameFooterProps {
  onSkip?: () => void
  onLeave?: () => void
}

export const GameFooter: React.FC<GameFooterProps> = ({ onLeave, onSkip }) => {
  const { gameStore } = useAppContext()

  return (
    <View className="flex-row items-center justify-between p-4">
      {/* Left: Lobby Info */}
      <View>
        <Text variant="h2">Lobby</Text>
        <Text variant="h1" uppercase fontWeight="bold" textColor="text-accent">
          {gameStore.lobbyId}
        </Text>
      </View>

      {/* Right: Buttons */}
      <View className="flex-row gap-x-4">
        {gameStore.isHost && (
          <TouchableOpacity
            onPress={onSkip}
            className="w-20 h-20 bg-gray rounded-full opacity-50 flex justify-center items-center">
            <Icon library="AntDesign" size={30} name="stepforward" color="text-gray" />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={onLeave}
          className="w-20 h-20 bg-red rounded-full opacity-50 flex justify-center items-center">
          <Icon size={30} library="Ionicons" name="log-out-outline" color="text-red" />
        </TouchableOpacity>
      </View>
    </View>
  )
}
