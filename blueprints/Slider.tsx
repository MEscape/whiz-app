import React from 'react'
import { View } from 'react-native'

import RNSlider from '@react-native-community/slider'

interface SliderProps {
  value: number
  onValueChange: (value: number) => void
}

export const Slider: React.FC<SliderProps> = ({ onValueChange, value }) => {
  return (
    <View>
      <RNSlider minimumValue={0} maximumValue={100} value={value} onValueChange={onValueChange} />
    </View>
  )
}
