import { useStores } from '@/models'

import { useLanguage } from './LocalizationContext'
import { useTheme } from './ThemeContext'

export const useAppContext = () => {
  const theme = useTheme()
  const language = useLanguage()
  const stores = useStores()

  return {
    ...stores,
    ...theme,
    ...language,
  }
}

export type AppContextType = ReturnType<typeof useAppContext>