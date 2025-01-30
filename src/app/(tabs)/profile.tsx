import React from 'react'
import { View } from 'react-native'

import { observer } from 'mobx-react-lite'

import { useAppContext } from '@/context'
import { useHeader } from '@/hooks'

import { Inventory, LevelProgress, Rewards, UsernameEditor } from '@/components/profile'
import ProfileImage from '@/components/ProfileImage'

const ProfileScreen = observer(() => {
  const { userStore } = useAppContext()

  useHeader({
    leftTx: 'tabs.profile',
    onRightPress: undefined,
    rightIcon: 'settings',
    rightIconLibrary: 'Ionicons',
  })

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

        <UsernameEditor />
      </View>

      {/* Level Progress */}
      <LevelProgress />

      {/* Rewards */}
      <Rewards />

      {/* Inventory */}
      <Inventory />
    </View>
  )
})

export default ProfileScreen
