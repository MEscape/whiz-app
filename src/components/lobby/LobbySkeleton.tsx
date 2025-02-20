import React from "react"
import { ScrollView, View } from "react-native"

import { Skeleton } from "../Skeleton"

export const LobbySkeleton = () => {
    return (
        <View className="bg-primary flex-1 p-4">
            <ScrollView className="flex-row flex-wrap gap-4 bg-primary">
                {Array.from({ length: 5 }).map((_, index) => (
                <View className="items-center w-24 flex-column gap-y-2 p-2" key={index}>
                    <Skeleton className="h-20 w-20 rounded-full" />
                    <Skeleton className="h-4 w-20 rounded-full" />
                  </View>
                ))}
            </ScrollView>
        </View>
    )
}