import React, { useState } from 'react'

import { BottomSheet, BottomSheetOption } from 'blueprints/BottomSheet'
import { Text } from 'blueprints/Text'

export const BottomInfo = () => {
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false)

  return (
    <>
      <Text
        tx="info.symbols"
        className="underline bottom-0 w-full my-4"
        textAlign="center"
        textColor="text-accent"
        onPress={() => setIsBottomSheetVisible(true)}
      />
      <BottomSheet
        snapPoints={['30%']}
        isVisible={isBottomSheetVisible}
        onClose={() => setIsBottomSheetVisible(false)}
        title="info.symbols">
        <BottomSheetOption
          label="info.symbol.album"
          icon={{ library: 'Ionicons', name: 'albums' }}
        />
        <BottomSheetOption
          label="info.symbol.analytic"
          icon={{ library: 'Ionicons', name: 'analytics' }}
        />
        <BottomSheetOption
          label="info.symbol.chatbubble"
          icon={{ library: 'Ionicons', name: 'chatbubbles' }}
        />
        <BottomSheetOption
          label="info.symbol.clipboard"
          icon={{ library: 'Ionicons', name: 'clipboard' }}
        />
      </BottomSheet>
    </>
  )
}
