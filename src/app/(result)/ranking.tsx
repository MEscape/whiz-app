import React from 'react'
import { SafeAreaView } from 'react-native'

import { useHeader } from '@/hooks'

import { Podest, RemainingParticipants, SessionStats } from '@/components/ranking'

const RankingScreen = () => {
  useHeader(
    {
      titleTx: 'tabs.ranking',
    },
    [],
  )

  return (
    <SafeAreaView className="flex-1 bg-primary relative">
      <Podest />
      <RemainingParticipants />

      <SessionStats />
    </SafeAreaView>
  )
}

export default RankingScreen
