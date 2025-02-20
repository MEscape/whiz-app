import React, { forwardRef } from 'react'
import { Animated, TextInput, View } from 'react-native'

import { Icon, TextField } from 'blueprints'

interface SearchProps {
  toggleSearch?: () => void
  onChangeText?: (text: string) => void
  animation?: Animated.Value
}

const Search = forwardRef<TextInput, SearchProps>(
  ({ animation, onChangeText, toggleSearch }, inputRef) => {
    return (
      <View className="flex-row w-2/3 h-14 items-center justify-end">
        <Animated.View
          style={{
            opacity: animation,
            width: animation.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '90%'],
            }),
          }}>
          <TextField
            ref={inputRef}
            onChangeText={onChangeText}
            variant="underlined"
            placeholderTx="placeholder.search"
          />
        </Animated.View>
        <Icon name="search" library="Ionicons" className="mt-4 ml-4" onPress={toggleSearch} />
      </View>
    )
  },
)

Search.displayName = 'Search'
export { Search }
