import * as ImagePicker from 'expo-image-picker'
import RNFS from 'react-native-fs';

import { showErrorToast } from './toast'

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

export const base64ToImage = async (base64Data: string): Promise<string> => {
  try {
    // Create a unique filename using timestamp
    const filename = `${Date.now()}.jpg`;
    
    // Get the cache directory path
    const filepath = `${RNFS.CachesDirectoryPath}/${filename}`;
    
    // Write the base64 data to a file
    await RNFS.writeFile(filepath, base64Data, 'base64');
    
    return `file://${filepath}`;
  } catch (error) {
    console.error('Error converting base64 to image:', error);
    throw error;
  }
};