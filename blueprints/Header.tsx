import React, { ReactElement } from 'react'
import { Pressable, PressableProps, View } from 'react-native'

import { ExtendedEdge, useSafeAreaInsetsStyle } from '@/hooks'
import { translate } from '@/i18n'

import { Icon, IconProps, VectorIconLibraries } from './Icon'
import { Text, TextProps } from './Text'

export interface HeaderProps<
  L extends VectorIconLibraries,
  T extends VectorIconLibraries,
  R extends VectorIconLibraries,
> {
  backgroundColor?: string
  color?: string
  className?: string
  safeAreaEdges?: ExtendedEdge[]
  children?: React.ReactNode

  titleIcon?: IconProps<T>['name']
  titleIconLibrary?: T
  title?: TextProps['text']
  titleTx?: TextProps['tx']
  titleOrder?: Array<'content' | 'icon'>
  titleTxOptions?: TextProps['txOptions']
  TitleActionComponent?: ReactElement
  onTitlePress?: PressableProps['onPress']

  leftIcon?: IconProps<L>['name']
  leftIconLibrary?: L
  leftText?: TextProps['text']
  leftTx?: TextProps['tx']
  leftOrder?: Array<'content' | 'icon'>
  LeftActionComponent?: ReactElement
  leftTxOptions?: TextProps['txOptions']
  onLeftPress?: PressableProps['onPress']

  rightIcon?: IconProps<R>['name']
  rightIconLibrary?: R
  rightText?: TextProps['text']
  rightTx?: TextProps['tx']
  rightOrder?: Array<'content' | 'icon'>
  RightActionComponent?: ReactElement
  rightTxOptions?: TextProps['txOptions']
  onRightPress?: PressableProps['onPress']
}

interface HeaderActionProps<T extends VectorIconLibraries> {
  content?: string
  icon?: IconProps<T>['name']
  library?: T
  onPress?: PressableProps['onPress']
  ActionComponent?: ReactElement
  renderOrder?: Array<'content' | 'icon'>
  baseStyles?: string
  color?: string
}

const HeaderComponent = (
  props: HeaderProps<VectorIconLibraries, VectorIconLibraries, VectorIconLibraries>,
) => {
  const {
    backgroundColor = 'primary',
    className = '',
    color = 'text-text',
    safeAreaEdges = ['top'],
  } = props

  const containerInsets = useSafeAreaInsetsStyle(safeAreaEdges as Array<ExtendedEdge>)

  const i18nTitle = props.titleTx && translate(props.titleTx, props.titleTxOptions)
  const titleContent = (i18nTitle || props.title || props.children) as string

  const i18nLeftText = props.leftTx && translate(props.leftTx, props.leftTxOptions)
  const leftTextContent = (i18nLeftText || props.leftText) as string

  const i18nRightText = props.rightTx && translate(props.rightTx, props.rightTxOptions)
  const rightTextContent = (i18nRightText || props.rightText) as string

  const containerStyles = `
    flex w-full flex-row items-center p-4
    ${className} bg-${backgroundColor}
  `

  return (
    <View style={containerInsets} className={containerStyles}>
      {/* Left Action - Align to the left */}
      <HeaderAction
        content={leftTextContent}
        icon={props.leftIcon}
        library={props.leftIconLibrary}
        onPress={props.onLeftPress}
        renderOrder={props.leftOrder}
        ActionComponent={props.LeftActionComponent}
        color={color}
      />

      {/* Title - Centered */}
      <HeaderAction
        content={titleContent}
        icon={props.titleIcon}
        library={props.titleIconLibrary}
        onPress={props.onTitlePress}
        renderOrder={props.titleOrder}
        ActionComponent={props.TitleActionComponent}
        color={color}
        baseStyles="flex-1 justify-center"
      />

      {/* Right Action - Align to the right */}
      <HeaderAction
        content={rightTextContent}
        icon={props.rightIcon}
        library={props.rightIconLibrary}
        onPress={props.onRightPress}
        renderOrder={props.rightOrder}
        ActionComponent={props.RightActionComponent}
        color={color}
      />
    </View>
  )
}

const MemorizedHeader = React.memo(HeaderComponent)
MemorizedHeader.displayName = 'Header'
export { MemorizedHeader as Header }

const textStyles = ''
const containerStyles = 'flex flex-row h-full items-center gap-x-1.5'

const HeaderAction = (props: HeaderActionProps<VectorIconLibraries>) => {
  if (props.ActionComponent) return props.ActionComponent

  const order = props.renderOrder || ['icon', 'content']

  if (props.content && props.icon) {
    const renderItems = {
      content: <Text key="content" variant="h1" text={props.content} textColor={props.color} />,
      icon: <Icon key="icon" name={props.icon} library={props.library} color={props.color} />,
    }

    return (
      <Pressable className={`${containerStyles} ${props.baseStyles} mt-4`} onPress={props.onPress}>
        {order.map(key => renderItems[key])}
      </Pressable>
    )
  }

  if (props.content) {
    return (
      <Pressable className={`${containerStyles} ${props.baseStyles}`} onPress={props.onPress}>
        <Text
          variant="h1"
          text={props.content}
          className={`${textStyles} mt-4`}
          textColor={props.color}
        />
      </Pressable>
    )
  }

  if (props.icon) {
    return (
      <Icon name={props.icon} library={props.library} className="mt-4" onPress={props.onPress} />
    )
  }

  return <View className={`${containerStyles} flex-1 mt-4`} />
}
