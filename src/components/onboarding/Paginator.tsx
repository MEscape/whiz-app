import React from 'react'
import { Animated, useWindowDimensions, View } from 'react-native'

import { OnboardingItemProps } from './OnboardingItem'

export function Paginator({
  data,
  scrollX,
}: {
  data: OnboardingItemProps[]
  scrollX: Animated.Value
}) {
  const { width } = useWindowDimensions()

  return (
    <View className="flex flex-row w-full justify-center items-center my-4">
      {data.map((_, index) => {
        const inputRange = [(index - 1) * width, index * width, (index + 1) * width]

        const dotScale = scrollX.interpolate({
          extrapolate: 'clamp',
          inputRange,
          outputRange: [0.8, 1.5, 0.8],
        })

        const opacity = scrollX.interpolate({
          extrapolate: 'clamp',
          inputRange,
          outputRange: [0.3, 1, 0.3],
        })

        return (
          <Animated.View
            style={{ opacity, scaleX: dotScale }}
            key={index}
            className="h-4 rounded-full bg-text my-2 mx-1 w-4"
          />
        )
      })}
    </View>
  )
}
