import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

import { ContentLanguage, i18n } from '@/i18n'
import { StorageKeys } from '@/storage'
import * as storage from '@/storage'

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
  const [language, setLanguage] = useState<ContentLanguage>(ContentLanguage.English)

  // Set Language and persist to storage
  const setAppLanguage = useCallback(async (newLanguage: ContentLanguage) => {
    await storage.save(StorageKeys.APP_LANGUAGE, newLanguage)
    i18n.locale = newLanguage
    setLanguage(newLanguage)
  }, [setLanguage])

  // Memoized context value
  const contextValue: LocalizationAppContextType = useMemo(() => ({
      language,
      setAppLanguage,
  }), [language, setAppLanguage])

  // Load language from storage
  useEffect(() => {
    const loadLanguage = async () => {
        const storedLanguage = await storage.load<ContentLanguage>(StorageKeys.APP_LANGUAGE) as ContentLanguage
        if (storedLanguage) await setAppLanguage(storedLanguage)
    }
    loadLanguage()
  }, [setLanguage, setAppLanguage])

  return <LocalizationAppContext.Provider value={contextValue}>{children}</LocalizationAppContext.Provider>
}