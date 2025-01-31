import React, { useCallback, useState } from 'react'
import { View } from 'react-native'

import { TextField } from 'blueprints'
import { observer } from 'mobx-react-lite'

import { useAppContext } from '@/context'
import { TxKeyPath } from '@/i18n'
import { pickImage } from '@/util'

import ProfileImage from '../ProfileImage'

export const ProfileSetup = observer(() => {
  const { userStore } = useAppContext()
  const [username, setUsername] = useState('')
  const [error, setError] = useState<TxKeyPath | null>(null)

  const handleChosePhoto = useCallback(async () => {
    const uri = await pickImage()
    userStore.setProfileImage(uri)
  }, [userStore])

  const handleOnEndEditing = () => {
    if (username.length < 4) {
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
      <ProfileImage onPress={handleChosePhoto} showHint imageUrl={userStore.profileImage} />
      <TextField
        placeholderTx="placeholder.username"
        iconLeft="person"
        value={username}
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
