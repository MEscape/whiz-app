import React, { useState } from 'react'
import { Text, View } from 'react-native'

import { observer } from 'mobx-react-lite'

import { useAppContext } from '@/context'

import { TextField } from 'blueprints/TextField'

export const ProfileSetup = observer(() => {
  const { userStore } = useAppContext()
  const [username, setUsername] = useState(userStore.username || '')

  return (
    <View className="flex-1 w-full">
      <TextField error="fehler" placeholder="Test" iconLeft="home" secureTextEntry />
    </View>
  )
})
