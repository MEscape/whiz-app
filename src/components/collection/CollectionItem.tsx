import React, { memo, useState } from 'react'
import { Pressable, View } from 'react-native'

import { translate, TxKeyPath } from '@/i18n'

import { Icon } from 'blueprints/Icon'
import { Image } from 'blueprints/Image'
import { Text } from 'blueprints/Text'

interface CollectionItemProps {
  name?: string
  nameTx?: TxKeyPath
  created: string
  elements: number
  coverImage: any
}

const baseStyle =
  'bg-secondary mx-7 my-3 flex-row justify-between rounded-md overflow-hidden shadow-md transition-transform duration-100'

const CollectionItem = memo(({ item }: { item: CollectionItemProps }) => {
  const [isAnimating, setIsAnimating] = useState(false)
  const pressedStyle = isAnimating ? 'scale-95' : 'scale-100'

  const combinedClassName = [baseStyle, pressedStyle].filter(Boolean).join(' ')

  const handlePressIn = () => {
    setIsAnimating(true)
  }

  const handlePressOut = () => {
    setTimeout(() => setIsAnimating(false), 50)
  }

  return (
    <Pressable className={combinedClassName} onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <View className="mx-4 my-2 flex justify-between items-start">
        <View>
          <Text variant="h2" className="max-w-48" tx={item?.nameTx} text={item.name} />
          <Text variant="caption" className="text-gray-500">
            {item.created}
          </Text>
        </View>
        <View className="flex items-center mt-2 flex-row">
          <Icon
            className="w-4 h-4 mr-2 text-gray-500"
            name="analytics"
            size={14}
            library="Ionicons"
          />
          <Text className="text-xs" textColor="text-gray-500">
            {item.elements} {translate('common.elements')}
          </Text>
        </View>
      </View>
      <Image classNameContainer="w-36 h-36" src={item.coverImage} />
    </Pressable>
  )
})

CollectionItem.displayName = 'CollectionItem'
export { CollectionItem }
