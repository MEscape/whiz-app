import React from 'react'
import { View } from 'react-native'

interface PulsatingLoaderProps {
  pulseColor?: string
  className?: string
}

export const PulsatingLoader: React.FC<PulsatingLoaderProps> = ({
  className = '',
  pulseColor = 'text',
}) => {
  return (
    <View className={`w-full h-full bg-${pulseColor} animate-pulse overflow-hidden ${className}`} />
  )
}
