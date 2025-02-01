import React from 'react'
import { TouchableWithoutFeedback, View } from 'react-native'

import { BottomSheetBackdropProps, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
import { cssInterop } from 'nativewind'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from 'react-native-reanimated'

import { TxKeyPath } from '@/i18n'

import { Icon, IconProps, LibraryTypes } from './Icon'
import { Text } from './Text'

interface BottomSheetProps {
  isVisible: boolean
  onClose: () => void
  title?: TxKeyPath
  snapPoints?: Array<string>
  children: React.ReactNode
}

interface BottomSheetOptionProps<T extends LibraryTypes> {
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
}: BottomSheetOptionProps<LibraryTypes>) => {
  cssInterop(TouchableOpacity, { className: 'style' })

  return (
    <TouchableOpacity onPress={onPress} className="flex-row items-center px-4 py-3">
      {icon && (
        <Icon
          name={icon.name}
          library={icon.library}
          size={24}
          color="text-text"
          className="mr-3"
        />
      )}
      <Text variant="body" tx={label} />
    </TouchableOpacity>
  )
}

const CustomBackdrop = ({
  animatedIndex,
  onClose,
  style,
}: BottomSheetBackdropProps & { onClose: () => void }) => {
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(animatedIndex.value, [-1, 0], [0, 0.5], {
      extrapolateRight: Extrapolation.CLAMP,
    }),
  }))

  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <Animated.View className="absolute inset-0 bg-black" style={[style, animatedStyle]} />
    </TouchableWithoutFeedback>
  )
}

export const BottomSheet = ({
  children,
  isVisible,
  onClose,
  snapPoints,
  title,
}: BottomSheetProps) => {
  const bottomSheetRef = React.useRef<BottomSheetModal>(null)

  React.useEffect(() => {
    if (isVisible) {
      bottomSheetRef.current?.present()
    } else {
      bottomSheetRef?.current?.dismiss()
    }
  }, [isVisible])

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints ?? ['25%', '50%']}
      enablePanDownToClose
      backdropComponent={props => <CustomBackdrop {...props} onClose={onClose} />}
      onDismiss={onClose}
      backgroundStyle={{ backgroundColor: 'var(--primary)' }}
      handleIndicatorStyle={{ backgroundColor: 'var(--secondary)' }}>
      <BottomSheetView className="flex-1 bg-primary">
        {title && (
          <View className="px-4 py-3 border-b border-secondary">
            <Text variant="h3" tx={title} />
          </View>
        )}
        {children}
      </BottomSheetView>
    </BottomSheetModal>
  )
}
