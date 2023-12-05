import Link from 'next/link'
import Image from 'next/image'
import { FC, HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface MenuLinkProps extends HTMLAttributes<HTMLLinkElement> {
  href: string
  lable: string
  imgSrc: string
  isActive: boolean
}

export const MenuLink: FC<MenuLinkProps> = (props) => {
  const { href, imgSrc, lable, isActive } = props
  const classLinkComplited = cn(
    'flex items-center justify-start gap-4 bg-transparent p-4',
    {
      'primary-gradient rounded-lg text-light-900': isActive,
      'text-dark300_light900': !isActive,
    }
  )

  const classLinkTextComplited = cn('sm:hidden lg:flex', {
    'base-bold': isActive,
    'base-medium': !isActive,
  })
  return (
    <Link href={href} className={classLinkComplited}>
      <Image
        src={imgSrc}
        alt={lable}
        width={20}
        height={20}
        className={`${isActive ? '' : 'invert-colors'} h-[20px] w-[20px]`}
      />
      <div className={classLinkTextComplited}>{lable}</div>
    </Link>
  )
}
