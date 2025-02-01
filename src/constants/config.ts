import Constants from 'expo-constants'

export type ConfigTypes = {
  APP_STORE_URL: string
  PLAY_STORE_URL: string
  SUPPORT_URL: string
}

export const AppConfig: ConfigTypes = {
  APP_STORE_URL: Constants.expoConfig?.extra?.APP_STORE_URL || '',
  PLAY_STORE_URL: Constants.expoConfig?.extra?.PLAY_STORE_URL || '',
  SUPPORT_URL: Constants.expoConfig?.extra?.SUPPORT_URL || '',
}
