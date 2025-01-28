import { StorageKeys } from '@/storage'
import * as storage from '@/storage'

export const checkFirstAppLaunch = async () => {
  const firstLaunch = await storage.load(StorageKeys.FIRST_LAUNCH)

  if (firstLaunch === null) {
    await storage.save(StorageKeys.FIRST_LAUNCH, true)
    return true
  }

  return false
}
