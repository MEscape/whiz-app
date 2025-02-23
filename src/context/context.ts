import { useRouter } from 'expo-router'

import { useStores } from '@/models'
import * as service from '@/services'

import { useLanguage } from './LocalizationContext'
import { useTheme } from './ThemeContext'

export const useAppContext = () => {
  const theme = useTheme()
  const language = useLanguage()
  const stores = useStores()
  const router = useRouter()

  return {
    ...stores,
    ...theme,
    ...language,
    ...service,
    router,
  }
}

export type AppContextType = ReturnType<typeof useAppContext>
