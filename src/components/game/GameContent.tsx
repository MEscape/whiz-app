import React from 'react'
import { Text, View } from 'react-native'

import { contentRegistry } from './contentRegistry'

export const GameContent = ({ enemy, stage }) => {
  const Component = contentRegistry[stage.type]

  if (!Component) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red text-lg font-bold">❌ Unknown Content Type: {stage.type}</Text>
      </View>
    )
  }

  return <Component stage={stage} enemy={enemy} />
}
