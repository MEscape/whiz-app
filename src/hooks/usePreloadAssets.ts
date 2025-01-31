import React, { useEffect } from 'react'

import { Asset } from 'expo-asset'

import { AnimationUris } from 'assets/animations'
import { AudioUris } from 'assets/audios'
import { ImageUris } from 'assets/images'
import { VideoUris } from 'assets/videos'

export const usePreloadAssets = () => {
  const [isLoadingAssets, setIsLoadingAssets] = React.useState(true)

  const cacheAssets = async () => {
    const images = Object.values(ImageUris)
    const videos = Object.values(VideoUris)
    const audios = Object.values(AudioUris)
    const assets = [...images, ...videos, ...audios]

    const cached = assets.map(asset => {
      return Asset.fromModule(asset).downloadAsync()
    })

    return Promise.all(cached)
  }

  useEffect(() => {
    const loadAssets = async () => {
      await cacheAssets()
      setIsLoadingAssets(false)
    }

    loadAssets()
  }, [])

  return isLoadingAssets
}
