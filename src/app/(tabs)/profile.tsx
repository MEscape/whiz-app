import React, { useState } from 'react'
import { View } from 'react-native'
import { FlashList } from '@shopify/flash-list'
import { observer } from 'mobx-react-lite'

import { Button, Header, Icon, Text, TextField } from 'blueprints'
import ProfileImage from '@/components/ProfileImage'
import { useAppContext } from '@/context'
import { useHeader } from '@/hooks'

const ProfileScreen = observer(() => {
  const { userStore } = useAppContext()
  const [isEditing, setIsEditing] = useState(false)
  const [editedUsername, setEditedUsername] = useState(userStore.username)

  useHeader({
    title: 'Profile',
    rightIcon: 'settings',
    rightIconLibrary: 'Ionicons',
    onRightPress: () => {
      // Handle settings navigation
    },
  })

  const handleEditPress = () => {
    setIsEditing(true)
    setEditedUsername(userStore.username)
  }

  const handleSave = () => {
    if (editedUsername.length >= 4 && editedUsername.length <= 15) {
      userStore.setUsername(editedUsername)
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditedUsername(userStore.username)
  }

  const rewards = [
    { id: '1', title: 'Played 1 game', requirement: 1, xp: 100 },
    { id: '2', title: 'Reached level 5', requirement: 5, xp: 500 },
    // Add more rewards as needed
  ]

  const emojis = ['🎮', '🎲', '🎯', '🎪', '🎨', '🎭', '🎪', '🎯']

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
            <View className="flex-row items-center">
              <TextField
                value={editedUsername}
                onChangeText={setEditedUsername}
                className="flex-1 mr-2"
                placeholder="Username"
                maxLength={15}
              />
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
          ) : (
            <View className="flex-row items-center">
              <Text variant="h2" className="flex-1">
                {userStore.username}
              </Text>
              <Icon
                name="pencil"
                library="Ionicons"
                color="text-accent"
                size={20}
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
        <Text variant="h3" className="mb-2">
          Available Rewards
        </Text>
        <View className="h-24">
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
                  variant="primary"
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
      </View>

      {/* Inventory */}
      <View className="px-4 py-2">
        <Text variant="h3" className="mb-2">
          Inventory
        </Text>
        <View className="flex-row flex-wrap">
          {emojis.map((emoji, index) => (
            <View
              key={index}
              className="w-12 h-12 m-1 bg-secondary rounded-lg items-center justify-center">
              <Text variant="h2">{emoji}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  )
})

export default ProfileScreen
