import React from 'react';
import { Switch as RNswitch, View } from 'react-native';

interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
}

export const Switch: React.FC<SwitchProps> = ({ value, onValueChange }) => {
  return (
    <View>
      <RNswitch value={value} onValueChange={onValueChange} />
    </View>
  );
};
