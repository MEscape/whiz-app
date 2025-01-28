import React, { useState } from 'react'
import { View } from 'react-native'

import { observer } from 'mobx-react-lite'

import { useAppContext } from '@/context'
import { pickImage } from '@/util'

import { TextField } from 'blueprints/TextField'

import ProfileImage from '@/components/ProfileImage'

export const ProfileSetup = observer(() => {
  const { userStore } = useAppContext()
  const [username, setUsername] = useState(userStore.username || '')
  const [profileImage, setProfileImage] = useState(userStore.profileImage || null)

  const handleChosePhoto = async () => {
    const uri = await pickImage()
    userStore.setProfileImage(uri)
    setProfileImage(uri)
  }

  return (
    <View className="flex-1 w-full items-center justify-center py-4 h-full">
      <ProfileImage onPress={handleChosePhoto} showHint imageUrl={profileImage} />
      <TextField
        placeholderTx="placeholder.username"
        iconLeft="person"
        value={username}
        variant="underlined"
        onChangeText={setUsername}
        onEndEditing={() => userStore.setUsername(username)}
      />
    </View>
  )
})
