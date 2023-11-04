'use client'
import {
  FC,
  HTMLAttributes,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

interface ThemeProviderProps extends HTMLAttributes<HTMLElement> {}

interface ThemeContextType {
  mode: string
  setMode: (mode: string) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState('')

  const handleThemeChange = useCallback(() => {
    if (mode === 'dark') {
      setMode('light')
      document.documentElement.classList.add('light')
    } else {
      setMode('dark')
      document.documentElement.classList.add('dark')
    }
  }, [mode])

  useEffect(() => {
    handleThemeChange()
  }, [mode, handleThemeChange])

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider')
}
