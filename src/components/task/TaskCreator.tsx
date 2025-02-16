import React, { useEffect } from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'

import { BottomSheet, BottomSheetInput, Button, Dropdown, Icon } from 'blueprints'

import { useAppContext } from '@/context'

export const TaskCreator = ({ refId }) => {
  const { collectionStore } = useAppContext()

  const [isBottomSheetVisible, setIsBottomSheetVisible] = React.useState(false)
  const [activeInput, setActiveInput] = React.useState(null)
  const [type, setType] = React.useState('1')
  const [formData, setFormData] = React.useState({
    answers: ['', '', '', ''],
    name: '',
    solution: null,
  })

  useEffect(() => {
    if (isBottomSheetVisible) {
      setType('1')
      setActiveInput(null)
      setFormData({
        answers: ['', '', '', ''],
        name: '',
        solution: null,
      })
    }
  }, [isBottomSheetVisible])

  /**
   * Returns an onChangeText handler that updates either the task name or an answer.
   *
   * @param field - Either 'name' for the task name or 'answers' for the answers array.
   * @param index - (Optional) When field is 'answers', the index of the answer to update.
   */
  const handleSetFormData =
    (field: 'name' | 'answers' | 'solution', index?: number) => (text: string) => {
      setFormData(prev => {
        if (field === 'name') {
          return { ...prev, name: text }
        }
        if (field === 'solution') {
          return { ...prev, solution: text }
        }
        if (field === 'answers' && typeof index === 'number') {
          const updatedAnswers = [...prev.answers]
          updatedAnswers[index] = text
          return { ...prev, answers: updatedAnswers }
        }
        return prev
      })
    }

  const isValid =
    formData.name.trim().length > 4 &&
    (type === '1'
      ? formData.answers.every(answer => answer.trim().length > 0) && activeInput !== null
      : type === '2'
        ? (formData.solution || '').trim().length > 0
        : true)

  const handleAddTask = () => {
    if (type !== '1') {
      formData.answers = null
    } else {
      formData.solution = activeInput
    }

    collectionStore.addTask(refId, { ...formData, type: parseInt(type) })
    setIsBottomSheetVisible(false)
  }

  return (
    <>
      <TouchableOpacity
        className="absolute right-5 bottom-28 z-20 w-16 h-16 rounded-full bg-accent flex justify-center items-center"
        onPress={() => setIsBottomSheetVisible(true)}>
        <Icon name="add" library="Ionicons" size={26} />
      </TouchableOpacity>
      <BottomSheet
        snapPoints={['40%']}
        title="task.creator"
        isVisible={isBottomSheetVisible}
        onClose={() => setIsBottomSheetVisible(false)}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}>
          <View className="flex-row gap-x-1.5 h-20 m-2">
            <Dropdown
              className="mt-2 h-full"
              selectedOptionIndex={0}
              onSelect={options => setType(options.value)}
              width="w-20"
              options={[
                { label: <Icon name="albums" library="Ionicons" />, value: '1' },
                { label: <Icon name="analytics" library="Ionicons" />, value: '2' },
                { label: <Icon name="chatbubbles" library="Ionicons" />, value: '3' },
                { label: <Icon name="clipboard" library="Ionicons" />, value: '4' },
              ]}
            />
            <BottomSheetInput
              placeholderTx="placeholder.taskName"
              innerClassName="flex-1"
              onChangeText={handleSetFormData('name')}
              maxLength={20}
            />
          </View>
          {type === '1' && (
            <View className="flex-row gap-x-1.5 flex-1 m-2 justify-center items-center">
              <View className="flex-1">
                <BottomSheetInput
                  placeholderTx="placeholder.answer"
                  variant="underlined"
                  iconLeft={activeInput === 0 ? 'bookmark' : 'bookmark-outline'}
                  onChangeText={handleSetFormData('answers', 0)}
                  iconLeftPress={() => setActiveInput(0)}
                  maxLength={15}
                />
                <BottomSheetInput
                  placeholderTx="placeholder.answer"
                  variant="underlined"
                  iconLeft={activeInput === 1 ? 'bookmark' : 'bookmark-outline'}
                  onChangeText={handleSetFormData('answers', 1)}
                  iconLeftPress={() => setActiveInput(1)}
                  maxLength={15}
                />
              </View>
              <View className="flex-1">
                <BottomSheetInput
                  placeholderTx="placeholder.answer"
                  variant="underlined"
                  iconLeft={activeInput === 2 ? 'bookmark' : 'bookmark-outline'}
                  onChangeText={handleSetFormData('answers', 2)}
                  iconLeftPress={() => setActiveInput(2)}
                  maxLength={15}
                />
                <BottomSheetInput
                  placeholderTx="placeholder.answer"
                  variant="underlined"
                  iconLeft={activeInput === 3 ? 'bookmark' : 'bookmark-outline'}
                  onChangeText={handleSetFormData('answers', 3)}
                  iconLeftPress={() => setActiveInput(3)}
                  maxLength={15}
                />
              </View>
            </View>
          )}
          {type === '2' && (
            <View className="flex-row flex-1 m-2 justify-center items-center">
              <BottomSheetInput
                placeholderTx="placeholder.solution"
                variant="underlined"
                onChangeText={handleSetFormData('solution')}
                keyboardType="numeric"
                maxLength={15}
              />
            </View>
          )}
          <Button
            tx="common.create"
            className="mx-2 my-4 h-12"
            disabled={!isValid}
            onPress={handleAddTask}
          />
        </ScrollView>
      </BottomSheet>
    </>
  )
}
