import React, { useRef, useState } from 'react'
import { Animated, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'

import { Icon, Text } from 'blueprints'

import { Search } from '@/components'
import { useAppContext } from '@/context'
import { useHeader } from '@/hooks'

import { CollectionCreator, CollectionTabView } from '@/components/collection'

const CollectionScreen = () => {
  const { collectionStore } = useAppContext()

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
        <Search
          toggleSearch={toggleSearch}
          onChangeText={collectionStore.setSearchTerm}
          animation={animation}
          ref={inputRef}
        />
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
