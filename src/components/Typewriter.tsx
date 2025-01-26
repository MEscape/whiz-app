import React, { useEffect, useRef, useState } from 'react'
import { View } from 'react-native'

import { Text } from '@/blueprints'

interface TypewriterProps {
  sentences: string[]
  typingSpeed?: number
  pauseDuration?: number
}

const textProps = {
  textColor: 'white',
  variant: 'h1',
}

export const Typewriter: React.FC<TypewriterProps> = ({
  pauseDuration = 2000,
  sentences,
  typingSpeed = 100,
}) => {
  const [currentSentence, setCurrentSentence] = useState('')
  const [cursorVisible, setCursorVisible] = useState(true)

  const sentenceIndexRef = useRef(0)
  const charIndexRef = useRef(0)
  const typingIntervalRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const pauseTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const cursorIntervalRef = useRef<NodeJS.Timeout | undefined>(undefined)

  const startTyping = () => {
    const sentence = sentences[sentenceIndexRef.current]
    typingIntervalRef.current = setInterval(() => {
      if (charIndexRef.current < sentence.length) {
        // Add one character at a time
        charIndexRef.current += 1
        setCurrentSentence(sentence.slice(0, charIndexRef.current))
      } else {
        // Complete typing, move to pause
        clearInterval(typingIntervalRef.current as NodeJS.Timeout)
        typingIntervalRef.current = undefined
        startPause()
      }
    }, typingSpeed)
  }

  const startPause = () => {
    pauseTimeoutRef.current = setTimeout(() => {
      // Move to the next sentence
      sentenceIndexRef.current = (sentenceIndexRef.current + 1) % sentences.length
      charIndexRef.current = 0 // Reset character index
      setCurrentSentence('') // Reset current sentence
      startTyping() // Start typing the next sentence
    }, pauseDuration)
  }

  // Cursor blinking
  useEffect(() => {
    cursorIntervalRef.current = setInterval(() => {
      setCursorVisible(visible => !visible)
    }, 500) // Blinks every 500ms

    return () => {
      if (cursorIntervalRef.current) {
        clearInterval(cursorIntervalRef.current)
      }
    }
  }, [])

  useEffect(() => {
    startTyping()

    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current)
      }
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current)
      }
    }
  }, [sentences, typingSpeed, pauseDuration])

  return (
    <View className="flex flex-row items-center my-16">
      <Text {...textProps} uppercase>
        {currentSentence}
        {cursorVisible && <Text {...textProps}>|</Text>}
      </Text>
    </View>
  )
}
