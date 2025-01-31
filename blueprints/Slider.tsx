import React from 'react';
import { Slider as RNSlider } from '@react-native-community/slider';
import { View } from 'react-native';

interface SliderProps {
  value: number;
  onValueChange: (value: number) => void;
}

export const Slider: React.FC<SliderProps> = ({ value, onValueChange }) => {
  return (
    <View>
      <RNSlider
        minimumValue={0}
        maximumValue={100}
        value={value}
        onValueChange={onValueChange}
      />
    </View>
  );
};
