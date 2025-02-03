import React, { useCallback, useEffect, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'

import { Button, Icon, Image } from 'blueprints'

import { TxKeyPath } from '@/i18n'
import { pickImage } from '@/util'

import { BottomSheet, BottomSheetInput } from 'blueprints/BottomSheet'

interface CollectionCreatorProps {
  isBottomSheetVisible: boolean
  setIsBottomSheetVisible: (visible: boolean) => void
}

export const CollectionCreator = ({
  isBottomSheetVisible,
  setIsBottomSheetVisible,
}: CollectionCreatorProps) => {
  const [formData, setFormData] = useState({ img: null, name: '' })
  const [error, setError] = useState<TxKeyPath | null>(null)

  const handleChoseImage = async () => {
    const img = await pickImage()
    if (img) {
      setFormData(prev => ({
        img,
        name: prev.name,
      }))
    }
  }

  const handleChoseName = useCallback((name: string) => {
    setFormData(prev => ({ ...prev, name }))
  }, [])

  const handleModalClose = () => {
    setIsBottomSheetVisible(false)
    setError(null)
    setFormData({ img: null, name: '' })
  }

  const handleOnEndEditing = () => {
    if (formData.name.trim().length < 4) {
      return setError('error.username.less')
    }
  }

  return (
    <BottomSheet
      snapPoints={['40%']}
      isVisible={isBottomSheetVisible}
      onClose={handleModalClose}
      title="collection.create">
      <View className="flex-1 p-3">
        <TouchableOpacity
          className="w-full h-36 bg-accent rounded-md overflow-hidden mb-1"
          onPress={handleChoseImage}>
          <Image src={formData.img} className="w-full h-full" />
          {!formData.img && (
            <View className="absolute inset-0 bg-secondary opacity-50 justify-center items-center">
              <Icon name="camera" library="Ionicons" color="text-black" size={30} />
            </View>
          )}
        </TouchableOpacity>
        <BottomSheetInput
          placeholderTx="placeholder.collectionName"
          iconLeft="library"
          onChangeText={handleChoseName}
          maxLength={15}
          className="w-full"
          value={formData.name}
          errorTx={error}
          onEndEditing={handleOnEndEditing}
        />
        <Button
          tx="common.create"
          disabled={formData.name.trim().length < 4}
          className="h-12 mb-4"
        />
      </View>
    </BottomSheet>
  )
}
