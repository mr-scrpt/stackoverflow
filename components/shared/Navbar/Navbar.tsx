'use client'
import { SignedIn, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { FC, HTMLAttributes } from 'react'
import { MenuMobile } from '../MenuMobile/MenuMobile'
import { SearchGlobal } from '../SearchGlobal/SearchGlobal'
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher'

interface NavbarProps extends HTMLAttributes<HTMLDivElement> {}

export const Navbar: FC<NavbarProps> = (props) => {
  return (
    <nav className="flex-between bg-light800_dark300 fixed z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12">
      <Link className="flex items-center gap-2" href="/">
        <Image
          src={'/assets/images/site-logo.svg'}
          width={25}
          height={25}
          alt="DevFlow"
          className="min-w-[25px]"
        />
        <span className="h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900">
          Dev
          <span className="text-primary-500">Overflow</span>
        </span>
      </Link>
      <SearchGlobal />
      <div className="flex-between gap-5 mr-0 ml-auto">
        <ThemeSwitcher />
      </div>
      <SignedIn>
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: { avatarBox: 'h-10 w-10' },
            variables: {
              colorPrimary: '#ff7000',
            },
          }}
        />
      </SignedIn>
      <MenuMobile />
    </nav>
  )
}
