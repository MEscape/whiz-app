import React from 'react'
import { TouchableOpacity, View } from 'react-native'

import { Icon, Image, Text } from 'blueprints'
import { observer } from 'mobx-react-lite'

import { Editor } from '@/components'
import { useAppContext } from '@/context'
import { translate } from '@/i18n'
import { pickImage } from '@/util'

import { CollectionItemProps, FormData } from '@/components/collection'

export const TaskHeader = observer(({ item }: { item: CollectionItemProps }) => {
  const { collectionStore } = useAppContext()

  const [formData, setFormData] = React.useState<FormData>({
    img: item.image,
    name: (translate(item.nameTx) || item.name) as string,
  })

  const handleSaveCollectionName = (name: string) => {
    collectionStore.updateCollection(item.id, { ...formData, name })
    setFormData(prev => ({ ...prev, name }))
  }

  const handlePickImage = async () => {
    const img = await pickImage()
    collectionStore.updateCollection(item.id, { ...formData, img })
    setFormData(prev => ({ ...prev, img }))
  }

  return (
    <View className="h-32 w-full flex-row gap-x-3">
      <TouchableOpacity onPress={handlePickImage} disabled={item.editable === false}>
        <Image src={formData.img} classNameContainer="w-32 h-32 rounded-md overflow-hidden" />
        {!formData.img && (
          <View className="absolute inset-0 bg-secondary opacity-50 justify-center items-center">
            <Icon name="camera" library="Ionicons" color="text-black" size={30} />
          </View>
        )}
      </TouchableOpacity>
      <View className="flex-1 justify-between">
        <View className="h-12">
          <Editor
            placeholderTx="placeholder.collectionName"
            maxLength={15}
            name={formData.name}
            editable={item.editable !== false}
            onSave={handleSaveCollectionName}
          />
        </View>
        <View className="flex-row">
          <Icon
            className="w-4 h-4 mr-2"
            name="analytics"
            size={14}
            color="text-gray"
            library="Ionicons"
          />
          <Text className="text-xs" textColor="text-gray">
            {collectionStore.getCollection(item.id)?.elements || item.elements}{' '}
            {translate('common.elements')} • {item.created}
          </Text>
        </View>
      </View>
    </View>
  )
})
