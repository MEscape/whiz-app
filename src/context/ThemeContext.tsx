import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { View } from 'react-native'

import { useColorScheme } from 'nativewind'

import { themes } from '@/constants'
import { StorageKeys } from '@/storage'
import * as storage from '@/storage'

// Define the context type
export interface AppThemeContextType {
  isDarkMode: boolean
  toggleTheme: () => void
}

// Create the context
export const AppThemeContext = createContext<AppThemeContextType | undefined>(undefined)

// Custom hook to access the theme context
export const useTheme = (): AppThemeContextType => {
  const context = useContext(AppThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within AppThemeContext.Provider')
  }
  return context
}

// ThemeProvider Component
export const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { colorScheme, setColorScheme } = useColorScheme()
  const [isDarkMode, setIsDarkMode] = useState<boolean>(colorScheme === 'dark')

  // Toggle theme and persist to storage
  const toggleTheme = useCallback(async () => {
    const newTheme = !isDarkMode
    setIsDarkMode(newTheme)
    setColorScheme(newTheme ? 'dark' : 'light')
    await storage.save(StorageKeys.APP_THEME, newTheme)
  }, [isDarkMode, setColorScheme])

  // Memoized context value
  const contextValue = useMemo(
    () => ({
      isDarkMode,
      toggleTheme,
    }),
    [isDarkMode, toggleTheme],
  )

  // Load theme from storage or use the system preference
  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await storage.load(StorageKeys.APP_THEME)
      if (storedTheme !== null) {
        setIsDarkMode(storedTheme as boolean)
        setColorScheme(storedTheme ? 'dark' : 'light')
      } else {
        const systemPrefersDark = colorScheme === 'dark'
        setIsDarkMode(systemPrefersDark)
        setColorScheme(systemPrefersDark ? 'dark' : 'light')
      }
    }
    loadTheme()
  }, [colorScheme])

  // Provide context to children
  return (
    <AppThemeContext.Provider value={contextValue}>
      <View style={themes[colorScheme]} className="flex-1">
        {children}
      </View>
    </AppThemeContext.Provider>
  )
}
