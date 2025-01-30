import React, { memo } from 'react'
import { View } from 'react-native'
import { Icon, Text } from 'blueprints'

interface StatItemProps {
  icon: string
  label: string
  value: string | number
  color?: string
}

const StatItem = memo(({ icon, label, value, color = 'text-accent' }: StatItemProps) => (
  <View className="items-center p-3 bg-secondary rounded-lg">
    <Icon name={icon} library="Ionicons" color={color} size={24} />
    <Text variant="h3" className="mt-1" textColor={color}>
      {value}
    </Text>
    <Text variant="caption" className="mt-1">
      {label}
    </Text>
  </View>
))

interface PartyStatsProps {
  stats: {
    totalPartiesHosted: number
    totalPartiesJoined: number
    winRate: number
    totalGamesPlayed: number
    formattedPlayTime: string
  }
}

export const PartyStats = memo(({ stats }: PartyStatsProps) => {
  return (
    <View className="px-4 py-2">
      <Text variant="h3" className="mb-4">
        Party Stats
      </Text>
      
      <View className="flex-row flex-wrap justify-between gap-2">
        <StatItem
          icon="trophy"
          label="Win Rate"
          value={`${stats.winRate}%`}
          color="text-accent"
        />
        <StatItem
          icon="game-controller"
          label="Games Played"
          value={stats.totalGamesPlayed}
        />
        <StatItem
          icon="time"
          label="Play Time"
          value={stats.formattedPlayTime}
        />
        <StatItem
          icon="people"
          label="Parties Hosted"
          value={stats.totalPartiesHosted}
        />
      </View>
    </View>
  )
}) 