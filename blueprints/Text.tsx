import React from 'react'
import { Text as RNText, TextProps as RNTextProps } from 'react-native'

import i18n from 'i18n-js'

import { useAppContext } from '@/context'
import { translate, TxKeyPath } from '@/i18n'

export interface TextProps extends Omit<RNTextProps, 'className'> {
  variant?: TextVariants
  className?: string
  textAlign?: 'left' | 'center' | 'right' | 'justify'
  textColor?: string
  fontWeight?: FontWeight
  uppercase?: boolean
  tx?: TxKeyPath
  text?: string
  txOptions?: i18n.TranslateOptions
}

const variantStyles = {
  body: 'text-base font-body',
  caption: 'text-sm font-caption',
  h1: 'text-2xl font-title',
  h2: 'text-xl font-heading',
  h3: 'text-lg font-subheading',
  small: 'text-[10px] font-body',
}

const textAlignVariants = {
  center: 'text-center',
  justify: 'text-justify',
  left: 'text-left',
  right: 'text-right',
}

const fontWeightVariants = {
  bold: 'font-bold',
  light: 'font-light',
  normal: 'font-normal',
}

export type TextVariants = keyof typeof variantStyles
export type FontWeight = keyof typeof fontWeightVariants

const TextComponent = ({
  children,
  className = '',
  fontWeight = 'normal',
  text,
  textAlign = 'text-left',
  textColor = 'text-text',
  tx,
  txOptions,
  uppercase = false,
  variant = 'body',
  ...props
}: TextProps) => {
  const presetStyle = variantStyles[variant] || variantStyles.body
  const alignStyle = textAlignVariants[textAlign] || textAlignVariants.left
  const weightStyle = fontWeightVariants[fontWeight] || fontWeightVariants.normal
  const upperCaseStyle = uppercase ? 'uppercase' : ''
  useAppContext()

  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  const combinedClassName = [
    presetStyle,
    alignStyle,
    textColor,
    weightStyle,
    upperCaseStyle,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <RNText className={combinedClassName} {...props}>
      {content}
    </RNText>
  )
}

const MemorizedText = React.memo(TextComponent)
MemorizedText.displayName = 'Text'

export { MemorizedText as Text }
