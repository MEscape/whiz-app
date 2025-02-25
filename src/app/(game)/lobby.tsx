import React, { useEffect } from 'react'
import { ScrollView, View } from 'react-native'

import { useLocalSearchParams } from 'expo-router'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { useAppContext } from '@/context'
import { useHeader } from '@/hooks'
import { base64ToImage } from '@/util'

import { Text } from 'blueprints/Text'

import { LobbySkeleton, StartSection } from '@/components/lobby'
import ProfileImage from '@/components/ProfileImage'
import TcpEventManager from '@/services/TcpEventManager'

const LobbyScreen = observer(() => {
  const { isHost } = useLocalSearchParams()
  const { gameStore } = useAppContext()

  useHeader(
    {
      rightIcon: 'settings',
      rightIconLibrary: 'Ionicons',
      TitleActionComponent: (
        <View className="flex-1 justify-center items-center">
          <Text variant="h1" className="text-4xl" tx="tabs.lobby" />
          <Text variant="h1" textColor="text-accent" uppercase>
            {gameStore.lobbyId}
          </Text>
        </View>
      )
    },
    [gameStore.lobbyId],
  )

  useEffect(() => {
    const handleData = (data: any) => {
      if (data.data?.id) {
        console.log('Setting lobby ID:', data.data.id)
        gameStore.setLobbyId(data.data.id)
      }

      if (data.data?.collection) {
        console.log('Setting collection:', data.data.collection)
        gameStore.setRemoteCollection(data.data.collection)
      }
      
      if (data.data?.users) {
        console.log('Setting users:', data.data.users)
        gameStore.setUsers(data.data.users)
      }
    }

    const handleImage = (image: Record<string, string>) => {
      gameStore.setProfileImage(image)
    }

    TcpEventManager.on('data', handleData)
    TcpEventManager.on('image', handleImage)

    return () => {
      TcpEventManager.removeListener('data', handleData)
      TcpEventManager.removeListener('image', handleImage)
      gameStore.clearStore()
    }
  }, [gameStore])

  useEffect(() => {
    if (isHost) {
      gameStore.setIsHost(isHost === 'true')
    }
  }, [isHost])

  useEffect(() => {
    (async () => {
      for (const [id, user] of gameStore.users.entries()) {
        if (user.profileImage && !gameStore.processedImages.get(id)) {
          const imageUrl = await base64ToImage(user.profileImage)
          gameStore.setProcessedImages(id, imageUrl)
        }
      }
    })();
  }, [toJS(gameStore.users)])

  return (
    <>
      {gameStore.lobbyId ? (
        <View className="bg-primary flex-1 p-4">
          <ScrollView className="flex-row flex-wrap gap-4">
            {Array.from(gameStore.users.entries()).map(([id, user]) => (
              <View className="items-center w-24" key={id}>
                <ProfileImage
                  imageUrl={gameStore.processedImages.get(id)}
                  disabled={true}
                  equippedEmojiId={user.equippedEmoji}
                />
                <View className="flex-row items-center mt-2">
                  <Text className="text-center">{user.username}</Text>
                  {user.isHost && <Text className="ml-1">👑</Text>}
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      ) : <LobbySkeleton />}
      <StartSection disabled={!gameStore.isHost} />
    </>
  )
})

export default LobbyScreen
