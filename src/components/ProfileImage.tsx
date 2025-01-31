import React, { memo, useEffect, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'

import { BottomSheet, BottomSheetOption, Icon, Image, Text } from 'blueprints'

import { EMOJI_INVENTORY } from '@/constants/emojis'
import { pickImage } from '@/util/imagePicker'

interface ProfileImageProps {
  imageUrl?: string
  onPress?: (imageUri: string | null) => void
  showHint?: boolean
  equippedEmojiId?: string | null
}

const ProfileImageComponent: React.FC<ProfileImageProps> = ({
  equippedEmojiId,
  imageUrl,
  onPress,
  showHint,
}) => {
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false)
  const equippedEmoji = EMOJI_INVENTORY.find(e => e.id === equippedEmojiId)

  const handleImagePress = () => {
    if (imageUrl) {
      setIsBottomSheetVisible(true) // Ensure this updates state
    } else {
      handlePickImage()
    }
  }

  const handlePickImage = async () => {
    const imageUri = await pickImage()
    if (imageUri && onPress) {
      onPress(imageUri)
    }
    setIsBottomSheetVisible(false)
  }

  const handleRemoveImage = () => {
    if (onPress) {
      onPress(null)
    }
    setIsBottomSheetVisible(false)
  }

  return (
    <>
      <View className="relative">
        {/* Keep overflow-hidden but emoji outside */}
        <TouchableOpacity
          className="h-20 w-20 bg-secondary rounded-full overflow-hidden items-center justify-center"
          onPress={handleImagePress}>
          {imageUrl ? (
            <Image src={{ uri: imageUrl }} classNameContainer="w-full h-full" />
          ) : (
            <>
              <Icon library="Ionicons" name="person" size={70} color="text-white" />
              {showHint && (
                <View className="absolute inset-0 bg-secondary opacity-50 justify-center items-center">
                  <Icon name="camera" library="Ionicons" color="text-black" size={30} />
                </View>
              )}
            </>
          )}
        </TouchableOpacity>

        {/* Emoji moved outside to prevent clipping */}
        {equippedEmoji && (
          <View className="absolute -bottom-1 -right-1 p-1  rounded-full z-20">
            <Text variant="h1">{equippedEmoji.emoji}</Text>
          </View>
        )}
      </View>

      {/* BottomSheet should now open properly */}
      <BottomSheet
        snapPoints={['25%']}
        isVisible={isBottomSheetVisible}
        onClose={() => setIsBottomSheetVisible(false)}
        title="profile.imageOptions">
        <BottomSheetOption
          label="profile.newImage"
          icon={{ library: 'Ionicons', name: 'camera' }}
          onPress={handlePickImage}
        />
        <BottomSheetOption
          label="profile.removeImage"
          icon={{ library: 'Ionicons', name: 'trash' }}
          onPress={handleRemoveImage}
        />
      </BottomSheet>
    </>
  )
}

const ProfileImage = memo(ProfileImageComponent)
ProfileImage.displayName = 'ProfileImage'

export default ProfileImage
