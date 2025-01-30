import React, { useCallback, useState } from 'react'
import { View } from 'react-native'

import { TextField } from 'blueprints'
import { observer } from 'mobx-react-lite'

import { useAppContext } from '@/context'
import { pickImage } from '@/util'

import ProfileImage from '../ProfileImage'

export const ProfileSetup = observer(() => {
  const { userStore } = useAppContext()
  const [username, setUsername] = useState('')

  const handleChosePhoto = useCallback(async () => {
    const uri = await pickImage()
    userStore.setProfileImage(uri)
  }, [userStore])

  return (
    <View className="flex-1 w-full items-center justify-center py-4 h-full">
      <ProfileImage onPress={handleChosePhoto} showHint imageUrl={userStore.profileImage} />
      <TextField
        placeholderTx="placeholder.username"
        iconLeft="person"
        value={username}
        variant="underlined"
        onChangeText={setUsername}
        onEndEditing={() => userStore.setUsername(username)}
        maxLength={15}
      />
    </View>
  )
})
