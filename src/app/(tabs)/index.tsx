import React, { useEffect } from 'react'
import { SafeAreaView, View } from 'react-native'

import { Button, Image } from 'blueprints'
import { LinearGradient } from 'expo-linear-gradient'
import { observer } from 'mobx-react-lite'

import { BackgroundVideo, Typewriter } from '@/components'
import { blackGradient } from '@/constants'
import { useAppContext } from '@/context'
import { useAudioPlayer } from '@/hooks'
import { translate } from '@/i18n'

import { Audios, AudioUris } from 'assets/audios'
import { Images, ImageUris } from 'assets/images'
import { Videos, VideoUris } from 'assets/videos'

import { useHeader } from '@/hooks/useHeader'

const HomeScreen = observer(() => {
  const { collectionStore, toggleTheme } = useAppContext()
  const { loadAudio } = useAudioPlayer('music', 0.2)

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

  return (
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
              variant="primary"
              onPress={collectionStore.clearCollections}
            />
            <Button
              className="h-12"
              text="Lobby beitreten"
              variant="primary"
              onPress={toggleTheme}
            />
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  )
})

export default HomeScreen
