import React from 'react'
import { View } from 'react-native'
import { BottomSheet as GorhomBottomSheet } from '@gorhom/bottom-sheet'
import { Text } from './Text'
import { Icon } from './Icon'
import { TouchableOpacity } from 'react-native-gesture-handler'

interface BottomSheetProps {
  isVisible: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
}

interface BottomSheetOptionProps {
  label: string
  icon?: {
    name: string
    library: string
  }
  onPress: () => void
}

export const BottomSheetOption = ({ label, icon, onPress }: BottomSheetOptionProps) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex-row items-center px-4 py-3 border-b border-secondary">
    {icon && (
      <Icon
        name={icon.name}
        library={icon.library}
        size={24}
        color="text-primary"
        className="mr-3"
      />
    )}
    <Text variant="body" tx={label} />
  </TouchableOpacity>
)

export const BottomSheet = ({ isVisible, onClose, title, children }: BottomSheetProps) => {
  return (
    <GorhomBottomSheet
      index={isVisible ? 0 : -1}
      snapPoints={['25%', '50%']}
      enablePanDownToClose
      onClose={onClose}>
      <View className="flex-1 bg-white">
        {title && (
          <View className="px-4 py-3 border-b border-secondary">
            <Text variant="h3" tx={title} />
          </View>
        )}
        {children}
      </View>
    </GorhomBottomSheet>
  )
} 