import React from 'react'
import { TouchableOpacity, View } from 'react-native'

import { Icon, Image } from 'blueprints'

interface ProfileImageProps {
  imageUrl?: string
  onPress?: () => void
  showHint?: boolean
}

const ProfileImage: React.FC<ProfileImageProps> = ({ imageUrl, onPress, showHint }) => {
  return (
    <TouchableOpacity
      className="h-20 w-20 bg-secondary rounded-full overflow-hidden items-center justify-center"
      onPress={onPress}>
      {imageUrl ? (
        <Image src={imageUrl} classNameContainer="w-full h-full" />
      ) : (
        <>
          <Icon library="Ionicons" name="person" size={70} color="text-white" />
          {showHint && (
            <View className="absolute inset-0 bg-black opacity-50 justify-center items-center">
              <Icon name="camera" library="Ionicons" color="text-black" size={30} />
            </View>
          )}
        </>
      )}
    </TouchableOpacity>
  )
}

export default ProfileImage
