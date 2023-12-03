'use client'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import { SIDEBAR_LINKS } from '@/constants'
import { SignedOut } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC, HTMLAttributes } from 'react'
import { LoginBar } from '../LoginBar/LoginBar'
import { Menu } from '../Menu/Menu'

interface MenuMobileProps extends HTMLAttributes<HTMLDivElement> {}

export const MenuMobile: FC<MenuMobileProps> = (props) => {
  const pathname = usePathname()
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src="/assets/icons/hamburger.svg"
          width={16}
          height={16}
          alt="menu"
          className="invert-colors sm:hidden"
        />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="bg-light900_dark200 custom-scrollbar flex flex-col gap-8 overflow-y-auto border-none"
      >
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/assets/images/site-logo.svg"
            width={23}
            height={23}
            alt="DevFlow"
          />
          <p className="h2-bold text-dark100_light900 font-spaceGrotesk">
            Dev
            <span className="text-primary-500">Overflow</span>
          </p>
        </Link>

        <div className="flex h-full flex-col gap-4">
          <SheetClose className="outline-none">
            <div className="flex h-full flex-col gap-4">
              <Menu menuList={SIDEBAR_LINKS} pathname={pathname} />
            </div>

            {/* only see if user signed out */}
            <SignedOut>
              <div className="my-auto flex flex-col gap-3">
                <SheetClose asChild>
                  <LoginBar classIcon="hidden" />
                </SheetClose>
              </div>
            </SignedOut>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  )
}
