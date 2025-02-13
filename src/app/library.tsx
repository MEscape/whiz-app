import React from 'react'
import { SafeAreaView, TouchableOpacity, View } from 'react-native'

import { FlashList } from '@shopify/flash-list'
import { useLocalSearchParams } from 'expo-router'
import { cssInterop } from 'nativewind'

import { Editor } from '@/components'
import { useAppContext } from '@/context'
import { useHeader } from '@/hooks'
import { translate } from '@/i18n'
import { pickImage } from '@/util'

import { Icon } from 'blueprints/Icon'
import { Image } from 'blueprints/Image'
import { Text } from 'blueprints/Text'

import { FormData } from '@/components/collection'

interface CollectionItemProps {
  id: string
  name?: string
  created: string
  elements: number
  image: any
  editable?: boolean
}

const LibraryItem = ({ item }) => {
  return (
    <View className="flex-row px-1 py-5 justify-between items-center">
      <Text text={item.name} />
      <Icon name="chevron-up" library="Ionicons" color="text-secondary" />
    </View>
  )
}

const LibraryScreen = () => {
  const params = useLocalSearchParams()
  const {collectionStore, router} = useAppContext()

  const [formData, setFormData] = React.useState<FormData>({img: params.image, name: translate(params.nameTx) || params.name})

  const data: CollectionItemProps[] = [
    { created: '2024-02-12', elements: 5, id: '1', image: params.image, name: 'Example 1' },
    { created: '2024-02-11', elements: 3, id: '2', image: params.image, name: 'Example 2' },
  ]

  cssInterop(FlashList, { className: 'style' })

  useHeader(
    {
      leftIcon: 'arrow-back',
      leftIconLibrary: 'Ionicons',
      onLeftPress: router.back,
    },
    [router],
  )

  const handleSaveCollectionName = (name: string) => {
    collectionStore.updateCollection(params.id, {...formData, name})
    setFormData(prev => ({...prev, name}))
  }

  const handlePickImage = async () => {
    const img = await pickImage()
    collectionStore.updateCollection(params.id, {...formData, img})
    setFormData(prev => ({...prev, img}))
  }

  console.log('LibraryScreen', params, formData)

  return (
    <SafeAreaView className="flex-1 bg-primary px-4 py-2">
      <View className="h-32 w-full flex-row gap-x-3">
        <TouchableOpacity onPress={handlePickImage} disabled={params.editable === false}>
          <Image
            src={formData.img}
            classNameContainer="w-32 h-32 rounded-md overflow-hidden"
          />
          {!params.image && (
            <View className="absolute inset-0 bg-secondary opacity-50 justify-center items-center">
              <Icon name="camera" library="Ionicons" color="text-black" size={30} />
            </View>
          )}
        </TouchableOpacity>
        <View>
          <View className='h-8'>
            <Editor 
              placeholderTx="placeholder.collectionName" 
              maxLength={15} 
              name={formData.name} 
              editable={params.editable === false}
              onSave={handleSaveCollectionName} 
            />
          </View>
          <View className="flex-row">
            <Icon
              className="w-4 h-4 mr-2"
              name="analytics"
              size={14}
              color="text-gray-500"
              library="Ionicons"
            />
            <Text className="text-xs" textColor="text-gray-500">
              {params.elements} {translate('common.elements')}
            </Text>
          </View>
        </View>
      </View>
      <FlashList
        contentContainerStyle={{ paddingVertical: 20 }}
        data={data}
        renderItem={LibraryItem}
      />
    </SafeAreaView>
  )
}

export default LibraryScreen
