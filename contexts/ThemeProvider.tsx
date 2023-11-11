'use client'

import { THEME_DARK, THEME_LIGHT, THEME_SYSTEM } from '@/constants'
import React, { createContext, useContext, useState, useEffect } from 'react'

interface ThemeContextType {
  mode: string
  setMode: (mode: string) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState('')

  const handleThemeChange = () => {
    const themeLocal = localStorage.getItem('theme')
    const themeDefaultIsDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches

    const setTheme = (theme: string) => {
      setMode(theme)
      document.documentElement.classList.remove(THEME_LIGHT, THEME_DARK)
      document.documentElement.classList.add(theme)
    }

    if (!themeLocal) {
      const theme = themeDefaultIsDark ? THEME_DARK : THEME_LIGHT
      setTheme(theme)
    } else if (themeLocal !== THEME_SYSTEM) {
      setTheme(themeLocal)
    } else {
      setTheme(themeDefaultIsDark ? THEME_DARK : THEME_LIGHT)
    }
  }

  useEffect(() => {
    handleThemeChange()
  }, [mode])

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default function useTheme() {
  const context = useContext(ThemeContext)

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
}
