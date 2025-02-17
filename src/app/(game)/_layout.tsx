import React from 'react'

import { Stack } from 'expo-router'

export default function GameLayout() {
  return (
    <Stack>
        <Stack.Screen name="lobby" />
    </Stack>
  )
}
