import React from 'react'
import { View } from 'react-native'

import { observer } from 'mobx-react-lite'

import { useAppContext } from '@/context'
import { useHeader } from '@/hooks'

import { LevelUpAnimation } from '@/components/animations/LevelUpAnimation'
import { Inventory, LevelProgress, PartyStats, Rewards, UsernameEditor } from '@/components/profile'
import ProfileImage from '@/components/ProfileImage'

const ProfileScreen = observer(() => {
  const { userStore } = useAppContext()

  useHeader({
    leftTx: 'tabs.profile',
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

      {/* Level Progress with Gradient */}
      <LevelProgress
        level={userStore.level}
        experience={userStore.experience}
        experienceToNextLevel={userStore.experienceToNextLevel}
        experienceProgress={userStore.experienceProgress}
      />

      {/* Party Stats */}
      <PartyStats stats={userStore.stats} />

      {/* Rewards */}
      <Rewards />

      {/* Replace the old inventory section with the new EmojiInventory */}
      <Inventory userLevel={userStore.level} />

      {userStore.isLevelingUp && (
        <LevelUpAnimation
          level={userStore.level}
          onAnimationFinish={() => userStore.setIsLevelingUp(false)}
        />
      )}
    </View>
  )
})

export default ProfileScreen
