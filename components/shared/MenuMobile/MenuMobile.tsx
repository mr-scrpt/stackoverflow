'use client'
import { FC, HTMLAttributes } from 'react'
import Image from 'next/image'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import Link from 'next/link'
import { SignedIn, SignedOut } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { SIDEBAR_LINKS } from '@/constants'
import { usePathname } from 'next/navigation'

interface MenuMobileProps extends HTMLAttributes<HTMLDivElement> {}

const NavContent = () => {
  const pathname = usePathname()

  return (
    <section className="flex h-full flex-col gap-4">
      {SIDEBAR_LINKS.map((item) => {
        // assure the item is correctly selected
        const isActive =
          (pathname.includes(item.route) && item.route.length > 1) ||
          pathname === item.route

        return (
          <Link
            key={item.route}
            href={item.route}
            className={`${
              isActive
                ? 'primary-gradient rounded-lg text-light-900'
                : 'text-dark300_light900'
            } flex items-center justify-start gap-4 bg-transparent p-4`}
          >
            <Image
              src={item.imgURL}
              alt={item.label}
              width={20}
              height={20}
              className={`${isActive ? '' : 'invert-colors'}`}
            />
            <div className={`${isActive ? 'base-bold' : 'base-medium'}`}>
              {item.label}
            </div>
          </Link>
        )
      })}
    </section>
  )
}

export const MenuMobile: FC<MenuMobileProps> = (props) => {
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
        className="bg-light900_dark200 border-none flex flex-col gap-8 overflow-y-scroll"
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

        <div className="flex flex-col gap-4 h-full">
          <SheetClose className="outline-none">
            <NavContent />

            {/* only see if user signed out */}
            <SignedOut>
              <div className="flex flex-col gap-3 my-auto">
                <Link href="/sign-in">
                  <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                    <span className="primary-text-gradient">Log In</span>
                  </Button>
                </Link>

                <SheetClose asChild>
                  <Link href="/sign-up">
                    <Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                      Sign Up
                    </Button>
                  </Link>
                </SheetClose>
              </div>
            </SignedOut>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  )
}
