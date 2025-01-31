import React from 'react'
import { View } from 'react-native'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <View 
      className={`animate-pulse bg-secondary ${className}`} 
    />
  )
} 