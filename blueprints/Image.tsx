import React, { useCallback, useMemo, useState } from 'react'
import { View } from 'react-native'

import { Asset } from 'expo-asset'
import { Image as ExpoImage, ImageProps as ExpoImageProps, ImageContentFit } from 'expo-image'
import { cssInterop } from 'nativewind'

import { useAppContext } from '@/context'

import { Images, ImageUris } from 'assets/images'

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
  loadingEnabled?: boolean
  cachePolicy?: 'none' | 'disk' | 'memory' | 'memory-disk' | /** @hidden */ null
}

const ImageComponent: React.FC<ImageProps> = ({
  cachePolicy = 'memory-disk',
  className,
  classNameContainer,
  contentFit = 'cover' as ImageContentFit,
  loadingEnabled,
  loadingIndicatorColor = 'accent',
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

  const handleLoadStart = useCallback(() => {
    setIsLoading(true)
    setHasError(false)
  }, [])

  const handleLoad = useCallback(() => {
    setIsLoading(false)
  }, [])

  const handleError = useCallback(() => {
    setIsLoading(false)
    setHasError(true)
  }, [])

  cssInterop(ExpoImage, { className: 'style' })

  const ImageContent = useMemo(
    () => (
      <ExpoImage
        source={(imageSource && Asset.fromModule(imageSource).localUri) || imageSource}
        contentFit={contentFit}
        className={`w-full h-full ${className}`}
        cachePolicy={cachePolicy}
        onLoadStart={handleLoadStart}
        onLoad={handleLoad}
        placeholder={ImageUris[Images.PLACEHOLDER]}
        placeholderContentFit="cover"
        contentPosition="center"
        onError={handleError}
        {...props}
      />
    ),
    [imageSource, contentFit, cachePolicy, handleLoadStart, handleLoad, handleError],
  )

  return (
    <View className={classNameContainer}>
      {isLoading && loadingEnabled && !hasError && (
        <PulsatingLoader className="rounded-md" pulseColor={loadingIndicatorColor} />
      )}
      {ImageContent}
    </View>
  )
}

const MemorizedImage = React.memo(ImageComponent)
MemorizedImage.displayName = 'Image'

export { MemorizedImage as Image }
