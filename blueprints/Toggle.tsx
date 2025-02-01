import React, { FC, useCallback, useMemo, useState } from 'react'
import { Animated, Easing, TouchableOpacity, View } from 'react-native'

import { Icon, IconProps, LibraryTypes } from 'blueprints/Icon'

export type ToggleVariants = 'switch' | 'radio' | 'checkbox'

export interface ToggleProps<Off extends LibraryTypes, On extends LibraryTypes> {
  value: boolean
  onValueChange: (value: boolean) => void
  disabled?: boolean
  variant?: ToggleVariants
  backgroundColor?: string
  innerColor?: string
  activeColor?: string
  offIconName?: IconProps<Off>['name']
  offIconLibrary?: Off
  onIconName?: IconProps<On>['name']
  onIconLibrary?: On
  OnIcon?: React.ReactNode
  OffIcon?: React.ReactNode
  className?: string
}

export const Toggle: React.FC<ToggleProps<LibraryTypes, LibraryTypes>> = ({
  activeColor = 'bg-accent',
  backgroundColor = 'bg-secondary',
  className,
  disabled,
  innerColor = 'bg-text',
  offIconLibrary = 'Ionicons',
  offIconName,
  onIconLibrary = 'Ionicons',
  onIconName,
  onValueChange,
  value,
  variant = 'switch',
}) => {
  const ToggleInput = useMemo(() => ToggleInputs[variant] || (() => null), [variant])

  const OffIcon = useMemo(() => <Icon name={offIconName} library={offIconLibrary} size={16} />, [])

  const OnIcon = useMemo(() => <Icon name={onIconName} library={onIconLibrary} size={16} />, [])

  return (
    <ToggleInput
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      backgroundColor={backgroundColor}
      innerColor={innerColor}
      activeColor={activeColor}
      OffIcon={OffIcon}
      OnIcon={OnIcon}
      className={className}
    />
  )
}

const Checkbox: FC<ToggleProps<LibraryTypes, LibraryTypes>> = ({
  activeColor,
  backgroundColor,
  disabled,
  innerColor,
  onValueChange,
  value,
}) => {
  return (
    <TouchableOpacity onPress={() => onValueChange(!value)} disabled={disabled}>
      <View
        style={{
          backgroundColor: value ? 'green' : 'white',
          borderRadius: 4,
          borderWidth: 1,
          height: 24,
          width: 24,
        }}
      />
    </TouchableOpacity>
  )
}

const Radio: FC<ToggleProps<LibraryTypes, LibraryTypes>> = ({
  activeColor,
  backgroundColor,
  disabled,
  innerColor,
  onValueChange,
  value,
}) => {
  return (
    <TouchableOpacity onPress={() => onValueChange(!value)} disabled={disabled}>
      <View
        style={{
          alignItems: 'center',
          backgroundColor: value ? 'blue' : 'white',
          borderColor: 'black',
          borderRadius: 12,
          borderWidth: 1,
          height: 24,
          justifyContent: 'center',
          width: 24,
        }}>
        {value && (
          <View style={{ backgroundColor: 'white', borderRadius: 6, height: 12, width: 12 }} />
        )}
      </View>
    </TouchableOpacity>
  )
}

const Switch: FC<ToggleProps<LibraryTypes, LibraryTypes>> = ({
  activeColor,
  backgroundColor,
  className,
  disabled,
  innerColor,
  OffIcon,
  OnIcon,
  onValueChange,
  value,
}) => {
  const [animatedValue] = useState(new Animated.Value(value ? 1 : 0))

  const toggleSwitch = useCallback(() => {
    const newValue = !value
    onValueChange(newValue)

    Animated.timing(animatedValue, {
      duration: 200,
      easing: Easing.ease,
      toValue: newValue ? 1 : 0,
      useNativeDriver: true,
    }).start()
  }, [value, onValueChange, animatedValue])

  const switchStyle = {
    transform: [
      {
        translateX: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 20],
        }),
      },
    ],
  }

  return (
    <TouchableOpacity onPress={toggleSwitch} disabled={disabled} className={className}>
      <View
        className={`rounded-[20px] h-8 p-1 w-14 transition-colors ease-in-out duration-200 ${value ? activeColor : backgroundColor}`}>
        {OffIcon && !value && (
          <View className="absolute left-8 top-1.5 w-5 h-5 pointer-events-none">{OffIcon}</View>
        )}

        {OnIcon && value && (
          <View className="absolute left-1.5 top-1.5 w-5 h-5 pointer-events-none">{OnIcon}</View>
        )}

        <Animated.View className={`rounded-full h-6 w-6 ${innerColor}`} style={switchStyle} />
      </View>
    </TouchableOpacity>
  )
}

const ToggleInputs: Record<ToggleVariants, FC<ToggleProps<LibraryTypes, LibraryTypes>>> = {
  checkbox: Checkbox,
  radio: Radio,
  switch: Switch,
}
