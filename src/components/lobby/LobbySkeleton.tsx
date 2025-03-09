import React from 'react'
import { ScrollView, View } from 'react-native'

import { Skeleton } from '../Skeleton'

export const LobbySkeleton = () => {
  return (
    <View className="bg-primary flex-1 p-4">
      <ScrollView
        contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', gap: 14 }}
        showsVerticalScrollIndicator={false}>
        {Array.from({ length: 8 }).map((_, index) => (
          <View className="items-center w-24 gap-y-2 p-2" key={index}>
            <Skeleton className="h-20 w-20 rounded-full" />
            <Skeleton className="h-4 w-20 rounded-full" />
          </View>
        ))}
      </ScrollView>
    </View>
  )
}
