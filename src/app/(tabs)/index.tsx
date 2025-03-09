import React, { useEffect, useState } from 'react'
import { SafeAreaView, View } from 'react-native'

import * as Sentry from '@sentry/react-native'
import { BottomSheet, BottomSheetInput, Button, Image } from 'blueprints'
import { LinearGradient } from 'expo-linear-gradient'
import { observer } from 'mobx-react-lite'

import { BackgroundVideo, Typewriter } from '@/components'
import { blackGradient } from '@/constants'
import { useAppContext } from '@/context'
import { useAudioPlayer } from '@/hooks'
import { translate, TxKeyPath } from '@/i18n'
import { decodeIp, showErrorToast } from '@/util'

import { Audios, AudioUris } from 'assets/audios'
import { Images, ImageUris } from 'assets/images'
import { Videos, VideoUris } from 'assets/videos'

import { useHeader } from '@/hooks/useHeader'
import TcpEventManager from '@/services/TcpEventManager'

const HomeScreen = observer(() => {
  const { createLobby, gameStore, joinLobby, router, userStore } = useAppContext()
  const { loadAudio } = useAudioPlayer('music', 0.2)

  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false)
  const [lobbyId, setLobbyId] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useHeader(
    {
      backgroundColor: 'transparent',
      TitleActionComponent: (
        <Image src={ImageUris[Images.LOGO_DARK]} classNameContainer="h-16 w-16 p-2" />
      ),
    },
    [],
  )

  useEffect(() => {
    loadAudio(AudioUris[Audios.LOBBY_AUDIO], {
      isLooping: true,
      shouldPlay: true,
      volume: 0.2,
    })
  }, [loadAudio])

  useEffect(() => {
    gameStore.clearStore()

    TcpEventManager.on('connected', async response => {
      setIsLoading(false)
      gameStore.setIsHost(response.isHost)
      gameStore.setMyId(response.id)
      response.lobbyId && gameStore.setLobbyId(response.lobbyId)
      response.users && gameStore.setUsers(response.users)
      response.collection && (await gameStore.setRemoteCollection(response.collection))

      return router.push('/(game)/lobby')
    })

    TcpEventManager.on('error', response => {
      showErrorToast(translate(`error.${response?.code}` as TxKeyPath) || response.error)
      setIsLoading(false)
    })

    return () => {
      TcpEventManager.removeAllListeners()
    }
  }, [router, gameStore])

  const handleCreateLobby = () => {
    setIsLoading(true)
    createLobby({ ...userStore.transferUser, isHost: true })
  }

  const handleJoinLobby = () => {
    setIsLoading(true)
    joinLobby(decodeIp(lobbyId), userStore.transferUser)
  }

  return (
    <>
      <SafeAreaView className="flex h-full bg-black">
        <BackgroundVideo videoSource={VideoUris[Videos.PARTY_VIDEO]} />
        <LinearGradient
          colors={blackGradient}
          start={[1, 1]}
          end={[1, 0]}
          className="h-full w-full absolute">
          <View className="flex flex-1 mx-[30px] my-[80px]">
            <View className="flex flex-1">
              <Typewriter
                sentences={translate('whiz.sentences') as unknown as string[]}
                typingSpeed={100}
                pauseDuration={1500}
              />
            </View>
            <View className="flex flex-1 gap-y-2">
              <Button
                className="h-12"
                text="Lobby erstellen"
                isLoading={isLoading}
                variant="primary"
                onPress={handleCreateLobby}
              />
              <Button
                className="h-12"
                text="Lobby beitreten"
                variant="primary"
                onPress={() => setIsBottomSheetVisible(true)}
              />
            </View>
          </View>
        </LinearGradient>
      </SafeAreaView>
      <BottomSheet
        title="lobby.join"
        isVisible={isBottomSheetVisible}
        onClose={() => setIsBottomSheetVisible(false)}
        snapPoints={['30%']}>
        <View className="flex-1 p-4">
          <BottomSheetInput
            variant="underlined"
            placeholderTx="placeholder.lobbyId"
            maxLength={8}
            value={lobbyId}
            onChangeText={setLobbyId}
          />
          <Button
            tx="common.join"
            outerClassName="flex-1"
            isLoading={isLoading}
            disabled={lobbyId.trim().length !== 8}
            onPress={handleJoinLobby}
            className="h-12"
          />
        </View>
      </BottomSheet>
    </>
  )
})

export default HomeScreen
