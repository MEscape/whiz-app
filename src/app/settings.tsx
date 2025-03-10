import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, View } from 'react-native'

import { Button, Icon, Image, Slider, Text, Toggle } from 'blueprints'
import { Audio } from 'expo-av'
import * as Notifications from 'expo-notifications'
import { observer } from 'mobx-react-lite'

import { AppConfig } from '@/constants'
import { useAppContext } from '@/context'
import { useHeader } from '@/hooks'
import { ContentLanguage } from '@/i18n'
import { openLink, shareApp } from '@/util'

import { Icons, IconUris } from 'assets/icons'
import { Images, ImageUris } from 'assets/images'

const SettingsScreen = observer(() => {
  const { isDarkMode, language, router, setAppLanguage, settingStore, toggleTheme } =
    useAppContext()

  const [isMuted, setIsMuted] = useState({ music: false, sound: false })

  useHeader(
    {
      leftIcon: 'arrow-back',
      leftIconLibrary: 'Ionicons',
      leftTx: 'tabs.settings',
      onLeftPress: () => router.back(),
    },
    [router],
  )

  const handleLanguageChange = () => {
    setAppLanguage(language === 'de' ? ('en' as ContentLanguage) : ('de' as ContentLanguage))
  }

  const handleMute = (type: 'sound' | 'music') => {
    const muted = !isMuted[type]
    settingStore[`setVolume${type.charAt(0).toUpperCase() + type.slice(1)}`](+!muted)
  }

  useEffect(() => {
    setIsMuted(prevState => ({
      ...prevState,
      music: settingStore.volumeMusic === 0,
      sound: settingStore.volumeSound === 0,
    }))
  }, [settingStore.volumeSound, settingStore.volumeMusic])

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1 bg-primary">
        <View className="h-32 flex p-4 flex-row items-center">
          <Image
            loadingEnabled
            src={{ dark: ImageUris[Images.LOGO_LIGHT], light: ImageUris[Images.LOGO_DARK] }}
            classNameContainer="w-20"
          />
          <View className="px-4">
            <Text variant="h1" text="Whiz" uppercase />
            <Text variant="h3" tx="whiz.slogan" />
          </View>
        </View>

        <View className="flex flex-col gap-y-2 p-4">
          <Button
            variant="secondary"
            onPress={() => openLink(AppConfig.SUPPORT_URL)}
            text="Support"
            leftIcon="heart"
          />
          <Button
            variant="primary"
            onPress={shareApp}
            tx="settings.shareApp"
            leftIcon="share-social"
          />
        </View>

        <View className="flex bg-secondary p-4 mx-4 rounded-md">
          <Text variant="h2" tx="settings.graphical" className="mb-4" />
          <View className="flex-row justify-between items-center mb-1">
            <Text tx="settings.color" />
            <Toggle
              variant="switch"
              value={isDarkMode}
              offIconName="sunny"
              onIconName="moon"
              onValueChange={toggleTheme}
              backgroundColor="bg-primary"
            />
          </View>

          <View className="flex-row justify-between items-center">
            <Text tx="settings.language" />
            <Toggle
              variant="switch"
              onIconLibrary="custom"
              onIconName={IconUris[Icons.ENGLISH]}
              offIconName={IconUris[Icons.GERMANY]}
              offIconLibrary="custom"
              value={language === 'de'}
              onValueChange={handleLanguageChange}
              backgroundColor="bg-primary"
            />
          </View>
        </View>

        <View className="flex bg-secondary p-4 mx-4 my-2 rounded-md">
          <Text variant="h2" tx="settings.audio" className="mb-4" />
          <View className="flex-row justify-between items-center mb-1 w-full">
            <Text tx="settings.sound" />
            <Slider
              value={settingStore.volumeSound}
              onValueChange={settingStore.setVolumeSound}
            />
            <Icon
              name={isMuted.sound ? 'volume-mute' : 'volume-high'}
              library="Ionicons"
              onPress={() => handleMute('sound')}
            />
          </View>
          <View className="flex-row justify-between items-center w-full">
            <Text tx="settings.music" />
            <Slider
              value={settingStore.volumeMusic}
              onValueChange={settingStore.setVolumeMusic}
            />
            <Icon
              name={isMuted.music ? 'volume-mute' : 'volume-high'}
              library="Ionicons"
              onPress={() => handleMute('music')}
            />
          </View>
        </View>

        <View className="flex bg-secondary p-4 mx-4 rounded-md">
          <Text variant="h2" tx="settings.authorization" />
          <Text
            variant="small"
            text="Die folgenden Knöpfe haben keinen Effekt, sollten die Berechtigungen schon erteilt worden sein."
            className="mb-4"
          />
          <View className="flex-row flex-1 w-full gap-x-2">
            <Button
              outerClassName="flex-1"
              tx="settings.notifications"
              onPress={Notifications.requestPermissionsAsync}
            />
            <Button
              outerClassName="flex-1"
              tx="settings.audioPlayback"
              onPress={Audio.requestPermissionsAsync}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
})

export default SettingsScreen
