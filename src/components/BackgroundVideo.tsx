import React, { useEffect, useRef, useState } from 'react'
import { Text, View } from 'react-native'

import { useIsFocused } from '@react-navigation/native'
import { Video } from 'expo-av'

import { PulsatingLoader } from '@/components/PulsatingLoader'

interface BackgroundVideoProps {
  videoSource: any // Local video (require) or URI
  className?: string // NativeWind styling
  loadingIndicatorColor?: string
  errorText?: string
}

export const BackgroundVideo: React.FC<BackgroundVideoProps> = ({
  className = '',
  errorText = 'Video failed to load. Please try again.',
  loadingIndicatorColor = 'accent',
  videoSource,
}) => {
  const videoRef = useRef<Video | null>(null)
  const isFocused = useIsFocused()

  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    if (videoRef.current instanceof Video) {
      if (isFocused) {
        videoRef.current.playAsync().catch(() => setHasError(true)) // Resume video
      } else {
        videoRef.current.pauseAsync().catch(() => setHasError(true)) // Pause video
      }
    }
  }, [isFocused])

  const handleLoadStart = () => {
    setIsLoading(true)
    setHasError(false)
  }

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  return (
    <View className={`absolute inset-0 ${className}`}>
      {isLoading && !hasError && <PulsatingLoader pulseColor={loadingIndicatorColor} />}
      {hasError && (
        <View className="absolute inset-0 flex items-center justify-center z-10 bg-black/50">
          <Text className="text-red-500 text-lg">{errorText}</Text>
        </View>
      )}
      {!hasError && (
        <Video
          ref={videoRef}
          source={videoSource}
          resizeMode="cover"
          shouldPlay={false}
          isLooping
          isMuted
          onLoadStart={handleLoadStart}
          onLoad={handleLoad}
          onError={handleError}
          style={{ flex: 1 }}
          videoStyle={{ height: '100%' }}
        />
      )}
    </View>
  )
}
