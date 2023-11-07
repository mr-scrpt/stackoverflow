import { SidebarLink } from '@/types'
import Link from 'next/link'
import { FC, HTMLAttributes } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import { cn } from '@/lib/utils'

interface MenuProps extends HTMLAttributes<HTMLDivElement> {
  menuList: SidebarLink[]
  pathname: string
  classLink?: string
  classLinkText?: string
}

export const Menu: FC<MenuProps> = (props) => {
  const { menuList, pathname, classLink, classLinkText } = props

  const clsLink = cn(
    'flex items-center justify-start gap-4 bg-transparent p-4',
    classLink
  )
  const clsLinkText = classLinkText

  return (
    <nav>
      {menuList.map((item) => {
        // assure the item is correctly selected
        const isActive =
          (pathname.includes(item.route) && item.route.length > 1) ||
          pathname === item.route

        const classLinkComplited = cn(
          clsLink,
          isActive
            ? 'primary-gradient rounded-lg text-light-900'
            : 'text-dark300_light900'
        )

        const classLinkTextComplited = cn(
          clsLinkText,
          isActive ? 'base-bold' : 'base-medium'
        )

        return (
          <Link
            key={item.route}
            href={item.route}
            className={classLinkComplited}
          >
            <Image
              src={item.imgURL}
              alt={item.label}
              width={20}
              height={20}
              className={`${isActive ? '' : 'invert-colors'}`}
            />
            <div className={classLinkTextComplited}>{item.label}</div>
          </Link>
        )
      })}
    </nav>
  )
}
