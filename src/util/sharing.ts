import { Share } from 'react-native'

import { AppConfig, isIOS } from '@/constants'
import { translate } from '@/i18n'
import * as storage from '@/storage'
import { StorageKeys } from '@/storage'

export const shareApp = async () => {
  try {
    const result = await Share.share({
      message: `${translate('whiz.share')} ${isIOS ? AppConfig.APP_STORE_URL : AppConfig.PLAY_STORE_URL}`,
    })

    if (result.action === Share.sharedAction) {
      console.log(result)
      storage.save(StorageKeys.ALREADY_SHARED, { success: true })
      return true
    } else if (result.action === Share.dismissedAction) {
      return false
    }
  } catch (e) {
    return false
  }
}

export const checkShared = async () => {
  const shared = (await storage.load(StorageKeys.ALREADY_SHARED)) as { success?: boolean } | null
  return shared?.success
}
