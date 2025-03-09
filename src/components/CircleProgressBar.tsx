import React, { FC, useEffect } from 'react'
import { View } from 'react-native'

import Animated, {
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import Svg, { Circle } from 'react-native-svg'

import { Text } from 'blueprints/Text'

type CircularProgressProps = {
  strokeWidth: number
  radius: number
  backgroundColor: string
  percentageComplete: number
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

export const CircleProgressBar: FC<CircularProgressProps> = ({
  backgroundColor,
  percentageComplete,
  radius,
  strokeWidth,
}) => {
  const innerRadius = radius - strokeWidth / 2
  const circumference = 2 * Math.PI * innerRadius
  const invertedCompletion = (100 - percentageComplete) / 100

  const theta = useSharedValue(2 * Math.PI * 1.001)
  const animateTo = useDerivedValue(() => 2 * Math.PI * invertedCompletion)
  const textOpacity = useSharedValue(0)

  const FADE_DELAY = 500

  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: withTiming(theta.value * innerRadius, {
        duration: FADE_DELAY,
      }),
    }
  })

  useEffect(() => {
    if (!textOpacity.value) {
      theta.value = animateTo.value
      textOpacity.value = 1
    } else {
      theta.value = 2 * Math.PI * 1.001
      textOpacity.value = 0
    }
  }, [])

  return (
    <View className="relative flex items-center justify-center">
      <Svg
        className="absolute"
        width={radius * 2}
        height={radius * 2}
        viewBox={`0 0 ${radius * 2} ${radius * 2}`}>
        <AnimatedCircle
          animatedProps={animatedProps}
          cx={radius}
          cy={radius}
          fill="transparent"
          r={innerRadius}
          stroke={backgroundColor}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      </Svg>
      <Text variant="h2" textColor="text-gray" className="absolute">
        {percentageComplete}%
      </Text>
    </View>
  )
}
