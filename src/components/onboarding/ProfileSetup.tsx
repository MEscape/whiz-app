import React, { useState } from 'react'
import { View } from 'react-native'

import { TextField } from 'blueprints'
import { observer } from 'mobx-react-lite'

import { useAppContext } from '@/context'
import { TxKeyPath } from '@/i18n'

import ProfileImage from '../ProfileImage'

export const ProfileSetup = observer(() => {
  const { userStore } = useAppContext()
  const [username, setUsername] = useState('')
  const [error, setError] = useState<TxKeyPath | null>(null)

  const handleOnEndEditing = () => {
    if (username.trim().length < 4) {
      return setError('error.username.less')
    }

    userStore.setUsername(username)
  }

  const handleOnChangeText = (text: string) => {
    setError(null)
    setUsername(text)
  }

  return (
    <View className="flex-1 w-full items-center justify-center py-4 h-full">
      <ProfileImage
        onPress={imageUri => {
          userStore.setProfileImage(imageUri)
        }}
        showHint
        imageUrl={userStore.profileImage}
      />
      <TextField
        placeholderTx="placeholder.username"
        iconLeft="person"
        className="w-full"
        variant="underlined"
        onChangeText={handleOnChangeText}
        onEndEditing={handleOnEndEditing}
        maxLength={15}
        errorTx={error}
      />
    </View>
  )
})
