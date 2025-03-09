import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

import * as Localization from 'expo-localization'

import { ContentLanguage, i18n } from '@/i18n'
import * as storage from '@/storage'
import { StorageKeys } from '@/storage'

export type LocalizationAppContextType = {
  language: ContentLanguage
  setAppLanguage: (newLanguage: ContentLanguage) => void
}

// Create the context
export const LocalizationAppContext = createContext<LocalizationAppContextType | undefined>(
  undefined,
)

// Custom hook to access the language context
export const useLanguage = () => {
  const context = useContext(LocalizationAppContext)
  if (!context) throw Error('useLanguage must be used inside LocalizationAppContext')
  return context
}

// LocalizationProvider Component
export const LocalizationProvider = ({ children }: React.PropsWithChildren) => {
  const [language, setLanguage] = useState<ContentLanguage>(
    (Localization.getLocales()[0]?.languageTag.split('-')[0] as ContentLanguage) ||
      ContentLanguage.English,
  )

  // Set Language and persist to storage
  const setAppLanguage = useCallback(
    async (newLanguage: ContentLanguage) => {
      await storage.save(StorageKeys.APP_LANGUAGE, newLanguage)
      i18n.locale = newLanguage
      setLanguage(newLanguage)
    },
    [setLanguage],
  )

  // Memoized context value
  const contextValue: LocalizationAppContextType = useMemo(
    () => ({
      language,
      setAppLanguage,
    }),
    [language, setAppLanguage],
  )

  // Load language from storage
  useEffect(() => {
    const loadLanguage = async () => {
      const storedLanguage = (await storage.load(StorageKeys.APP_LANGUAGE)) as ContentLanguage
      if (storedLanguage) await setAppLanguage(storedLanguage)
    }
    loadLanguage()
  }, [setAppLanguage])

  return (
    <LocalizationAppContext.Provider value={contextValue}>
      {children}
    </LocalizationAppContext.Provider>
  )
}
