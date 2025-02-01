import React from 'react'
import { Pressable } from 'react-native'

import * as VectorIcons from '@expo/vector-icons'
import { cssInterop } from 'nativewind'

import { Image } from './Image'

/**
 * Define the supported vector icon libraries and their icon names.
 */
export type VectorIconLibraries = Extract<keyof typeof VectorIcons, 'AntDesign' | 'Ionicons'>
type IconLibraryMap = {
  [K in VectorIconLibraries]: keyof (typeof VectorIcons)[K]['glyphMap']
}
export type LibraryTypes = 'custom' | VectorIconLibraries

/**
 * Interface for icon props.
 */
export interface IconProps<T extends LibraryTypes> {
  /**
   * Name of the icon from the selected library.
   */
  name: T extends keyof IconLibraryMap ? IconLibraryMap[T] : never

  /**
   * Optional classNames for the icon.
   */
  className?: string

  /**
   * Size of the icon. Default is 20.
   */
  size?: number

  /**
   * Optional callback for when the icon is pressed.
   */
  onPress?: () => void

  /**
   * Optional color for the icon.
   */
  color?: string

  /**
   * The vector icon library to use.
   */
  library: T
}

/**
 * A component to render an Expo Vector Icon.
 *
 * @param {IconProps<T>} props - Props for the `Icon` component.
 * @returns {React.ReactElement} The rendered icon component.
 */
function IconComponent<T extends LibraryTypes>(props: IconProps<T>): React.ReactElement {
  const { className = '', color = 'text-text', library, name, onPress, size = 20 } = props
  const combinedClassName = [color, className].filter(Boolean).join(' ')

  if (library === 'custom') {
    return (
      <Pressable className={`w-4 h-4 ${combinedClassName}`} onPress={onPress}>
        <Image src={name} classNameContainer="h-full w-full" />
      </Pressable>
    )
  }

  const VectorIcon = VectorIcons[library]

  cssInterop(VectorIcon, {
    className: {
      nativeStyleToProp: { height: true, size: true, width: true },
      target: 'style',
    },
  })

  return <VectorIcon name={name} size={size} className={combinedClassName} onPress={onPress} />
}

const MemorizedIcon = React.memo(IconComponent)
MemorizedIcon.displayName = 'Icon'

export { MemorizedIcon as Icon }
