import React from 'react'
import { View } from 'react-native'

import GorhomBottomSheet from '@gorhom/bottom-sheet'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { TxKeyPath } from '@/i18n'

import { Icon, IconProps, VectorIconLibraries } from './Icon'
import { Text } from './Text'

interface BottomSheetProps {
  isVisible: boolean
  onClose: () => void
  title?: TxKeyPath
  children: React.ReactNode
}

interface BottomSheetOptionProps<T extends VectorIconLibraries> {
  label: TxKeyPath
  icon?: {
    name: IconProps<T>['name']
    library: T
  }
  onPress: () => void
}

export const BottomSheetOption = ({
  icon,
  label,
  onPress,
}: BottomSheetOptionProps<VectorIconLibraries>) => (
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

export const BottomSheet = ({ children, isVisible, onClose, title }: BottomSheetProps) => {
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
