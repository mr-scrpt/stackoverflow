import { SignedIn, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { FC, HTMLAttributes } from 'react'
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher'

interface NavbarProps extends HTMLAttributes<HTMLDivElement> {}

export const Navbar: FC<NavbarProps> = (props) => {
  return (
    <nav className="flex-between background-light900_dark200 fixed z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12">
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
      GlobalSearch
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
    </nav>
  )
}