import { Tabs } from 'expo-router';
import React from 'react';
import {BottomTabNavigationOptions} from "@react-navigation/bottom-tabs";
import {Icon, Text} from "blueprints";
import { LinearGradient } from 'expo-linear-gradient'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { blackGradient } from '@/constants'

export default function TabLayout() {
  const { bottom } = useSafeAreaInsets()
  const tabHeight = bottom + 50

  const screenOptions: BottomTabNavigationOptions = {
      headerShown: false,
      tabBarHideOnKeyboard: true,
      tabBarBackground: () => (
        <LinearGradient colors={blackGradient} style={{height: tabHeight + 20}} />
      ),
      tabBarStyle: {
        borderTopWidth: 0,
        height: tabHeight,
        backgroundColor: 'transparent',
        elevation: 0,
        marginBottom: 12,
        position: 'absolute',
      }
  }

  return (
    <Tabs
      screenOptions={screenOptions}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: () => <Text variant="caption" textColor="fixedWhite" tx="tabs.home"></Text>,
          tabBarIcon: ({ color, focused }) =>
            <Icon library="Ionicons" name={focused ? "home" : "home-outline"} color="fixedWhite" />,
        }}
      />
    </Tabs>
  );
}
