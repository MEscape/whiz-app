import React from 'react'
import { View } from 'react-native'

import { Icon, Image, Text } from 'blueprints'
import { LinearGradient } from 'expo-linear-gradient'

import { translate } from '@/i18n'
import { truncateMiddle } from '@/util'

// Example usage:
// <Rank
//   currentRank={5}
//   previousRank={7}
//   top3={[
//     { rank: 1, username: 'Alice', points: 1500, profileImage: 'https://example.com/alice.png' },
//     { rank: 2, username: 'Bob', points: 1400, profileImage: 'https://example.com/bob.png' },
//     { rank: 3, username: 'Charlie', points: 1350, profileImage: 'https://example.com/charlie.png' },
//   ]}
// />

interface RankProps {
  currentRank: number
  previousRank: number
  profileImage: any
  top3: {
    rank: number
    username: string
    points: number
    profileImage: string
  }[]
}

export const Rank = ({ currentRank, previousRank, profileImage, top3 = [] }: RankProps) => {
  const rankDiff = previousRank ? previousRank - currentRank : 0
  const rankChangeIcon = rankDiff > 0 ? 'arrowup' : rankDiff < 0 ? 'arrowdown' : 'minus'
  const rankChangeColor = rankDiff > 0 ? 'text-green' : rankDiff < 0 ? 'text-red' : 'text-gray'

  return (
    <View className="px-2">
      {/* Current User Rank */}
      <View className="flex-row items-center justify-end">
        <Text variant="h2">
          {translate('game.yourRank')} #{currentRank}
        </Text>
        {rankChangeIcon && (
          <Icon
            name={rankChangeIcon}
            size={20}
            color={rankChangeColor}
            className="ml-2"
            library="AntDesign"
          />
        )}
        {rankDiff !== 0 && (
          <Text variant="caption" textColor={rankChangeColor}>
            {rankDiff > 0 ? `+${rankDiff}` : `${rankDiff}`}
          </Text>
        )}
      </View>

      {/* Top 3 Rankings */}
      <View className="flex-row justify-around">
        {top3.map(user => {
          let gradientColors = ['transparent', 'rgba(0,0,0,0.8)'] // default fallback
          if (user.rank === 1) {
            gradientColors = ['transparent', 'rgba(199,168,51,0.8)'] // yellow for 1st
          } else if (user.rank === 2) {
            gradientColors = ['transparent', 'rgba(156, 163, 175, 0.8)'] // gray for 2nd
          } else if (user.rank === 3) {
            gradientColors = ['transparent', 'rgba(251, 146, 60, 0.8)'] // orange for 3rd
          }

          return (
            <View key={user.rank} className="items-center rounded-lg pt-1">
              <View className="w-10 h-10 relative rounded-full overflow-hidden flex justify-center items-center">
                {profileImage || user.profileImage ? (
                  <Image
                    src={currentRank === user.rank ? profileImage : user.profileImage}
                    classNameContainer="w-full h-full"
                  />
                ) : (
                  <Icon library="Ionicons" name="person" size={30} color="text-white" />
                )}
                <LinearGradient
                  colors={gradientColors as unknown as readonly [string, string, ...string[]]}
                  className="absolute inset-0"
                />
                <Text
                  variant="small"
                  fontWeight="bold"
                  className="absolute"
                  textColor="text-black"
                  textAlign="center">
                  {currentRank === user.rank
                    ? translate('common.me')
                    : truncateMiddle(user.username)}
                </Text>
              </View>
            </View>
          )
        })}
      </View>
    </View>
  )
}
