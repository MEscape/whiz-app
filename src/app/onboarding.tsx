import React, { useRef } from 'react'
import { Animated, FlatList, View, ViewToken } from 'react-native'

import { useNavigation } from 'expo-router'

import {
  GoOnButton,
  OnboardingItem,
  OnboardingItemProps,
  Paginator,
  slides,
} from '@/components/onboarding'

export default function OnboardingScreen() {
  const slidesRef = useRef<FlatList>(null)
  const scrollX = useRef(new Animated.Value(0)).current
  const flatListIndex = useRef(0)
  const navigation = useNavigation()

  const onViewableItemsChanged = ({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems[0].index !== null && viewableItems[0].index !== undefined) {
      flatListIndex.current = viewableItems[0].index
    }
  }

  const scrollTo = () => {
    if (slidesRef.current && flatListIndex.current + 1 < slides.length) {
      slidesRef.current.scrollToIndex({ animated: true, index: flatListIndex.current + 1 })
    } else {
      navigation.navigate('(tabs)')
    }
  }

  const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

  return (
    <View className="flex flex-1 h-full w-full bg-primary">
      <View className="h-3/4">
        <AnimatedFlatList
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={onViewableItemsChanged}
          bounces={false}
          data={slides}
          keyExtractor={(item: OnboardingItemProps) => item.id}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
            useNativeDriver: true,
          })}
          ref={slidesRef}
          scrollEventThrottle={16}
          renderItem={({ item }) => <OnboardingItem item={item} />}
        />
      </View>

      <View className="h-1/4 flex justify-center">
        <Paginator data={slides as OnboardingItemProps[]} scrollX={scrollX} />
        <GoOnButton scrollTo={scrollTo} />
      </View>
    </View>
  )
}
