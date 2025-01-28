import React, { useState } from 'react'
import { TextInput, TextInputProps, View } from 'react-native'

import { Icon, IconProps, VectorIconLibraries } from './Icon'
import { Text } from './Text'

interface TextFieldProps<L extends VectorIconLibraries, R extends VectorIconLibraries>
  extends TextInputProps {
  placeholder?: string
  error?: string
  variant?: 'standard' | 'rounded' | 'outlined'
  iconLeft?: IconProps<L>['name']
  iconLeftLibrary?: L
  iconRight?: IconProps<R>['name']
  iconRightLibrary?: R
}

const variants = {
  outlined: {
    focus: '',
    theme: '',
  },
  rounded: {
    focus: '',
    theme: '',
  },
  standard: {
    focus: 'border-accent',
    theme: 'border-secondary border-[1px] rounded-lg shadow-lg bg-primary focus:border-accent',
  },
}

export const TextField = ({
  className: overrideClassName,
  error,
  iconLeft,
  iconLeftLibrary = 'Ionicons',
  iconRight,
  iconRightLibrary = 'Ionicons',
  placeholder,
  secureTextEntry,
  variant = 'standard',
  ...props
}: TextFieldProps<VectorIconLibraries, VectorIconLibraries>) => {
  const [showPassword, setShowPassword] = useState(false)
  const [focused, setFocused] = useState(false)
  const variantStyles = variants[variant]

  const toggleSecureTextEntry = () => {
    setShowPassword(prevState => !prevState)
  }

  return (
    <View className="w-full py-2">
      <View
        className={`${variantStyles.theme} flex-row items-center mb-1 h-12 ${overrideClassName} ${focused && variantStyles.focus}`}>
        {iconLeft && (
          <Icon
            name={iconLeft}
            color="text-secondary"
            library={iconLeftLibrary}
            className="pl-2 pr-1"
          />
        )}
        <Text
          variant="h3"
          text={placeholder}
          className={`absolute left-10 px-1 pointer-events-none ${focused && '-translate-y-[23px] -translate-x-9 bg-primary'}`}
        />
        <TextInput
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="flex-grow"
          secureTextEntry={secureTextEntry && !showPassword}
          {...props}
        />
        {(iconRight || secureTextEntry) && (
          <Icon
            color="text-secondary"
            name={showPassword ? 'eye-off' : 'eye'}
            library={iconRightLibrary}
            onPress={toggleSecureTextEntry}
            className="pl-1 pr-2"
          />
        )}
      </View>
      {error && (
        <Text variant="caption" textColor="text-accent">
          {error}
        </Text>
      )}
    </View>
  )
}
