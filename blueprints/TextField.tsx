import React, { forwardRef, useEffect, useState } from 'react'
import { TextInput, TextInputProps, View } from 'react-native'

import { translate } from '@/i18n'

import { Icon, IconProps, VectorIconLibraries } from './Icon'
import { Text, TextProps } from './Text'

interface TextFieldProps<L extends VectorIconLibraries, R extends VectorIconLibraries>
  extends TextInputProps {
  placeholder?: string
  error?: string
  variant?: 'standard' | 'underlined'
  iconLeft?: IconProps<L>['name']
  iconLeftLibrary?: L
  iconRight?: IconProps<R>['name']
  iconRightLibrary?: R
  placeholderTx?: TextProps['tx']
  placeholderTxOptions?: TextProps['txOptions']
  errorTx?: TextProps['tx']
  errorTxOptions?: TextProps['txOptions']
}

const variants = {
  standard: {
    focus: 'border-text',
    theme: 'border-secondary border-[1px] rounded-lg bg-primary focus:border-accent',
  },
  underlined: {
    focus: 'border-text',
    theme: 'bg-primary border-b-2 border-secondary',
  },
}

const TextField = forwardRef<TextInput, TextFieldProps<VectorIconLibraries, VectorIconLibraries>>(
  (
    {
      className: overrideClassName,
      error,
      errorTx,
      errorTxOptions,
      iconLeft,
      iconLeftLibrary = 'Ionicons',
      iconRight,
      iconRightLibrary = 'Ionicons',
      placeholder,
      placeholderTx,
      placeholderTxOptions,
      secureTextEntry,
      value,
      variant = 'standard',
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false)
    const [focused, setFocused] = useState(false)
    const variantStyles = variants[variant]

    const i18nPlaceholderText = placeholderTx && translate(placeholderTx, placeholderTxOptions)
    const placeholderContent = (i18nPlaceholderText || placeholder) as string

    const i18nErrorText = errorTx && translate(errorTx, errorTxOptions)
    const errorContent = (i18nErrorText || error) as string

    const toggleSecureTextEntry = () => {
      setShowPassword(prevState => !prevState)
    }

    useEffect(() => {
      console.log(value)
    }, [value])

    const isValuePresent = value?.length > 0

    return (
      <View className={`w-full py-2 ${overrideClassName}`}>
        <View
          className={`${variantStyles.theme} flex-row items-center mb-1 h-12 transition-all duration-300 ease-in-out ${
            focused && variantStyles.focus
          }`}>
          {iconLeft && (
            <Icon
              name={iconLeft}
              color="text-secondary"
              library={iconLeftLibrary}
              className="pl-2 pr-1"
            />
          )}
          {(variant === 'standard' || !isValuePresent) && (
            <Text
              variant="h3"
              text={placeholderContent}
              textColor={variant === 'standard' && focused ? 'text-text' : 'text-secondary'}
              className={`absolute left-10 px-1 pointer-events-none transition-transform duration-200 ease-in-out ${
                variant === 'standard' && (focused || isValuePresent)
                  ? '-translate-y-[23px] -translate-x-8 bg-primary text-sm'
                  : 'translate-y-0 translate-x-0'
              }`}
            />
          )}
          <TextInput
            ref={ref}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="flex-grow text-md caret-accent text-text"
            secureTextEntry={secureTextEntry && !showPassword}
            value={value}
            {...props}
          />
          {(iconRight || secureTextEntry) && (
            <Icon
              color="text-secondary"
              name={showPassword ? 'eye' : 'eye-off'}
              library={iconRightLibrary}
              onPress={toggleSecureTextEntry}
              className="pl-1 pr-2"
            />
          )}
        </View>
        {errorContent && (
          <Text variant="caption" textColor="text-accent" className="pl-2">
            {errorContent}
          </Text>
        )}
      </View>
    )
  },
)

TextField.displayName = 'TextField'

export { TextField }
