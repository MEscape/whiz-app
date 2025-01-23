import React, { useState } from 'react'
import { View } from 'react-native'

import { Image as ExpoImage, ImageContentFit } from 'expo-image'

import { PulsatingLoader } from '@/components'
import { useAppContext } from '@/context'

import Placeholder from 'blueprints/Placeholder'

interface ImageSrc {
  dark: any
  light: any
}

interface ImageProps {
  src: ImageSrc | any
  altText?: string
  contentFit?: ImageContentFit
  className?: string
  loadingIndicatorColor?: string
  classNameContainer?: string
  cachePolicy?: 'none' | 'disk' | 'memory' | 'memory-disk' | /** @hidden */ null
}

const ImageComponent: React.FC<ImageProps> = ({
  cachePolicy = 'disk',
  className,
  classNameContainer,
  contentFit = 'cover' as ImageContentFit,
  loadingIndicatorColor = 'accent',
  src,
}) => {
  const { isDarkMode } = useAppContext()

  const imageSource = 'dark' in src && 'light' in src ? (isDarkMode ? src.dark : src.light) : src
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

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
    <View className={classNameContainer}>
      {isLoading && !hasError && (
        <PulsatingLoader className="rounded-md" pulseColor={loadingIndicatorColor} />
      )}
      {hasError && <Placeholder />}
      {!hasError && (
        <ExpoImage
          source={imageSource}
          contentFit={contentFit}
          className={`h-full w-full ${className}`}
          cachePolicy={cachePolicy}
          onLoadStart={handleLoadStart}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </View>
  )
}

const MemorizedImage = React.memo(ImageComponent)
MemorizedImage.displayName = 'Image'

export { MemorizedImage as Image }
