import React, { useState } from 'react'
import { Pressable, ScrollView, View } from 'react-native'

import { BottomSheet, Icon, Text } from 'blueprints'

import { CircleProgressBar } from '@/components'
import { useAppContext } from '@/context'
import { translate } from '@/i18n'

import ProfileImage from '@/components/ProfileImage'

const WinRateCard = ({ descriptionTx, icon, percentage, titleTx }) => (
  <View className="bg-secondary shadow-lg flex-row justify-between rounded-lg p-2 gap-x-2">
    <CircleProgressBar
      radius={50}
      strokeWidth={10}
      backgroundColor="#62a399"
      percentageComplete={percentage}
    />
    <View className="flex-col w-32">
      <View className="flex-row gap-x-1 items-center">
        <Icon name={icon} library="Ionicons" />
        <Text variant="h3" tx={titleTx} />
      </View>
      <Text variant="small" textColor="text-gray" tx={descriptionTx} />
    </View>
  </View>
)

const GameStatsCard = ({ losses, wins }) => (
  <View className="bg-secondary flex-1 shadow-lg rounded-lg flex-col justify-center gap-y-2 items-start p-2">
    <View className="flex-row gap-x-1">
      <Icon name="arrowup" library="AntDesign" color="text-green" />
      <Text textColor="text-green">
        {wins} {translate('profile.stats.wins')}
      </Text>
    </View>
    <View className="flex-row gap-x-1">
      <Icon name="arrowdown" library="AntDesign" color="text-red" />
      <Text textColor="text-red">
        {losses} {translate('profile.stats.loses')}
      </Text>
    </View>
  </View>
)

export const SessionStats = () => {
  const { gameStore, userStore } = useAppContext()

  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false)

  return (
    <>
      <Pressable
        style={{
          bottom: 16,
          left: 8,
          position: 'absolute',
          right: 8,
        }}
        className=" bg-secondary opacity-75 rounded-lg flex-row justify-between items-center p-2"
        onPress={() => setIsBottomSheetVisible(true)}>
        <View className="flex-row items-center gap-x-2 py-1">
          <ProfileImage
            imageUrl={userStore.profileImage}
            disabled
            size="small"
            equippedEmojiId={userStore.equippedEmoji}
          />
          <View className="flex-col">
            <Text variant="h2">{userStore.username}</Text>
            <Text variant="caption" textColor="text-gray">
              {gameStore.myUser.rank}# • {gameStore.myUser.points} {translate('common.points')}
            </Text>
          </View>
        </View>
        <Text variant="body" tx="game.achievements" />
      </Pressable>

      <BottomSheet
        snapPoints={['100%']}
        isVisible={isBottomSheetVisible}
        onClose={() => setIsBottomSheetVisible(false)}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="p-4 pt-10"
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'flex-start',
          }}>
          <Text
            variant="h1"
            className="text-4xl mb-6"
            tx="game.achievements"
            uppercase
            textAlign="center"
          />
          <View className="flex-row flex-wrap gap-2 w-2/3 bg-white">
            <WinRateCard
              percentage={gameStore.stats.winRate}
              icon="home"
              titleTx="profile.stats.winRate"
              descriptionTx="explain.winRate"
            />
            <GameStatsCard wins={gameStore.stats.gamesWon} losses={gameStore.stats.gamesLost} />
            <WinRateCard
              percentage={gameStore.stats.winRateOverall}
              icon="earth"
              titleTx="profile.stats.winRate"
              descriptionTx="explain.winRateOverall"
            />
            <GameStatsCard
              wins={gameStore.stats.gamesWonOverall}
              losses={gameStore.stats.gamesLostOverall}
            />
          </View>
        </ScrollView>
      </BottomSheet>
    </>
  )
}
