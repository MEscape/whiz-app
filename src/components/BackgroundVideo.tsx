import React, { useEffect, useRef, useState } from 'react'
import { View } from 'react-native'

import { useIsFocused } from '@react-navigation/native'
import { ResizeMode, Video } from 'expo-av'

import { PulsatingLoader } from '@/blueprints'

interface BackgroundVideoProps {
  videoSource: any
  className?: string // NativeWind styling
  loadingIndicatorColor?: string
}

export const BackgroundVideo: React.FC<BackgroundVideoProps> = ({
  className = '',
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
      {hasError && <View className="absolute inset-0 bg-fixedBlack" />}
      {!hasError && (
        <Video
          ref={videoRef}
          source={videoSource}
          resizeMode={'cover' as ResizeMode}
          shouldPlay={false}
          isLooping
          isMuted
          onLoadStart={handleLoadStart}
          onLoad={handleLoad}
          onError={handleError}
          style={{ flex: 1 }}
          videoStyle={{ height: '100%', width: '100%' }}
        />
      )}
    </View>
  )
}
