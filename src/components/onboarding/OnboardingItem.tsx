import React from 'react'
import { useWindowDimensions, View } from 'react-native'

import { TxKeyPath } from '@/i18n'

import { Image, ImageSrc, Text } from '@/blueprints/index'

export interface OnboardingItemProps {
  id: string
  title: TxKeyPath
  description: TxKeyPath
  image: ImageSrc | any
}

export function OnboardingItem({ item }: { item: OnboardingItemProps }) {
  const { width } = useWindowDimensions()

  return (
    <View className="items-center justify-center px-5 py-10" style={{ width }}>
      <Image classNameContainer="w-full h-64 mt-20" src={item.image} contentFit="contain" />
      <View className="flex flex-1 items-center justify-center px-5 py-10">
        <Text variant="h1" textAlign="center" tx={item.title} />
        <Text variant="h3" textAlign="center" tx={item.description} />
      </View>
    </View>
  )
}
