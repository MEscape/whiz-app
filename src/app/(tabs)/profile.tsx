import React from 'react'
import { SafeAreaView, ScrollView, View } from 'react-native'

import { observer } from 'mobx-react-lite'

import { useAppContext } from '@/context'
import { useHeader } from '@/hooks'

import { LevelUpAnimation } from '@/components/animations/LevelUpAnimation'
import {
  Inventory,
  LevelProgress,
  PartyStats,
  ProfileSkeleton,
  Rewards,
  UsernameEditor,
} from '@/components/profile'
import ProfileImage from '@/components/ProfileImage'

const ProfileScreen = observer(() => {
  const { router, userStore } = useAppContext()

  useHeader({
    leftTx: 'tabs.profile',
    onRightPress: () => router.push('/settings'),
    rightIcon: 'settings',
    rightIconLibrary: 'Ionicons',
  })

  if (!userStore.level || !userStore.stats || userStore.profileImage === undefined) {
    return <ProfileSkeleton />
  }

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View className="flex-row items-center p-4">
          <ProfileImage
            imageUrl={userStore.profileImage}
            onPress={imageUri => {
              userStore.setProfileImage(imageUri)
            }}
            showHint
            equippedEmojiId={userStore.equippedEmoji}
          />

          <UsernameEditor />
        </View>

        <LevelProgress />
        <PartyStats />
        <Rewards />
        <Inventory />

        {userStore.isLevelingUp && (
          <LevelUpAnimation
            level={userStore.level}
            onAnimationFinish={() => userStore.setIsLevelingUp(false)}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  )
})

export default ProfileScreen
