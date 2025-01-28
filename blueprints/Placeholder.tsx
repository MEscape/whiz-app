import React from 'react'
import { View } from 'react-native'

import { Icon } from './Icon'

type PlaceholderProps = {
  backgroundColor?: string
  iconName?: string
  iconLibrary?: 'AntDesign' | 'Ionicons'
  iconSize?: number
  iconColor?: string
}

const Placeholder: React.FC<PlaceholderProps> = ({
  backgroundColor = 'primary',
  iconColor = 'text',
  iconLibrary = 'Ionicons',
  iconName = 'help-sharp',
  iconSize = 30,
}) => {
  return (
    <View
      className={`w-full h-full bg-${backgroundColor} overflow-hidden justify-center items-center`}>
      <Icon name={iconName} library={iconLibrary} size={iconSize} color={iconColor} />
    </View>
  )
}

export default Placeholder
