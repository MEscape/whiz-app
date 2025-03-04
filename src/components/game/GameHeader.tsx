import React, { memo, useEffect, useRef, useState } from 'react'
import { Animated, View } from 'react-native'

import { Text } from 'blueprints'

import { useAppContext } from '@/context'
import { translate } from '@/i18n'

import { Rank } from '@/components/game/Rank'
import ProfileImage from '@/components/ProfileImage'

const UserDisplay = memo(() => {
  const { gameStore, userStore } = useAppContext()

  return (
    <View className="flex-row justify-between">
      <View className="flex-row px-2 gap-x-2">
        <ProfileImage
          disabled={true}
          equippedEmojiId={userStore.equippedEmoji}
          imageUrl={userStore.profileImage}
        />
        <View className="flex-col">
          <Text variant="h2" text={userStore.username} />
          <Text
            variant="h3"
            text={`${gameStore.myUser?.points || 0} ${translate('common.points')}`}
            textColor="text-accent"
            className="text-sm/4"
          />
        </View>
      </View>
      <Rank
        currentRank={gameStore.myUser.rank}
        previousRank={gameStore.myUser.prevRank}
        top3={gameStore.topThreeUsers}
        profileImage={userStore.profileImage}
      />
    </View>
  )
})

UserDisplay.displayName = 'UserDisplay'

interface TimerBarProps {
  timer: number
  widthInterpolation: Animated.AnimatedInterpolation<string | number>
}

const TimerBar = memo(({ timer, widthInterpolation }: TimerBarProps) => {
  return (
    <View className="flex-1 justify-end">
      <Text variant="caption" textAlign="right" className="pr-2 pb-1">
        {`${timer}s ${translate('common.left')}`}
      </Text>
      <Animated.View className="h-2 bg-accent rounded" style={{ width: widthInterpolation }} />
    </View>
  )
})

TimerBar.displayName = 'TimerBar'

export const GameHeader = ({
  resetProgress,
  timerDuration = 60,
}: {
  timerDuration?: number
  resetProgress?: any
}) => {
  const [timer, setTimer] = useState(timerDuration)
  const [containerWidth, setContainerWidth] = useState(0)
  const progressAnim = useRef(new Animated.Value(1)).current

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer > 0) {
          const newTimer = prevTimer - 1
          const newProgress = newTimer / timerDuration

          Animated.timing(progressAnim, {
            duration: 1000,
            toValue: newProgress,
            useNativeDriver: false,
          }).start()

          return newTimer
        } else {
          clearInterval(interval)
          return 0
        }
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [timerDuration, progressAnim])

  // Interpolate progress value to container width once we know it
  const widthInterpolation = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, containerWidth],
  })

  // Reset progress bar and timer when resetProgress is called
  useEffect(() => {
    if (resetProgress) {
      setTimer(timerDuration) // Reset timer to the initial value
      Animated.timing(progressAnim, {
        // Reset animation to full width
        duration: 0,
        toValue: 1, // Instant reset
        useNativeDriver: false,
      }).start()
    }
  }, [resetProgress, timerDuration, progressAnim])

  return (
    <View className="flex-col h-40 bg-secondary pt-10">
      <UserDisplay />
      <View
        className="flex-1 justify-end"
        onLayout={e => {
          const { width } = e.nativeEvent.layout
          setContainerWidth(width)
        }}>
        <TimerBar timer={timer} widthInterpolation={widthInterpolation} />
      </View>
    </View>
  )
}
