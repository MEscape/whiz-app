import React, { memo, useCallback, useMemo, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'

import { BottomSheet, BottomSheetOption, Icon, Image, Text, TextVariants } from 'blueprints'

import { EMOJI_INVENTORY } from '@/constants/emojis'
import { pickImage } from '@/util/imagePicker'

interface ProfileImageProps {
  imageUrl?: string
  onPress?: (imageUri: string | null) => void
  showHint?: boolean
  equippedEmojiId?: string | null
  disabled?: boolean
  size?: 'small' | 'normal'
}

const sizeChart = {
  normal: {
    box: 'h-20 w-20',
    emoji: 'h1' as TextVariants,
    placeholder: 70,
  },
  small: {
    box: 'h-10 w-10',
    emoji: 'caption' as TextVariants,
    placeholder: 35,
  },
}

const ProfileImageComponent: React.FC<ProfileImageProps> = ({
  disabled,
  equippedEmojiId,
  imageUrl,
  onPress,
  showHint,
  size = 'normal',
}) => {
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false)
  const equippedEmoji = EMOJI_INVENTORY.find(e => e.id === equippedEmojiId)

  const handleImagePress = useCallback(() => {
    if (imageUrl) {
      setIsBottomSheetVisible(true) // Ensure this updates state
    } else {
      handlePickImage()
    }
  }, [imageUrl])

  const handlePickImage = useCallback(async () => {
    const imageUri = await pickImage()
    if (imageUri && onPress) {
      onPress(imageUri)
    }
    setIsBottomSheetVisible(false)
  }, [onPress])

  const handleRemoveImage = useCallback(() => {
    if (onPress) {
      onPress(null)
    }
    setIsBottomSheetVisible(false)
  }, [onPress])

  const ImageContent = useMemo(
    () => (
      <TouchableOpacity
        disabled={disabled}
        className="h-full w-full bg-secondary rounded-full overflow-hidden items-center justify-center"
        onPress={handleImagePress}>
        {imageUrl ? (
          <Image src={{ uri: imageUrl }} classNameContainer="w-full h-full" />
        ) : (
          <>
            <Icon
              library="Ionicons"
              name="person"
              size={sizeChart[size].placeholder}
              color="text-white"
            />
            {showHint && (
              <View className="absolute inset-0 bg-secondary opacity-50 justify-center items-center">
                <Icon name="camera" library="Ionicons" color="text-black" size={30} />
              </View>
            )}
          </>
        )}
      </TouchableOpacity>
    ),
    [imageUrl, handleImagePress, showHint],
  )

  const EmojiContent = useMemo(
    () =>
      equippedEmoji && (
        <View className="absolute -bottom-1 -right-1 p-1  rounded-full z-20">
          <Text variant={sizeChart[size].emoji}>{equippedEmoji.emoji}</Text>
        </View>
      ),
    [equippedEmoji],
  )

  return (
    <>
      <View className={`relative ${sizeChart[size].box}`}>
        {ImageContent}

        {EmojiContent}
      </View>

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
