import React, { useEffect, useRef, useState } from 'react'
import { TextInput, View } from 'react-native'

import { useAppContext } from '@/context'
import { TxKeyPath } from '@/i18n'

import { Icon } from 'blueprints/Icon'
import { Text } from 'blueprints/Text'
import { TextField } from 'blueprints/TextField'

export const UsernameEditor = () => {
  const { userStore } = useAppContext()

  const [isEditing, setIsEditing] = useState(false)
  const [editedUsername, setEditedUsername] = useState(userStore.username)
  const [error, setError] = useState<TxKeyPath | null>(null)
  const textFieldRef = useRef<TextInput>(null)

  const handleEditPress = () => {
    setIsEditing(true)
    setEditedUsername(userStore.username)
  }

  const handleSave = () => {
    if (editedUsername.length < 4) {
      return setError('error.username.less')
    }

    userStore.setUsername(editedUsername)
    setIsEditing(false)
    setError(null)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setError(null)
    setEditedUsername(userStore.username)
  }

  const handleOnChangeText = (text: string) => {
    setError(null)
    setEditedUsername(text)
  }

  useEffect(() => {
    if (isEditing && textFieldRef.current) {
      textFieldRef.current.focus()
    }
  }, [isEditing])

  return (
    <View className="flex-1 ml-4">
      {isEditing ? (
        <View className="flex-row items-center justify-around gap-x-2">
          <TextField
            ref={textFieldRef}
            value={editedUsername}
            onChangeText={handleOnChangeText}
            placeholder="Username"
            maxLength={15}
            errorTx={error}
          />
          <View className="flex-row items-center">
            <Icon
              name="checkmark-circle"
              library="Ionicons"
              color="text-accent"
              size={24}
              onPress={handleSave}
              className="p-2"
            />
            <Icon
              name="close-circle"
              library="Ionicons"
              color="text-accent"
              className="p-2"
              size={24}
              onPress={handleCancel}
            />
          </View>
        </View>
      ) : (
        <View className="flex-row items-center">
          <Text variant="h2" className="mr-2">
            {userStore.username}
          </Text>
          <Icon
            name="pencil"
            library="Ionicons"
            color="text-accent"
            size={24}
            className="p-2"
            onPress={handleEditPress}
          />
        </View>
      )}
    </View>
  )
}
