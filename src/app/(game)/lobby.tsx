import React, { useEffect } from 'react'
import { ScrollView, View } from 'react-native'

import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { useAppContext } from '@/context'
import { useHeader } from '@/hooks'
import { base64ToImage } from '@/util'

import { Text } from 'blueprints/Text'

import { LobbySkeleton, StartSection } from '@/components/lobby'
import ProfileImage from '@/components/ProfileImage'
import { Codes } from '@/services/Codes'
import TcpEventManager from '@/services/TcpEventManager'

const LobbyScreen = observer(() => {
  const { gameStore, router } = useAppContext()

  useHeader(
    {
      /*onRightPress: () => router.push('/(game)/settings'),
      rightIcon: 'settings',
      rightIconLibrary: 'Ionicons',*/
      TitleActionComponent: (
        <View className="flex-1 justify-center items-center">
          <Text variant="h1" className="text-4xl" tx="tabs.lobby" />
          <Text variant="h1" textColor="text-accent" uppercase>
            {gameStore.lobbyId}
          </Text>
        </View>
      ),
    },
    [gameStore.lobbyId, router],
  )

  useEffect(() => {
    const handleData = (data: any) => {
      if (data.code === Codes.COLLECTION) {
        gameStore.setRemoteCollection(data.data.collection)
      }

      if (data.code === Codes.LOBBY) {
        gameStore.setLobbyId(data.data?.id)
        gameStore.setUsers(data.data?.users)
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
    ;(async () => {
      for (const [id, user] of gameStore.users.entries()) {
        if (user.profileImage && !gameStore.processedImages.get(id)) {
          const imageUrl = await base64ToImage(user.profileImage)
          gameStore.setProcessedImages(id, imageUrl)
        }
      }
    })()
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
      ) : (
        <LobbySkeleton />
      )}
      <StartSection disabled={!gameStore.isHost} />
    </>
  )
})

export default LobbyScreen
