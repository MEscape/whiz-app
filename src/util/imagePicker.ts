import * as ImagePicker from 'expo-image-picker'

import { showErrorToast } from '@/util'

/**
 * Function to pick an image from the device's library or camera.
 * @returns {Promise<string | null>} - Returns the image URI if successful, null otherwise.
 */
export const pickImage = async (): Promise<string | null> => {
  // Request permissions for accessing the camera and media library
  const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

  if (!permissionResult.granted) {
    showErrorToast('permissions.chosePhoto')
    return null
  }

  // Launch the image picker
  const result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 1,
  })

  // Check if the user canceled the picker
  if (result.canceled) {
    return null
  }

  // Return the selected image URI
  return result.assets[0].uri
}
