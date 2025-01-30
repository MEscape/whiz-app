import React, { useEffect, useState } from 'react'
import { Pressable, PressableProps, Vibration, View } from 'react-native'

import i18n from 'i18n-js'

import { useAudioPlayer } from '@/hooks'
import { translate, TxKeyPath } from '@/i18n'

import { Audios, AudioUris } from 'assets/audios'

import { Text, TextProps } from './Text'

interface ButtonProps extends PressableProps {
  variant?: 'primary' | 'secondary' | 'tertiary'
  onPress?: () => void
  disabled?: boolean
  className?: string
  text?: string
  tx?: TxKeyPath
  txOptions?: i18n.TranslateOptions
  textProps?: TextProps
}

const baseStyle =
  'rounded-lg px-4 py-2 items-center justify-center transition-transform duration-150'
const variantStyles = {
  primary: 'bg-accent text-text',
  secondary: 'text-accent border-2 border-accent',
  tertiary: 'bg-secondary text-text',
}

const ButtonComponent: React.FC<ButtonProps> = ({
  children,
  className = '',
  disabled = false,
  onPress,
  text,
  tx,
  txOptions,
  variant = 'primary',
  ...props
}) => {
  const [isAnimating, setIsAnimating] = useState(false)
  const { isPlaying, loadAudio, playAudio, stopAudio } = useAudioPlayer()

  const i18nText = tx && translate(tx, txOptions)
  const content = (i18nText || text || children) as string

  const disabledStyle = disabled ? 'opacity-50' : ''
  const pressedStyle = isAnimating ? 'scale-95' : 'scale-100'

  const combinedClassName = [
    baseStyle,
    variantStyles[variant],
    pressedStyle,
    disabledStyle,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const handlePressIn = () => {
    setIsAnimating(true)
    Vibration.vibrate(10)
    if (isPlaying) stopAudio()

    playAudio()
  }

  const handlePressOut = () => {
    setTimeout(() => setIsAnimating(false), 150) // Reset after 150ms
  }

  useEffect(() => {
    loadAudio(AudioUris[Audios.BUTTON_SOUND])
  }, [])

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      disabled={disabled}
      {...props}>
      <View className={combinedClassName}>
        <Text
          variant="body"
          textColor={variant === 'secondary' ? 'text-accent' : 'text-text'}
          fontWeight="bold"
          {...props.textProps}>
          {content}
        </Text>
      </View>
    </Pressable>
  )
}

const MemorizedButton = React.memo(ButtonComponent)
MemorizedButton.displayName = 'Button'

export { MemorizedButton as Button }
