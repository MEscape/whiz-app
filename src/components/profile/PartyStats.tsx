import React, { memo } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react-lite'
import { FlashList } from '@shopify/flash-list'
import { Icon, IconProps, Text, VectorIconLibraries } from 'blueprints'
import { translate, TxKeyPath } from '@/i18n'
import { useAppContext } from '@/context'

interface StatItemProps<T extends VectorIconLibraries> {
  icon: IconProps<T>['name']
  label: TxKeyPath
  value: string | number
  color?: string
}

const StatItem = memo(
  ({ color = 'text-accent', icon, label, value }: StatItemProps<VectorIconLibraries>) => (
    <View className="items-center p-3 bg-secondary rounded-lg min-w-32">
      <Icon name={icon} library="Ionicons" color={color} size={24} />
      <Text variant="h3" className="mt-1" textColor={color}>
        {value}
      </Text>
      <Text variant="caption" className="mt-1">
        {translate(label)}
      </Text>
    </View>
  ),
)

export const PartyStats = observer(() => {
  const { userStore } = useAppContext()
  const stats = userStore.stats

  const statItems: StatItemProps<VectorIconLibraries>[] = [
    {
      color: 'text-accent',
      icon: 'trophy',
      label: 'profile.stats.winRate',
      value: `${stats.winRate}%`,
    },
    { icon: 'game-controller', label: 'profile.stats.gamesPlayed', value: stats.totalGamesPlayed },
    { icon: 'time', label: 'profile.stats.playTime', value: stats.formattedPlayTime },
    { icon: 'people', label: 'profile.stats.partiesHosted', value: stats.totalPartiesHosted },
  ]

  return (
    <View className="px-4 py-6">
      <Text variant="h3" className="mb-2" tx="profile.stats.title" />

      <FlashList
        data={statItems}
        keyExtractor={item => item.label}
        renderItem={({ item }) => <StatItem {...item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        estimatedItemSize={100}
        ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
        bounces={false}
        overScrollMode="never"
      />
    </View>
  )
})
