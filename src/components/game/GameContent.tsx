import React from 'react'
import { Text, View } from 'react-native'

import { contentRegistry } from './contentRegistry'

const GameContent = ({ stage }) => {
  const Component = contentRegistry[stage.type]

  if (!Component) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-900">
        <Text className="text-red-500 text-lg font-bold">
          ❌ Unknown Content Type: {stage.type}
        </Text>
      </View>
    )
  }

  return <Component data={stage.data} />
}

export default GameContent
