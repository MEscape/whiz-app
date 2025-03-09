import React, { useMemo, useState } from 'react'
import { View } from 'react-native'

import { Button } from 'blueprints'

import { Editor } from '@/components/Editor'

const shuffleArray = array => {
  return array.sort(() => Math.random() - 0.5)
}

interface SelectorProps {
  answers: Array<string>
  disabled?: boolean
  onSubmit?: (success: boolean, selection: string) => void
  solution?: number
  editable?: boolean
  showSolution?: boolean
}

export const Selector = ({
  answers,
  disabled,
  editable,
  onSubmit,
  showSolution,
  solution,
}: SelectorProps) => {
  // Initialize shuffled state with memoized values
  const initialShuffledState = useMemo(() => {
    const shuffled = shuffleArray([...answers])
    const solutionIndex =
      solution !== undefined ? shuffled.findIndex(answer => answer === answers[solution]) : -1
    return {
      answers: shuffled,
      solutionIndex,
    }
  }, [])

  const [possibilities, setPossibilities] = useState([...answers])
  const [shuffledState] = useState(initialShuffledState)

  const handlePress = (selectedIndex: number) => {
    onSubmit?.(selectedIndex === shuffledState.solutionIndex, shuffledState.answers[selectedIndex])
  }

  const handleChangeAnswer = (index: number, name: string) => {
    setPossibilities(prev => {
      const updated = [...prev]
      updated[index] = name
      return updated
    })
  }

  return (
    <View className="flex flex-1 gap-2 p-2">
      <View className="flex-row flex-1 gap-2">
        {editable ? (
          <>
            <Editor
              className="ml-4"
              placeholderTx="placeholder.answer"
              maxLength={15}
              name={possibilities[0]}
              onSave={name => handleChangeAnswer(0, name)}
            />
            <Editor
              className="ml-4"
              placeholderTx="placeholder.answer"
              maxLength={15}
              name={possibilities[1]}
              onSave={name => handleChangeAnswer(1, name)}
            />
          </>
        ) : (
          <>
            <Button
              text={shuffledState.answers[0]}
              outerClassName="flex-1"
              variant={showSolution && shuffledState.solutionIndex === 0 ? 'tertiary' : 'primary'}
              className="flex-1"
              disabled={disabled}
              onPress={() => handlePress(0)}
            />
            <Button
              text={shuffledState.answers[1]}
              outerClassName="flex-1"
              variant={showSolution && shuffledState.solutionIndex === 1 ? 'tertiary' : 'primary'}
              className="flex-1"
              disabled={disabled}
              onPress={() => handlePress(1)}
            />
          </>
        )}
      </View>
      <View className="flex-row flex-1 gap-2">
        {editable ? (
          <>
            <Editor
              className="ml-4"
              placeholderTx="placeholder.answer"
              maxLength={15}
              name={possibilities[2]}
              onSave={name => handleChangeAnswer(2, name)}
            />
            <Editor
              className="ml-4"
              placeholderTx="placeholder.answer"
              maxLength={15}
              name={possibilities[3]}
              onSave={name => handleChangeAnswer(3, name)}
            />
          </>
        ) : (
          <>
            <Button
              text={shuffledState.answers[2]}
              outerClassName="flex-1"
              className="flex-1"
              variant={showSolution && shuffledState.solutionIndex === 2 ? 'tertiary' : 'primary'}
              disabled={disabled}
              onPress={() => handlePress(2)}
            />
            <Button
              text={shuffledState.answers[3]}
              outerClassName="flex-1"
              className="flex-1"
              variant={showSolution && shuffledState.solutionIndex === 3 ? 'tertiary' : 'primary'}
              disabled={disabled}
              onPress={() => handlePress(3)}
            />
          </>
        )}
      </View>
    </View>
  )
}
