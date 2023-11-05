'use client'
import Image from 'next/image'
import { FC, HTMLAttributes } from 'react'

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar'
import useTheme from '@/contexts/ThemeProvider'

import { THEME_LIST } from '@/constants'

interface ThemeSwitcherProps extends HTMLAttributes<HTMLDivElement> {}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = (props) => {
  const { mode, setMode } = useTheme()
  return (
    <Menubar className="relative border-none bg-transparent shadow-none">
      <MenubarMenu>
        <MenubarTrigger className="focus:bg-light-900 data-[state=open]:bg-light-900 dark:focus:bg-dark-200 dark:data-[state=open]:bg-dark-200">
          {mode === 'light' ? (
            <Image
              src="/assets/icons/sun.svg"
              alt="sun"
              width={20}
              height={20}
              className="active-theme"
            />
          ) : (
            <Image
              src="/assets/icons/moon.svg"
              alt="moon"
              width={20}
              height={20}
              className="active-theme"
            />
          )}
        </MenubarTrigger>
        <MenubarContent className="absolute right-[-3rem] mt-3 min-w-[120px] rounded border py-2 dark:border-dark-400 dark:bg-dark-300">
          {THEME_LIST.map((item) => {
            return (
              <MenubarItem
                key={item.value}
                className="flex items-center gap-4 px-2.5 py-2 dark:focus:bg-dark-400"
                onClick={() => {
                  setMode(item.value)

                  if (mode !== 'system') {
                    localStorage.theme = item.value
                  } else {
                    localStorage.removeItem('theme')
                  }
                }}
              >
                <Image
                  src={item.icon}
                  alt={item.value}
                  width={16}
                  height={16}
                  className={`${mode === item.value && 'active-theme'}`}
                />
                <p
                  className={`body-semibold text-light-500 ${
                    mode === item.value
                      ? 'text-primary-500'
                      : 'text-dark100_light900'
                  }`}
                >
                  {item.name}
                </p>
              </MenubarItem>
            )
          })}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
