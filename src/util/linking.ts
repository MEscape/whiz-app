import { Linking } from 'react-native'

import { showErrorToast } from '@/util/toast'

export const openLink = (url: string) => {
  Linking.openURL(url).catch(() => showErrorToast('error.openLink'))
}
