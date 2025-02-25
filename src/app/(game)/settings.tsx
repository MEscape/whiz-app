import React from 'react'
import { View } from 'react-native'

import { useAppContext } from '@/context'
import { useHeader } from '@/hooks'

import { Text } from 'blueprints/Text'

const SettingsScreen = () => {
  const { router } = useAppContext()

  useHeader(
    {
      leftIcon: 'arrow-back',
      leftIconLibrary: 'Ionicons',
      leftTx: 'tabs.settings',
      onLeftPress: () => router.back(),
    },
    [router],
  )

  return (
    <View className="flex-1 bg-primary">
      <Text>Test</Text>
    </View>
  )
}

export default SettingsScreen
