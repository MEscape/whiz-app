import React, { useMemo } from 'react'
import { View } from 'react-native'

import RNSlider from '@react-native-community/slider'
import { cssInterop } from 'nativewind'

import { useAppContext } from '@/context'

interface SliderProps {
  value: number
  onValueChange: (value: number) => void
  minimumValue?: number
  maximumValue?: number
  updateTrigger: any
}

export const Slider: React.FC<SliderProps> = ({
  maximumValue = 1,
  minimumValue = 0,
  onValueChange,
  updateTrigger,
  value,
}) => {
  const { isDarkMode } = useAppContext()
  const secondary = isDarkMode ? '#2d2c2c' : '#e7e3e3'

  cssInterop(RNSlider, { className: 'style' })

  const sliderComponent = useMemo(
    () => (
      <RNSlider
        className="h-6"
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        value={value}
        onValueChange={onValueChange}
        minimumTrackTintColor="#62a399"
        maximumTrackTintColor={secondary}
        thumbTintColor="#62a399"
      />
    ),
    [updateTrigger, secondary],
  )

  return <View className="flex-1 py-1">{sliderComponent}</View>
}
