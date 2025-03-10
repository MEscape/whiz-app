import React, { useEffect, useState } from 'react'
import { Pressable, PressableProps, Vibration, View } from 'react-native'

import i18n from 'i18n-js'
import { observer } from 'mobx-react-lite'

import { useAppContext } from '@/context'
import { useAudioPlayer } from '@/hooks'
import { translate, TxKeyPath } from '@/i18n'

import { Audios, AudioUris } from 'assets/audios'

import { Icon, IconProps, LibraryTypes } from './Icon'
import { Text, TextProps } from './Text'

interface ButtonProps<L extends LibraryTypes, R extends LibraryTypes> extends PressableProps {
  variant?: 'primary' | 'secondary' | 'tertiary'
  onPress?: () => void
  disabled?: boolean
  className?: string
  text?: string
  tx?: TxKeyPath
  txOptions?: i18n.TranslateOptions
  textProps?: TextProps
  leftIcon?: IconProps<L>['name']
  rightIcon?: IconProps<R>['name']
  leftIconLibrary?: L
  rightIconLibrary?: R
  outerClassName?: string
  isLoading?: boolean
}

const baseStyle =
  'rounded-lg px-4 py-2 flex-row items-center justify-center transition-transform duration-100'
const variantStyles = {
  primary: 'bg-accent text-text',
  secondary: 'text-accent border-2 border-accent',
  tertiary: 'bg-secondary text-text',
}

const ButtonComponent: React.FC<ButtonProps<LibraryTypes, LibraryTypes>> = observer(
  ({
    children,
    className = '',
    disabled = false,
    isLoading,
    leftIcon,
    leftIconLibrary = 'Ionicons',
    onPress,
    outerClassName,
    rightIcon,
    rightIconLibrary = 'Ionicons',
    text,
    tx,
    txOptions,
    variant = 'primary',
    ...props
  }) => {
    const [isAnimating, setIsAnimating] = useState(false)
    const { isPlaying, loadAudio, playAudio, stopAudio } = useAudioPlayer('sound')
    useAppContext()

    const i18nText = tx && translate(tx, txOptions)
    const content = (i18nText || text || children) as string

    const pressedStyle = isAnimating ? 'scale-95' : 'scale-100'

    const combinedClassName = [baseStyle, variantStyles[variant], pressedStyle, className]
      .filter(Boolean)
      .join(' ')

    const handlePressIn = () => {
      if (isLoading) return
      setIsAnimating(true)
      Vibration.vibrate(10)
      if (isPlaying) stopAudio()

      playAudio()
    }

    const handlePressOut = () => {
      setTimeout(() => setIsAnimating(false), 50)
    }

    useEffect(() => {
      loadAudio(AudioUris[Audios.BUTTON_SOUND])
    }, [])

    const textColor = variant === 'secondary' ? 'text-accent' : 'text-text'

    // Pulsating animation for isLoading
    const loadingAnimation = isLoading
      ? 'animate-pulse' // pulsating effect for the button
      : ''

    return (
      <Pressable
        style={{ opacity: disabled || isLoading ? 0.5 : 1 }}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        disabled={disabled || isLoading}
        className={outerClassName}
        {...props}>
        <View className={`${combinedClassName} ${loadingAnimation}`}>
          {leftIcon && (
            <Icon
              name={leftIcon}
              library={leftIconLibrary}
              className="mr-2"
              size={20}
              color={textColor}
            />
          )}
          <Text variant="body" textColor={textColor} fontWeight="bold" {...props.textProps}>
            {content}
          </Text>
          {rightIcon && (
            <Icon
              name={rightIcon}
              library={rightIconLibrary}
              className="ml-2"
              size={20}
              color={textColor}
            />
          )}
        </View>
      </Pressable>
    )
  },
)

const MemorizedButton = React.memo(ButtonComponent)
MemorizedButton.displayName = 'Button'

export { MemorizedButton as Button }
