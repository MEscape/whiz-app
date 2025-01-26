import React from 'react'
import { Pressable, View } from 'react-native'

import { Icon } from '@/blueprints'

export function GoOnButton({ scrollTo }: { scrollTo: () => void }) {
  return (
    <View className="flex items-center justify-center flex-1">
      <Pressable
        onPress={scrollTo}
        className="h-20 w-20 rounded-full bg-accent flex justify-center items-center duration-300 opacity:ease-in-out">
        <Icon name="arrow-forward" library="Ionicons" color="text" size={30} />
      </Pressable>
    </View>
  )
}
