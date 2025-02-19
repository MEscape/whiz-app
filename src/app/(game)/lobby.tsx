import React, { useEffect, useState } from 'react'
import { View } from 'react-native'

import { useLocalSearchParams } from 'expo-router'
import { observer } from 'mobx-react-lite'

import { useAppContext } from '@/context'
import { useHeader } from '@/hooks'
import { TransferUser } from '@/services'
import { base64ToImage } from '@/util'

import { Button } from 'blueprints/Button'
import { Text } from 'blueprints/Text'

import ProfileImage from '@/components/ProfileImage'
import TcpEventManager from '@/services/TcpEventManager'

const LobbyScreen = observer(() => {
  const { isHost } = useLocalSearchParams()
  const { gameStore } = useAppContext()
  const [processedImages, setProcessedImages] = useState<{ [key: string]: string }>({})

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
    const handleData = (data: any) => {
      if (data.data?.id) {
        console.log('Setting lobby ID:', data.data.id)
        gameStore.setLobbyId(data.data.id)
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
      TcpEventManager.removeAllListeners()
      gameStore.clearStore()
    }
  }, [gameStore])

  useEffect(() => {
    console.log("isHost", isHost)
    gameStore.setIsHost(isHost === 'true')
  }, [isHost])

  useEffect(() => {
    const processImages = async () => {
      for (const [id, user] of gameStore.users.entries()) {
        console.log(user.profileImage && !processedImages[id])
        if (user.profileImage && !processedImages[id]) {
          try {
            const imageUrl = await base64ToImage(user.profileImage)
            console.log('Processed image:', imageUrl)
            setProcessedImages(prev => ({
              ...prev,
              [id]: imageUrl
            }))
          } catch (error) {
            console.error('Error processing image:', error)
          }
        }
      }
    }
  
    processImages()
  }, [gameStore.users])

  useEffect(() => {
    console.log('Processed images:', processedImages)
  }, [processedImages])

  return (
    <>
      <View className="bg-primary flex-1 p-4">
        <View className="flex-row flex-wrap gap-4">
          {Array.from(gameStore.users.entries()).map(([id, user]) => (
            <View className="items-center w-24" key={id}>
              <ProfileImage
                imageUrl={processedImages[id]}
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
