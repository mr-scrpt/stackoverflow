'use client'
import { useTheme } from '@/contexts/ThemeProvider'
import { FC, HTMLAttributes } from 'react'

interface ThemeSwitcherProps extends HTMLAttributes<HTMLDivElement> {}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = (props) => {
  const { mode, setMode } = useTheme()
  return <div>ThemeSwitcher</div>
}
