import React, { useEffect } from 'react'
import { View } from 'react-native'

import { useLocalSearchParams } from 'expo-router'
import { observer } from 'mobx-react-lite'

import { useAppContext } from '@/context'
import { useHeader } from '@/hooks'
import { TransferUser } from '@/services'

import { Button } from 'blueprints/Button'
import { Text } from 'blueprints/Text'

import ProfileImage from '@/components/ProfileImage'
import TcpEventManager from '@/services/TcpEventManager'

const LobbyScreen = observer(() => {
  const { isHost } = useLocalSearchParams()
  const { gameStore } = useAppContext()

  useHeader(
    {
      TitleActionComponent: (
        <View className="flex justify-center items-center">
          <Text variant="h1" className="text-4xl" tx="tabs.lobby" />
          <Text variant="h1" textColor="text-accent" uppercase>
            {gameStore.lobbyId}
          </Text>
        </View>
      ),
    },
    [],
  )

  useEffect(() => {
    TcpEventManager.on('data', data => {
      if (data.data.id) gameStore.setLobbyId(data.data.id)
      if (data.data.users) gameStore.setUsers(data.data.users)
    })

    return () => {
      TcpEventManager.removeAllListeners()
    }
  }, [])

  useEffect(() => {
    console.log(isHost)
    gameStore.setIsHost(isHost === 'true')
  }, [isHost])

  return (
    <>
      <View className="bg-primary flex-1 p-4">
        <View className="flex-row flex-wrap gap-4">
          {Object.values(gameStore.users).map((user: TransferUser, index: number) => (
            <View className="items-center w-24" key={index}>
              <ProfileImage
                imageUrl={user.profileImage}
                disabled={true}
                equippedEmojiId={user.equippedEmoji}
              />
              <Text className="mt-2 text-center">{user.username}</Text>
            </View>
          ))}
        </View>
      </View>
      <Button
        disabled={Object.keys(gameStore.users).length > 1}
        tx="common.start"
        className="h-12"
        outerClassName="absolute bottom-6 w-full p-4"
      />
    </>
  )
})

export default LobbyScreen
