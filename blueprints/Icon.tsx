import React from 'react'

import * as VectorIcons from '@expo/vector-icons'

/**
 * Define the supported vector icon libraries and their icon names.
 */
export type VectorIconLibraries = Extract<keyof typeof VectorIcons, 'AntDesign' | 'Ionicons'>
type IconLibraryMap = {
  [K in VectorIconLibraries]: keyof (typeof VectorIcons)[K]['glyphMap']
}

/**
 * Interface for icon props.
 */
export interface IconProps<T extends VectorIconLibraries> {
  /**
   * Name of the icon from the selected library.
   */
  name: IconLibraryMap[T]

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
function IconComponent<T extends VectorIconLibraries>(props: IconProps<T>): React.ReactElement {
  let { className = '', color = 'text', library, name, onPress, size = 20 } = props
  className += ` text-${color}`

  const VectorIcon = VectorIcons[library]

  return <VectorIcon name={name} size={size} className={className} onPress={onPress} />
}

const MemorizedIcon = React.memo(IconComponent)
MemorizedIcon.displayName = 'Icon'

export { MemorizedIcon as Icon }
