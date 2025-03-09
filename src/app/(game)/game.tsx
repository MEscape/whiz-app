import React, { useState } from 'react'
import { SafeAreaView } from 'react-native'

import { useAppContext } from '@/context'
import { useStage } from '@/hooks'
import { handleDisconnect } from '@/services'

import { Stinger } from '@/components/animations'
import { GameContent, GameFooter, GameHeader } from '@/components/game'
import { StageSkeleton } from '@/components/game/stages'

const GameScreen = () => {
  const { gameStore, router } = useAppContext()
  const { currentStage, enemy, triggerStageUpdate } = useStage()

  const [isTransitioning, setIsTransitioning] = useState(true)

  const handleLeave = () => {
    gameStore.sessionStats.stopTimer()
    handleDisconnect()
    router.dismissAll()
    router.dismissAll()
  }

  return (
    <>
      {isTransitioning ? (
        <Stinger onAnimationComplete={() => setIsTransitioning(false)} />
      ) : (
        <SafeAreaView className="flex-1 bg-primary">
          <GameHeader resetProgress={currentStage} disabledTimer={currentStage?.type === 4} />
          {currentStage ? <GameContent stage={currentStage} enemy={enemy} /> : <StageSkeleton />}
          <GameFooter onLeave={handleLeave} onSkip={triggerStageUpdate} />
        </SafeAreaView>
      )}
    </>
  )
}

export default GameScreen
