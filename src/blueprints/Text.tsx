import React from 'react'
import { Text as RNText, TextProps as RNTextProps } from 'react-native'

import i18n from 'i18n-js'

import { translate, TxKeyPath } from '@/i18n'

export interface TextProps extends Omit<RNTextProps, 'className'> {
  variant?: TextVariants
  className?: string
  textAlign?: 'left' | 'center' | 'right' | 'justify'
  textColor?: string
  fontWeight?: 'light' | 'normal' | 'bold'
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
}

export type TextVariants = keyof typeof variantStyles

export const Text = ({
  children,
  className = '',
  fontWeight = 'normal',
  text,
  textAlign = 'left',
  textColor = 'text',
  tx,
  txOptions,
  uppercase = false,
  variant = 'body',
  ...props
}: TextProps) => {
  const presetStyle = variantStyles[variant] || variantStyles.body

  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  const combinedClassName = [
    presetStyle,
    className,
    `text-${textAlign}`,
    `text-${textColor}`,
    fontWeight === 'bold' ? 'font-title' : fontWeight === 'light' ? 'font-body' : 'font-caption',
    uppercase ? 'uppercase' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <RNText className={combinedClassName} {...props}>
      {content}
    </RNText>
  )
}
