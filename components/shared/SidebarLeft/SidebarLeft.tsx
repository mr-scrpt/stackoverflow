'use client'
import { FC, HTMLAttributes } from 'react'
import { Menu } from '../Menu/Menu'
import { SIDEBAR_LINKS } from '@/constants'
import { usePathname } from 'next/navigation'
import { LoginBar } from '../LoginBar/LoginBar'
import { SignedOut } from '@clerk/nextjs'

interface SidebarLeftProps extends HTMLAttributes<HTMLDivElement> {}

export const SidebarLeft: FC<SidebarLeftProps> = (props) => {
  const { className } = props
  const pathname = usePathname()
  return (
    <aside className={className}>
      <Menu
        menuList={SIDEBAR_LINKS}
        pathname={pathname}
        classLinkText="max-lg:hidden"
      />
      <SignedOut>
        <LoginBar classLinkText="max-lg:hidden" classIcon="lg:hidden" />
      </SignedOut>
    </aside>
  )
}
