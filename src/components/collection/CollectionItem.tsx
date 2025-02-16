import React, { memo, useCallback, useState } from 'react'
import { LogBox, Pressable, View } from 'react-native'

import { observer } from 'mobx-react-lite'

import { useAppContext } from '@/context'
import { translate, TxKeyPath } from '@/i18n'

import { Icon } from 'blueprints/Icon'
import { Image } from 'blueprints/Image'
import { Text } from 'blueprints/Text'

LogBox.ignoreAllLogs(true)

export interface CollectionItemProps {
  id: string
  name?: string
  nameTx?: TxKeyPath
  created: string
  elements: number
  image: any
  editable?: boolean
}

const baseStyle =
  'bg-secondary mx-7 my-3 flex-row justify-between rounded-md overflow-hidden shadow-md transition-transform duration-100'

export const CollectionItem = ({ item }: { item: CollectionItemProps }) => {
  const [isAnimating, setIsAnimating] = useState(false)
  const pressedStyle = isAnimating ? 'scale-95' : 'scale-100'
  const { router } = useAppContext()

  const combinedClassName = [baseStyle, pressedStyle].filter(Boolean).join(' ')

  const handlePressIn = () => {
    setIsAnimating(true)
  }

  const handlePressOut = () => {
    setTimeout(() => setIsAnimating(false), 50)
  }

  const handleCollectionPress = useCallback(() => {
    const itemStr = JSON.stringify(item)
    const safeItemStr = encodeURIComponent(itemStr)

    setTimeout(() => {
      router.push({ params: { item: safeItemStr }, pathname: `/library` })
    }, 200)
  }, [item])

  return (
    <Pressable
      className={combinedClassName}
      onPress={handleCollectionPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}>
      <View className="mx-4 my-2 flex justify-between items-start">
        <View>
          <Text variant="h2" className="max-w-48" tx={item?.nameTx} text={item.name} />
          <Text variant="caption" className="text-gray-500">
            {item.created}
          </Text>
        </View>
        <View className="flex items-center mt-2 flex-row">
          <Icon
            className="w-4 h-4 mr-2"
            name="analytics"
            size={14}
            color="text-gray-500"
            library="Ionicons"
          />
          <Text className="text-xs" textColor="text-gray-500">
            {item.elements} {translate('common.elements')}
          </Text>
        </View>
      </View>
      <Image classNameContainer="w-36 h-36" src={item.image} />
    </Pressable>
  )
}
