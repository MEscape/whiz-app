import React from 'react'
import { View } from 'react-native'

import { observer } from 'mobx-react-lite'

import { useAppContext } from '@/context'
import { useHeader } from '@/hooks'

import { Inventory, LevelProgress, Rewards, UsernameEditor } from '@/components/profile'
import ProfileImage from '@/components/ProfileImage'
import { PartyStats } from '@/components/profile/PartyStats'
import { LevelUpAnimation } from '@/components/animations/LevelUpAnimation'
import { EmojiInventory } from '@/components/profile/EmojiInventory'
import { LevelProgress as LevelProgressComponent } from '@/components/profile/LevelProgress'

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

      {/* Level Progress with Gradient */}
      <LevelProgressComponent
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
      <EmojiInventory userLevel={userStore.level} />

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
