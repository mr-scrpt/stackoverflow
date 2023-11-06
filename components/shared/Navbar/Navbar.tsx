import { SignedIn, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { FC, HTMLAttributes } from 'react'
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher'
import { MenuMobile } from '../MenuMobile/MenuMobile'
import { SearchGlobal } from '../SearchGlobal/SearchGlobal'

interface NavbarProps extends HTMLAttributes<HTMLDivElement> {}

export const Navbar: FC<NavbarProps> = (props) => {
  return (
    <nav className="flex-between bg-light800_dark300 fixed z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12">
      <Link className="flex items-center gap-2" href="/">
        <Image
          src={'/assets/images/site-logo.svg'}
          width={23}
          height={23}
          alt="DevFlow"
        />
        <span className="h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900 max-sm:hidden">
          Dev
          <span className="text-primary-500">Overflow</span>
        </span>
      </Link>
      {/* <div className="flex grow text-light-500"> */}
      <SearchGlobal />
      {/* </div> */}
      <div className="flex-between gap-5">
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
