import React, { useState } from 'react'
import { SafeAreaView } from 'react-native'

import { useAppContext } from '@/context'
import { useStage } from '@/hooks'
import { handleDisconnect } from '@/services'

import { Stinger } from '@/components/animations'
import { GameContent, GameFooter, GameHeader } from '@/components/game'
import { StageSkeleton } from '@/components/game/stages'

const GameScreen = () => {
  const { router } = useAppContext()
  const { currentStage, triggerStageUpdate } = useStage()

  const [isTransitioning, setIsTransitioning] = useState(true)

  const handleLeave = () => {
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
          <GameHeader resetProgress={currentStage} />
          {currentStage ? <GameContent stage={currentStage} /> : <StageSkeleton />}
          <GameFooter onLeave={handleLeave} onSkip={triggerStageUpdate} />
        </SafeAreaView>
      )}
    </>
  )
}

export default GameScreen
