'use client'
import { SIDEBAR_LINKS } from '@/constants'
import { SignedOut } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import { FC, HTMLAttributes } from 'react'
import { LoginBar } from '../LoginBar/LoginBar'
import { Menu } from '../Menu/Menu'

interface SidebarLeftProps extends HTMLAttributes<HTMLDivElement> {
  userSlug?: string
  isAuth: boolean
}

export const SidebarLeft: FC<SidebarLeftProps> = (props) => {
  const { className, userSlug, isAuth } = props
  console.log(' =>>>', isAuth)
  const pathname = usePathname()
  return (
    <aside className={className}>
      <Menu
        isAuth={isAuth}
        menuList={SIDEBAR_LINKS}
        pathname={pathname}
        classLinkText="max-lg:hidden"
        userProfileSlug={userSlug}
      />
      <SignedOut>
        <LoginBar classLinkText="max-lg:hidden" classIcon="lg:hidden" />
      </SignedOut>
    </aside>
  )
}
