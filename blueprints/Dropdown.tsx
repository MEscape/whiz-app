import React, { useEffect, useState } from 'react'
import { FlatList, TouchableOpacity, View } from 'react-native'

import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import { Icon } from 'blueprints/Icon'
import { Text } from 'blueprints/Text'

interface Option {
  label: string | React.ReactNode
  value: string
}

interface DropdownProps {
  options: Option[]
  width?: string
  selectedOptionIndex?: number
  className?: string
  onSelect?: (option: Option) => void
}

export const Dropdown = ({
  className,
  onSelect,
  options,
  selectedOptionIndex,
  width = 'w-full',
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<Option | null>(null)

  useEffect(() => {
    setSelectedOption(options[selectedOptionIndex])
  }, [selectedOptionIndex])

  // Shared value for controlling height
  const dropdownHeight = useSharedValue(0)

  // Toggle dropdown height animation
  React.useEffect(() => {
    dropdownHeight.value = withTiming(isOpen ? options.length * 42 : 0, {
      duration: 100,
      easing: Easing.inOut(Easing.ease),
    })
  }, [isOpen, options.length, dropdownHeight])

  // Animated style for dropdown
  const animatedStyle = useAnimatedStyle(() => ({
    borderRadius: 8,
    height: dropdownHeight.value,
    overflow: 'hidden',
  }))

  // Handle option selection
  const handleSelectOption = (option: Option) => {
    setSelectedOption(option)
    setIsOpen(false) // Close dropdown when an option is selected
    onSelect && onSelect(option)
  }

  return (
    <View className={`relative ${width} ${className} z-20`}>
      {/* Dropdown Button */}
      <TouchableOpacity
        onPress={() => setIsOpen(prev => !prev)}
        className={`bg-secondary shadow-md p-4 flex-row justify-between items-center ${isOpen ? 'rounded-tl-md rounded-tr-md' : 'rounded-md'}`}>
        {!selectedOption?.label || typeof selectedOption?.label === 'string' ? (
          <Text fontWeight="bold" variant="h2">
            {selectedOption?.label || 'Select an option'}
          </Text>
        ) : (
          selectedOption?.label
        )}
        <Icon name={isOpen ? 'chevron-down' : 'chevron-up'} library="Ionicons" />
      </TouchableOpacity>

      {/* Animated Dropdown Options */}
      <Animated.View
        className={`bg-primary shadow-lg border-secondary w-full rounded-bl-md rounded-br-md ${isOpen && 'border-[1px]'}`}
        style={animatedStyle}>
        <FlatList
          data={options}
          renderItem={({ index, item }) => (
            <TouchableOpacity
              onPress={() => handleSelectOption(item)}
              className={`px-4 py-3 ${index === options.length - 1 ? '' : 'border-b border-secondary'}`}>
              {typeof item.label === 'string' ? <Text>{item.label}</Text> : item.label}
            </TouchableOpacity>
          )}
          keyExtractor={item => item.value}
        />
      </Animated.View>
    </View>
  )
}
