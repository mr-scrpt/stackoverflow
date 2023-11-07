'use client'
import { FC, HTMLAttributes } from 'react'
import { Menu } from '../Menu/Menu'
import { SIDEBAR_LINKS } from '@/constants'
import { usePathname } from 'next/navigation'
import { LoginBar } from '../LoginBar/LoginBar'
import { cn } from '@/lib/utils'

interface SidebarLeftProps extends HTMLAttributes<HTMLDivElement> {}

export const SidebarLeft: FC<SidebarLeftProps> = (props) => {
  const pathname = usePathname()
  return (
    <div className="bg-light800_dark300 light-border custom-scrollbar sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px] gap-2">
      <Menu
        menuList={SIDEBAR_LINKS}
        pathname={pathname}
        classLinkText="max-lg:hidden"
      />
      <LoginBar classLinkText="max-lg:hidden" classIcon="lg:hidden" />
    </div>
  )
}
