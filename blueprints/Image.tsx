import React, { useState } from 'react'
import { View } from 'react-native'

import { Image as ExpoImage, ImageProps as ExpoImageProps, ImageContentFit } from 'expo-image'
import { cssInterop } from 'nativewind'

import { useAppContext } from '@/context'

import Placeholder from './Placeholder'
import { PulsatingLoader } from './PulsatingLoader'

export interface ImageSrc {
  dark: any
  light: any
}

interface ImageProps extends ExpoImageProps {
  src: ImageSrc | any
  altText?: string
  contentFit?: ImageContentFit
  className?: string
  loadingIndicatorColor?: string
  classNameContainer?: string
  placeholderEnabled?: boolean
  cachePolicy?: 'none' | 'disk' | 'memory' | 'memory-disk' | /** @hidden */ null
}

const ImageComponent: React.FC<ImageProps> = ({
  cachePolicy = 'memory-disk',
  className,
  classNameContainer,
  contentFit = 'cover' as ImageContentFit,
  loadingIndicatorColor = 'accent',
  placeholderEnabled,
  src,
  ...props
}) => {
  const { isDarkMode } = useAppContext()

  const imageSource =
    src && typeof src === 'object' && 'dark' in src && 'light' in src
      ? isDarkMode
        ? src.dark
        : src.light
      : src
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

  cssInterop(ExpoImage, { className: 'style' })

  return (
    <View className={classNameContainer}>
      {isLoading && !hasError && (
        <PulsatingLoader className="rounded-md" pulseColor={loadingIndicatorColor} />
      )}
      {hasError && placeholderEnabled && <Placeholder />}
      {!hasError && (
        <ExpoImage
          source={imageSource}
          contentFit={contentFit}
          className={`w-full h-full ${className}`}
          cachePolicy={cachePolicy}
          onLoadStart={handleLoadStart}
          onLoad={handleLoad}
          onError={handleError}
          {...props}
        />
      )}
    </View>
  )
}

const MemorizedImage = React.memo(ImageComponent)
MemorizedImage.displayName = 'Image'

export { MemorizedImage as Image }
