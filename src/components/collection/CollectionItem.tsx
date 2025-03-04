import React, { memo, useCallback, useState } from 'react'
import { LogBox, Pressable, View } from 'react-native'

import { useAppContext } from '@/context'
import { translate, TxKeyPath } from '@/i18n'

import { ImageUris } from 'assets/images'

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

const CollectionItem = memo(({ item }: { item: CollectionItemProps }) => {
  const [isAnimating, setIsAnimating] = useState(false)
  const pressedStyle = isAnimating ? 'scale-95' : 'scale-100'
  const { gameStore, router } = useAppContext()

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
      if (gameStore.collection.currentlySelecting) {
        gameStore.setCollection({
          id: item.id,
          image: item.image,
          name: (translate(item.nameTx) as string) || item.name,
        })
        gameStore.setCurrentlySelecting(false)
        return router.back()
      }
      router.push({ params: { item: safeItemStr }, pathname: `/library` })
    }, 200)
  }, [item, router, gameStore])

  return (
    <Pressable
      className={combinedClassName}
      onPress={handleCollectionPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}>
      <View className="mx-4 my-2 flex justify-between items-start">
        <View>
          <Text variant="h2" className="max-w-48" tx={item?.nameTx} text={item.name} />
          <Text variant="caption" className="text-gray">
            {item.created}
          </Text>
        </View>
        <View className="flex items-center mt-2 flex-row">
          <Icon
            className="w-4 h-4 mr-2"
            name="analytics"
            size={14}
            color="text-gray"
            library="Ionicons"
          />
          <Text className="text-xs" textColor="text-gray">
            {item.elements} {translate('common.elements')}
          </Text>
        </View>
      </View>
      <Image classNameContainer="w-36 h-36" src={ImageUris[item.image] || item.image} />
    </Pressable>
  )
})

CollectionItem.displayName = 'CollectionItem'
export { CollectionItem }
