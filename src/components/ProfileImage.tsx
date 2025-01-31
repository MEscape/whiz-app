import React, { memo, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Icon, Image, Text, BottomSheet, BottomSheetOption } from 'blueprints'
import { EMOJI_INVENTORY } from '@/constants/emojis'
import { pickImage } from '@/util/imagePicker'

interface ProfileImageProps {
  imageUrl?: string
  onPress?: (imageUri: string | null) => void
  showHint?: boolean
  equippedEmojiId?: string | null
}

const ProfileImageComponent: React.FC<ProfileImageProps> = ({ 
  imageUrl, 
  onPress, 
  showHint,
  equippedEmojiId 
}) => {
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false)
  const equippedEmoji = EMOJI_INVENTORY.find(e => e.id === equippedEmojiId)

  const handleImagePress = () => {
    if (imageUrl) {
      setIsBottomSheetVisible(true)
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
        {equippedEmoji && (
          <View className="absolute bottom-0 right-0 bg-secondary/80 rounded-tl-lg p-1">
            <Text variant="body">{equippedEmoji.emoji}</Text>
          </View>
        )}
      </TouchableOpacity>

      <BottomSheet
        isVisible={isBottomSheetVisible}
        onClose={() => setIsBottomSheetVisible(false)}
        title="profile.imageOptions">
        <BottomSheetOption
          label="profile.newImage"
          icon={{ name: "camera", library: "Ionicons" }}
          onPress={handlePickImage}
        />
        <BottomSheetOption
          label="profile.removeImage"
          icon={{ name: "trash", library: "Ionicons" }}
          onPress={handleRemoveImage}
        />
      </BottomSheet>
    </>
  )
}

const ProfileImage = memo(ProfileImageComponent)
ProfileImage.displayName = 'ProfileImage'

export default ProfileImage
