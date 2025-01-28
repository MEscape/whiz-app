import React from 'react'
import { Pressable, View } from 'react-native'

import { Icon } from 'blueprints'

export function GoOnButton({ disabled, scrollTo }: { scrollTo: () => void; disabled: boolean }) {
  const combinedClassName = [
    'h-20 w-20 rounded-full bg-accent flex justify-center items-center duration-300 opacity:ease-in-out',
    disabled && 'opacity-25',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <View className="flex items-center justify-center flex-1">
      <Pressable disabled={disabled} onPress={scrollTo} className={combinedClassName}>
        <Icon
          name={disabled ? 'lock-closed' : 'arrow-forward'}
          library="Ionicons"
          color="text"
          size={30}
        />
      </Pressable>
    </View>
  )
}
