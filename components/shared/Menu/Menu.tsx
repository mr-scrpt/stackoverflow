'use client'
import { PROFILE_LINK } from '@/constants'
import { SidebarLink } from '@/types'
import { SignedIn } from '@clerk/nextjs'
import { FC, HTMLAttributes } from 'react'
import { MenuLink } from './MenuLink'

interface MenuProps extends HTMLAttributes<HTMLDivElement> {
  menuList: SidebarLink[]
  pathname: string
  classLink?: string
  classLinkText?: string
  userProfileSlug?: string
}

export const Menu: FC<MenuProps> = (props) => {
  const {
    menuList,
    pathname,
    classLink,
    classLinkText,
    userProfileSlug,
    ...rest
  } = props

  console.log(' =>>>', PROFILE_LINK.route.startsWith(pathname))
  console.log(' =>>> pathname', pathname)
  console.log(' =>>> PROFILE_LINK', PROFILE_LINK.route)

  return (
    <nav {...rest} className="flex h-full flex-col">
      {menuList.map((item) => {
        // assure the item is correctly selected
        // console.log(' =>>> route', item.route)
        // console.log(' =>>> pathname', pathname)
        // console.log(' =>>> startsWith', item.route.startsWith(pathname))
        // const isActive =
        //   (pathname.includes(item.route) && item.route.length > 1) ||
        //   item.route.startsWith(pathname)
        // pathname === item.route
        const isActive =
          (item.route === '/' && pathname === '/') ||
          (pathname !== '/' &&
            item.route !== '/' &&
            pathname.startsWith(item.route))

        if (item.route === '/profile') {
          if (userProfileSlug) {
            item.route = `${item.route}/${userProfileSlug}`
          }
          return null
        }

        return (
          <MenuLink
            key={item.label}
            isActive={isActive}
            href={item.route}
            lable={item.label}
            imgSrc={item.imgURL}
          />
        )
      })}
      <SignedIn>
        <MenuLink
          isActive={pathname.startsWith(PROFILE_LINK.route)}
          href={`${PROFILE_LINK.route}/${userProfileSlug}`}
          lable={PROFILE_LINK.label}
          imgSrc={PROFILE_LINK.imgURL}
        />
      </SignedIn>
    </nav>
  )
}

// <Link
//   key={item.route}
//   href={item.route}
//   className={classLinkComplited}
// >
//   <Image
//     src={item.imgURL}
//     alt={item.label}
//     width={20}
//     height={20}
//     className={`${isActive ? '' : 'invert-colors'}`}
//   />
//   <div className={classLinkTextComplited}>{item.label}</div>
// </Link>
