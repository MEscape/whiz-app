import React, { forwardRef, useEffect, useState } from 'react'
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  View,
} from 'react-native'

import { translate } from '@/i18n'

import { Icon, IconProps, LibraryTypes } from './Icon'
import { Text, TextProps } from './Text'

export interface TextFieldProps<L extends LibraryTypes, R extends LibraryTypes>
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
  innerClassName?: string
  iconLeftPress?: IconProps<L>['onPress']
  iconRightPress?: IconProps<R>['onPress']
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

const TextField = forwardRef<TextInput, TextFieldProps<LibraryTypes, LibraryTypes>>(
  (
    {
      className: overrideClassName,
      error,
      errorTx,
      errorTxOptions,
      iconLeft,
      iconLeftLibrary = 'Ionicons',
      iconLeftPress,
      iconRight,
      iconRightLibrary = 'Ionicons',
      iconRightPress,
      innerClassName,
      onBlur,
      onChangeText,
      onFocus,
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
    const [text, setText] = useState(value)
    const [focused, setFocused] = useState(false)
    const variantStyles = variants[variant]

    const i18nPlaceholderText = placeholderTx && translate(placeholderTx, placeholderTxOptions)
    const placeholderContent = (i18nPlaceholderText || placeholder) as string

    const i18nErrorText = errorTx && translate(errorTx, errorTxOptions)
    const errorContent = (i18nErrorText || error) as string

    const toggleSecureTextEntry = () => {
      setShowPassword(prevState => !prevState)
    }

    const handleFocus = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setFocused(true)
      if (onFocus) onFocus(event)
    }

    const handleBlur = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setFocused(false)
      if (onBlur) onBlur(event)
    }

    const handleChangeText = (name: string) => {
      setText(name)
      if (onChangeText) onChangeText(name)
    }

    const isValuePresent = text?.length > 0

    return (
      <View className={`flex-1 py-2 ${overrideClassName}`}>
        <View
          className={`${variantStyles.theme} flex-row items-center mb-1 h-12 transition-all duration-300 ease-in-out ${
            focused && variantStyles.focus
          } ${innerClassName}`}>
          {iconLeft && (
            <Icon
              name={iconLeft}
              color="text-secondary"
              library={iconLeftLibrary}
              className="pl-2 pr-1"
              onPress={iconLeftPress}
            />
          )}
          {(variant === 'standard' || !isValuePresent) && (
            <Text
              variant="h3"
              text={placeholderContent}
              textColor={variant === 'standard' && focused ? 'text-text' : 'text-secondary'}
              className={`absolute ${iconLeft && 'left-10'} px-1 pointer-events-none transition-transform duration-200 ease-in-out ${
                variant === 'standard' && (focused || isValuePresent)
                  ? `-translate-y-[23px] ${iconLeft && '-translate-x-8'} bg-primary text-sm`
                  : 'translate-y-0 translate-x-0'
              }`}
            />
          )}
          <TextInput
            ref={ref}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChangeText={handleChangeText}
            className="flex-grow text-md caret-accent text-text"
            secureTextEntry={secureTextEntry && !showPassword}
            value={text}
            {...props}
          />
          {(iconRight || secureTextEntry) && (
            <Icon
              color="text-secondary"
              name={showPassword ? 'eye' : 'eye-off'}
              library={iconRightLibrary}
              onPress={secureTextEntry ? toggleSecureTextEntry : iconRightPress}
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
