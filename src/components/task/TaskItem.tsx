import React, { memo, useEffect } from 'react'
import { Pressable, View } from 'react-native'

import { Swipeable } from 'react-native-gesture-handler'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

import { Selector } from '@/components'
import { playTypesIcon } from '@/constants'
import { useAppContext } from '@/context'

import { Audios, AudioUris } from 'assets/audios'

import { Icon } from 'blueprints/Icon'
import { Text } from 'blueprints/Text'

import { Task } from '@/app/library'

interface TaskItemProps {
  isOpen: boolean
  item: Task
  onToggle: () => void
  refId: string
  editable: boolean
}

const TaskItem = memo(({ editable, isOpen, item, onToggle, refId }: TaskItemProps) => {
  const { collectionStore } = useAppContext()

  const [isDeleted, setIsDeleted] = React.useState(false)
  const opacity = useSharedValue(1)

  const handleDelete = () => {
    opacity.value = withTiming(0, { duration: 300 })
    setTimeout(() => {
      setIsDeleted(true)
      setTimeout(() => collectionStore.deleteTask(refId, item.id), 200)
    }, 200)
  }

  const animatedStyle = useAnimatedStyle(() => ({
    height: isDeleted ? 0 : 'auto',
    opacity: opacity.value,
  }))

  const renderRightActions = () => (
    <View className="m-2 flex justify-center items-center w-20 rounded-xl">
      <Icon name="trash" library="Ionicons" color="text-white" size={24} onPress={handleDelete} />
    </View>
  )

  return (
    <Animated.View style={animatedStyle}>
      <Swipeable renderRightActions={editable && renderRightActions}>
        <Pressable
          className="flex-row px-1 py-5 justify-between items-center flex-1 bg-primary"
          onPress={onToggle}>
          <View className="flex-row items-center gap-x-1.5 flex-1">
            <Icon
              name={playTypesIcon[item.type]}
              library="Ionicons"
              color="text-accent"
              size={15}
              className="w-10"
            />
            <Text text={item.name} className="flex-1" />
          </View>
          {(item?.answers || item?.solution) && (
            <Icon
              name={isOpen ? 'chevron-down' : 'chevron-up'}
              library="Ionicons"
              color="text-secondary"
              className="w-10 ml-4"
            />
          )}
        </Pressable>
        {isOpen && (item?.answers || item?.solution !== undefined) && (
          <View className={item?.answers ? 'h-32' : 'h-10'}>
            {item?.answers ? (
              <Selector
                answers={item?.answers}
                disabled={true}
                showSolution
                solution={item?.solution}
              />
            ) : item?.solution ? (
              <Text text={item?.solution} textAlign="center" fontWeight="bold" />
            ) : null}
          </View>
        )}
      </Swipeable>
    </Animated.View>
  )
})

TaskItem.displayName = 'TaskItem'
export { TaskItem }
