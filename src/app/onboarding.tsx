import React, { useEffect, useRef, useState } from 'react'
import {
  Animated,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  View,
  ViewToken,
} from 'react-native'

import { observer } from 'mobx-react-lite'

import { isIOS } from '@/constants'
import { useAppContext } from '@/context'

import {
  GoOnButton,
  OnboardingItem,
  OnboardingItemProps,
  Paginator,
  slides,
} from '@/components/onboarding'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

export default observer(function OnboardingScreen() {
  const slidesRef = useRef<FlatList>(null)
  const scrollX = useRef(new Animated.Value(0)).current
  const flatListIndex = useRef(0)
  const { router, userStore } = useAppContext()

  const [keyboardVisible, setKeyboardVisible] = useState(false)

  // Listener for keyboard show and hide
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true)
    })
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false)
    })

    // Clean up listeners on unmount
    return () => {
      keyboardDidShowListener.remove()
      keyboardDidHideListener.remove()
    }
  }, [])

  const onViewableItemsChanged = ({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems[0].index !== null && viewableItems[0].index !== undefined) {
      flatListIndex.current = viewableItems[0].index
      userStore.setIsActive(viewableItems[0].index === 2)
    }
  }

  const scrollTo = () => {
    if (slidesRef.current && flatListIndex.current + 1 < slides.length) {
      slidesRef.current.scrollToIndex({ animated: true, index: flatListIndex.current + 1 })
    } else {
      router.replace('/(tabs)')
    }
  }

  return (
    <SafeAreaView className="flex flex-1 h-full w-full bg-primary">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        keyboardVerticalOffset={100}
        behavior={isIOS ? 'padding' : undefined}>
        <ScrollView
          className="w-full h-3/4"
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}>
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
            removeClippedSubviews={false}
            scrollEventThrottle={16}
            scrollEnabled={userStore.canProceed}
            renderItem={({ item }) => <OnboardingItem item={item} />}
          />
        </ScrollView>

        {!keyboardVisible && (
          <View className="h-1/4 flex justify-center">
            <Paginator data={slides as OnboardingItemProps[]} scrollX={scrollX} />
            <GoOnButton scrollTo={scrollTo} disabled={!userStore.canProceed} />
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
})
