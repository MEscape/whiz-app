import React, { useEffect, useRef } from 'react'
import { View } from 'react-native'

import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

import { Icon } from 'blueprints/Icon'
import { Text } from 'blueprints/Text'

interface AnswerBarProps {
  answer: string
  percentage: number
  totalUsers: number
  mySelection: string
  success?: boolean
  showSolution: boolean
}

const SuccessIndicator = ({ className, isMyAnswer, showSolution, success }) => {
  return (
    <>
      {showSolution && (success || isMyAnswer) && (
        <View className={`bg-white rounded-full p-0.5 ${className}`}>
          <Icon
            name={success ? (isMyAnswer ? 'checkcircle' : 'checkcircleo') : 'closecircle'}
            library="AntDesign"
            color={success ? 'text-green' : 'text-red'}
          />
        </View>
      )}
    </>
  )
}

const AnswerBar: React.FC<AnswerBarProps> = ({
  answer,
  mySelection,
  percentage,
  showSolution,
  success,
}) => {
  const previousPercentages = useRef<{ [key: string]: number }>({})
  const animatedPercentage = useSharedValue(previousPercentages.current[answer] || 0)

  useEffect(() => {
    previousPercentages.current[answer] = percentage
    animatedPercentage.value = withTiming(percentage, { duration: 300 })
  }, [percentage])

  const rStyle = useAnimatedStyle(() => ({
    width: `${animatedPercentage.value}%`,
  }))

  console.log(answer, success)

  return (
    <View className="h-40 flex-col items-start justify-end rounded-lg">
      <Text variant="h2" className="mb-2">
        {answer}
      </Text>
      {percentage === 0 ? (
        <View className="flex-row justify-start items-center">
          <View className="bg-secondary h-16 rounded-full w-4 shadow-lg" />
          <Text variant="body" className="ml-4" text="0%" />
          <SuccessIndicator
            className="ml-4"
            isMyAnswer={mySelection === answer}
            success={success}
            showSolution={showSolution}
          />
        </View>
      ) : (
        <Animated.View
          className={`${mySelection === answer ? 'bg-accent' : 'bg-secondary'} h-16 rounded-full shadow-lg flex-row justify-start items-center`}
          style={rStyle}>
          {mySelection === answer && (
            <Text
              fontWeight="bold"
              textColor="text-black"
              className={`ml-4 ${percentage < 30 && 'absolute left-full text-text'}`}
              tx="common.me"
            />
          )}

          <Text
            variant="body"
            className={`ml-auto mr-4 ${percentage < 30 && percentage > 0 && 'absolute left-full text-text ml-11'}`}
            textColor={mySelection === answer ? 'text-black' : 'text-text'}>
            {Math.round(percentage)}%
          </Text>

          <SuccessIndicator
            className={`mr-4 ${percentage < 30 && 'absolute left-full ml-24'}`}
            isMyAnswer={mySelection === answer}
            success={success}
            showSolution={showSolution}
          />
        </Animated.View>
      )}
    </View>
  )
}

export default AnswerBar
