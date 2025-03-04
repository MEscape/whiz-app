import React from 'react'
import { ScrollView } from 'react-native'

import { Skeleton } from '../../Skeleton'

export const StageSkeleton = () => {
  return (
    <ScrollView
      className="flex-1 p-4"
      contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
      <Skeleton className="h-12 w-full rounded-lg mb-2" />
      <Skeleton className="h-6 w-full rounded-lg" />
      <Skeleton className="h-36 my-8 w-full rounded-lg" />
    </ScrollView>
  )
}
