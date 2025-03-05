import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'

import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import { Images, ImageUris } from 'assets/images'

export const Stinger = ({ onAnimationComplete }) => {
  const opacity = useSharedValue(1)
  const scale = useSharedValue(1)

  useEffect(() => {
    // Animate the image opacity, scale, and rotation
    opacity.value = withTiming(0, { duration: 700, easing: Easing.inOut(Easing.ease) })
    scale.value = withTiming(1.5, { duration: 700, easing: Easing.inOut(Easing.ease) })

    // Call the onAnimationComplete once the transition is done
    setTimeout(onAnimationComplete, 500)
  }, [])

  // Animated style for the image with rotation
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    }
  })

  return (
    <View className="absolute inset-0 justify-center items-center bg-black bg-opacity-60">
      <Animated.Image source={ImageUris[Images.LOGO_DARK]} style={[styles.image, animatedStyle]} />
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    elevation: 10,

    height: 250,

    // Increased size for more impact
    resizeMode: 'contain',

    shadowColor: '#000',

    shadowOffset: { height: 4, width: 0 },

    shadowOpacity: 0.3,

    shadowRadius: 6,
    // Increased size for more impact
    width: 250, // Shadow for Android
  },
})
