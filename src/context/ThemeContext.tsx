import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useColorScheme } from 'react-native'

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

// Helper function to manage theme classes on the root element
const updateThemeClass = (isDarkMode: boolean) => {
    const root = document.documentElement
    if (isDarkMode) {
        root.classList.add('dark')
    } else {
        root.classList.remove('dark')
    }
}

// ThemeProvider Component
export const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const colorScheme = useColorScheme()
    const [isDarkMode, setIsDarkMode] = useState<boolean>(colorScheme === 'dark')

    // Toggle theme and persist to storage
    const toggleTheme = useCallback(async () => {
        const newTheme = !isDarkMode
        await storage.save(StorageKeys.APP_THEME, newTheme)
        setIsDarkMode(newTheme)
        updateThemeClass(newTheme)
    }, [isDarkMode])

    // Memoized context value
    const contextValue = useMemo(() => ({
        isDarkMode,
        toggleTheme,
    }), [isDarkMode, toggleTheme])

    // Load theme from storage or use the system preference
    useEffect(() => {
        const loadTheme = async () => {
            const storedTheme = await storage.load<boolean>(StorageKeys.APP_THEME)
            const initialTheme = (storedTheme !== undefined ? storedTheme : (colorScheme === 'dark')) as boolean
            setIsDarkMode(initialTheme)
            updateThemeClass(initialTheme)
        }
        loadTheme()
    }, [colorScheme, setIsDarkMode])

    // Provide context to children
    return (
      <AppThemeContext.Provider value={contextValue}>
          {children}
      </AppThemeContext.Provider>
    )
}
