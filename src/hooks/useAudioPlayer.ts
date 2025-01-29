import { useCallback, useEffect, useState } from 'react'

import { Audio } from 'expo-av'

interface AudioPlayerOptions {
  shouldPlay?: boolean
  rate?: number
  volume?: number
  isLooping?: boolean
}

export const useAudioPlayer = () => {
  const [sound, setSound] = useState<Audio.Sound | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Function to load the audio
  const loadAudio = useCallback(async (source: string, options: AudioPlayerOptions = {}) => {
    try {
      setIsLoading(true)
      setError(null)

      const { isLooping = false, rate = 1.0, shouldPlay = false, volume = 1.0 } = options

      // Load sound
      const { sound } = await Audio.Sound.createAsync(
        { uri: source }, // You can also pass an asset path here
        { isLooping, rate, shouldPlay, volume },
      )

      // Set the sound and update the loading state
      setSound(sound)
      setIsLoading(false)
      setIsPlaying(shouldPlay)
    } catch (e) {
      setError('Failed to load the audio')
      setIsLoading(false)
    }
  }, [])

  // Function to play the loaded audio
  const playAudio = useCallback(async () => {
    try {
      if (sound) {
        await sound.playAsync()
        setIsPlaying(true)
      }
    } catch (e) {
      setError('Failed to play the audio')
    }
  }, [sound])

  // Function to pause the audio
  const pauseAudio = useCallback(async () => {
    try {
      if (sound) {
        await sound.pauseAsync()
        setIsPlaying(false)
      }
    } catch (e) {
      setError('Failed to pause the audio')
    }
  }, [sound])

  // Function to stop the audio
  const stopAudio = useCallback(async () => {
    try {
      if (sound) {
        await sound.stopAsync()
        setIsPlaying(false)
      }
    } catch (e) {
      setError('Failed to stop the audio')
    }
  }, [sound])

  // Clean up the sound on unmount
  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync() // Unload the sound when the component unmounts
      }
    }
  }, [sound])

  return {
    error,
    isLoading,
    isPlaying,
    loadAudio,
    pauseAudio,
    playAudio,
    stopAudio,
  }
}
