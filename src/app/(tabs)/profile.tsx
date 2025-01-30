import React, { useEffect, useRef, useState } from 'react'
import { TextInput, View } from 'react-native'

import { FlashList } from '@shopify/flash-list'
import { Button, Icon, Text, TextField } from 'blueprints'
import { observer } from 'mobx-react-lite'

import { useAppContext } from '@/context'
import { useHeader } from '@/hooks'
import { TxKeyPath } from '@/i18n'

import ProfileImage from '@/components/ProfileImage'

const ProfileScreen = observer(() => {
  const { userStore } = useAppContext()
  const [isEditing, setIsEditing] = useState(false)
  const [editedUsername, setEditedUsername] = useState(userStore.username)
  const [error, setError] = useState<TxKeyPath | null>(null)
  const textFieldRef = useRef<TextInput>(null)

  useHeader({
    leftTx: 'tabs.profile',
    onRightPress: undefined,
    rightIcon: 'settings',
    rightIconLibrary: 'Ionicons',
  })

  const handleEditPress = () => {
    setIsEditing(true)
    setEditedUsername(userStore.username)
    if (textFieldRef.current) {
      console.log('A')
      textFieldRef.current.focus()
    }
  }

  const handleSave = () => {
    if (editedUsername.length < 4) {
      return setError('error.username.less')
    }

    if (editedUsername.length > 15) {
      return setError('error.username.much')
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

  const rewards = [
    { id: '1', requirement: 1, title: 'Played 1 game', xp: 100 },
    { id: '2', requirement: 5, title: 'Reached level 5', xp: 500 },
    // Add more rewards as needed
  ]

  const emojis = ['🎮', '🎲', '🎯', '🎪', '🎨', '🎭', '🎪', '🎯']

  useEffect(() => {
    console.log(editedUsername)
  }, [editedUsername])

  return (
    <View className="flex-1 bg-primary">
      {/* Profile Header */}
      <View className="flex-row items-center p-4">
        <ProfileImage
          imageUrl={userStore.profileImage}
          onPress={() => {
            // Handle profile image update
          }}
          showHint
        />

        <View className="flex-1 ml-4">
          {isEditing ? (
            <View className="flex-row items-center justify-around">
              <TextField
                ref={textFieldRef}
                value={editedUsername}
                onChangeText={setEditedUsername}
                className="w-2/3"
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
                  className="mr-2"
                />
                <Icon
                  name="close-circle"
                  library="Ionicons"
                  color="text-accent"
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
                size={16}
                onPress={handleEditPress}
              />
            </View>
          )}
        </View>
      </View>

      {/* Level Progress */}
      <View className="px-4 py-2">
        <Text variant="caption" className="mb-1">
          Level {userStore.level}
        </Text>
        <View className="h-2 bg-secondary rounded-full">
          <View
            className="h-full bg-accent rounded-full"
            style={{ width: `${userStore.experienceProgress * 100}%` }}
          />
        </View>
        <Text variant="caption" className="mt-1 text-right">
          {userStore.experience}/{userStore.experienceToNextLevel} XP
        </Text>
      </View>

      {/* Rewards */}
      <View className="px-4 py-2">
        <Text variant="h3" className="mb-2" tx="profile.availableRewards" />
        <FlashList
          data={rewards}
          horizontal
          estimatedItemSize={200}
          renderItem={({ item }) => (
            <View className="mr-4 bg-secondary p-3 rounded-lg w-40">
              <Text variant="caption">{item.title}</Text>
              <Text variant="caption" textColor="text-accent">
                +{item.xp} XP
              </Text>
              <Button
                variant={userStore.gamesPlayed < item.requirement ? 'secondary' : 'primary'}
                text="Collect"
                className="mt-2"
                disabled={userStore.gamesPlayed < item.requirement}
                onPress={() => {
                  userStore.claimReward(item.id)
                  userStore.addExperience(item.xp)
                }}
              />
            </View>
          )}
        />
      </View>

      {/* Inventory */}
      <View className="px-4 py-2">
        <Text variant="h3" className="mb-2" tx="profile.inventory" />
        <View className="flex-row flex-wrap gap-2">
          {emojis.map((emoji, index) => (
            <View
              key={index}
              className="w-12 h-12 bg-secondary rounded-lg items-center justify-center">
              <Text variant="h2">{emoji}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  )
})

export default ProfileScreen
