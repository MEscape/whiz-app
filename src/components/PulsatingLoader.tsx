import React from 'react'
import { View } from 'react-native'

interface PulsatingLoaderProps {
  pulseColor?: string
}

export const PulsatingLoader: React.FC<PulsatingLoaderProps> = ({ pulseColor = 'text' }) => {
  return <View className={`w-full h-full bg-${pulseColor} animate-pulse overflow-hidden`} />
}
