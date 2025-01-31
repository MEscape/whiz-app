import { useCallback, useEffect, useState } from 'react'

import { Asset } from 'expo-asset'
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

  const requestPermissions = async () => {
    const { status } = await Audio.requestPermissionsAsync()
    if (status !== 'granted') {
      setError('Permission to access audio was denied')
      return false
    }
    return true
  }

  // Function to load the audio
  const loadAudio = useCallback(async (source: string, options: AudioPlayerOptions = {}) => {
    if (!(await requestPermissions())) return

    try {
      setIsLoading(true)
      setError(null)

      const { isLooping = false, rate = 1.0, shouldPlay = false, volume = 1.0 } = options

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        playThroughEarpieceAndroid: false,
        shouldDuckAndroid: true,
        staysActiveInBackground: false,
      })

      // Load sound
      const { sound } = await Audio.Sound.createAsync(
        { uri: Asset.fromModule(source).localUri },
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
      console.log(sound)
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
