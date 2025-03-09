import React from 'react'
import { ScrollView, View } from 'react-native'

import { Skeleton } from '../Skeleton'

export function ProfileSkeleton() {
  return (
    <ScrollView className="flex-1 bg-primary" showsVerticalScrollIndicator={false}>
      {/* Profile Header Skeleton */}
      <View className="flex-row items-center p-4">
        <Skeleton className="h-20 w-20 rounded-full" />
        <Skeleton className="ml-4 h-8 w-40" />
      </View>

      {/* Level Progress Skeleton */}
      <View className="px-4">
        <Skeleton className="h-6 w-20 mb-2" />
        <Skeleton className="h-4 w-full rounded-full" />
      </View>

      {/* Party Stats Skeleton */}
      <View className="mt-4 px-4">
        <Skeleton className="h-32 w-full rounded-lg" />
      </View>

      {/* Rewards Skeleton */}
      <View className="mt-4 px-4">
        <Skeleton className="h-40 w-full rounded-lg" />
      </View>

      {/* Inventory Skeleton */}
      <View className="mt-4 px-4">
        <Skeleton className="h-60 w-full rounded-lg" />
      </View>
    </ScrollView>
  )
}
