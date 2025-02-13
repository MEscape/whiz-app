import React, { useRef, useState } from 'react'
import { Animated, SafeAreaView, TextInput, TouchableOpacity, View } from 'react-native'

import { Icon, Text, TextField } from 'blueprints'

import { useHeader } from '@/hooks'

import { CollectionCreator, CollectionTabView } from '@/components/collection'
import { useAppContext } from '@/context'

const CollectionScreen = () => {
  const {collectionStore} = useAppContext()

  const [showSearch, setShowSearch] = useState(false)
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false)
  const inputRef = useRef<TextInput>(null)

  const [animation] = useState(new Animated.Value(0))
  const [leftTextAnimation] = useState(new Animated.Value(1))

  const toggleSearch = () => {
    setShowSearch(prev => !prev)
    inputRef.current.focus()
    Animated.parallel([
      Animated.timing(animation, {
        duration: 300,
        toValue: showSearch ? 0 : 1,
        useNativeDriver: false,
      }),
      Animated.timing(leftTextAnimation, {
        duration: 300,
        toValue: showSearch ? 1 : 0,
        useNativeDriver: false,
      }),
    ]).start()
  }

  useHeader(
    {
      LeftActionComponent: (
        <Animated.View
          className="h-14 items-center justify-center"
          style={{
            opacity: leftTextAnimation,
            transform: [
              {
                translateX: leftTextAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-50, 0],
                }),
              },
            ],
          }}>
          <Text tx="tabs.collections" variant="h1" />
        </Animated.View>
      ),
      RightActionComponent: (
        <View className="flex-row w-2/3 h-14 items-center justify-end">
          <Animated.View
            style={{
              opacity: animation,
              width: animation.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '90%'],
              }),
            }}>
            <TextField ref={inputRef} onChangeText={collectionStore.setSearchTerm} variant="underlined" placeholder="Search collections" />
          </Animated.View>
          <Icon name="search" library="Ionicons" className="mt-4 ml-4" onPress={toggleSearch} />
        </View>
      ),
    },
    [showSearch, animation, leftTextAnimation],
  )

  return (
    <>
      <SafeAreaView className="bg-primary flex-1">
        <CollectionTabView />
        <TouchableOpacity
          className="absolute right-5 bottom-20 z-20 w-16 h-16 rounded-full bg-accent flex justify-center items-center"
          onPress={() => setIsBottomSheetVisible(true)}>
          <Icon name="add" library="Ionicons" size={26} />
        </TouchableOpacity>
      </SafeAreaView>

      <CollectionCreator
        isBottomSheetVisible={isBottomSheetVisible}
        setIsBottomSheetVisible={setIsBottomSheetVisible}
      />
    </>
  )
}

export default CollectionScreen
