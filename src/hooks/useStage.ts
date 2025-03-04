import { useCallback, useEffect, useRef, useState } from 'react'

import { useAppContext } from '@/context'
import { sendData } from '@/services'

import { Task } from '@/app/library'
import { useDataForItem } from '@/hooks/useDataForItem'
import { Codes } from '@/services/Codes'
import TcpEventManager from '@/services/TcpEventManager'

export const useStage = () => {
  const { gameStore } = useAppContext()
  const data = useDataForItem(gameStore.collection.id)

  const [currentStage, setCurrentStage] = useState<Task | null>(null)
  const [triggerStage, setTriggerStage] = useState(false)

  const timeout = useRef<NodeJS.Timeout>()
  const remainingIndices = useRef<number[]>([])

  const getRandomQuestion = useCallback(() => {
    if (data.length === 0) return
    if (remainingIndices.current.length === 0) {
      remainingIndices.current = [...data]
    }

    const randomIndex = Math.floor(Math.random() * remainingIndices.current.length)
    const newStage = remainingIndices.current[randomIndex]
    remainingIndices.current.splice(randomIndex, 1)

    sendData({ body: newStage, method: 'POST', path: '/stage' })
  }, [data])

  useEffect(() => {
    if (gameStore.isHost) getRandomQuestion()
  }, [gameStore.isHost, triggerStage])

  useEffect(() => {
    const handleNewStage = response => {
      if (response.code === Codes.STAGE) {
        console.log('Setting new Stage', response.data)
        clearTimeout(timeout.current)
        setCurrentStage(response.data)
      }
    }

    TcpEventManager.on('data', handleNewStage)

    return () => {
      TcpEventManager.off('data', handleNewStage)
    }
  }, [])

  const triggerStageUpdate = () => {
    timeout.current = setTimeout(() => setCurrentStage(null), 300)
    setTriggerStage(prev => !prev)
  }

  return { currentStage, triggerStageUpdate }
}
