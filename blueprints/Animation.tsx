import React, { useEffect, useRef } from 'react'
import { Animated, Pressable, View } from 'react-native'

import LottieView, { LottieViewProps } from 'lottie-react-native'
import { cssInterop } from 'nativewind'

interface CreateAnimationProps extends LottieViewProps {
  onAnimationFinish?: () => void
  autoPlay?: boolean
  className?: string
  loop?: boolean
  source: any
  children?: React.ReactNode
}

export const Animation = ({
  autoPlay = false,
  children,
  className = '',
  loop = false,
  onAnimationFinish,
  source,
  ...props
}: CreateAnimationProps) => {
  const animationRef = useRef<LottieView>(null)
  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(fadeAnim, {
      duration: 300,
      toValue: 0.7,
      useNativeDriver: true,
    }).start()

    const timer = setTimeout(() => {
      animationRef.current?.play()
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const handleManualAnimationFinish = () => {
    Animated.timing(fadeAnim, {
      duration: 300,
      toValue: 0,
      useNativeDriver: true,
    }).start()

    onAnimationFinish?.()
  }

  cssInterop(LottieView, { className: 'style' })

  return (
    <>
      <Animated.View
        className="absolute inset-0 items-center justify-center bg-black"
        style={{ opacity: fadeAnim }}>
        <Pressable className="absolute inset-0" onPress={handleManualAnimationFinish} />
      </Animated.View>
      <View className="absolute inset-0 flex items-center justify-center">
        <LottieView
          ref={animationRef}
          source={source}
          autoPlay={autoPlay}
          loop={loop}
          speed={1}
          className={`${props.resizeMode ? 'absolute inset-0 ' : ''}${className}`}
          onAnimationFinish={handleManualAnimationFinish}
          {...props}
        />
        {children}
      </View>
    </>
  )
}
