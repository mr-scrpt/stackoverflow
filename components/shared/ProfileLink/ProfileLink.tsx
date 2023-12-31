import { FC, HTMLAttributes } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface ProfileLinkProps extends HTMLAttributes<HTMLDivElement> {
  imgUrl: string
  href?: string
  title: string
}

export const ProfileLink: FC<ProfileLinkProps> = (props) => {
  const { imgUrl, href, title } = props
  return (
    <div className="flex-center flex gap-1">
      <Image src={imgUrl} alt="icon" width={18} height={18} />

      {href ? (
        <Link
          href={href}
          target="_blank"
          className="paragraph-medium text-blue-500"
        >
          {title}
        </Link>
      ) : (
        <p className="paragraph-medium text-dark400_light700">{title}</p>
      )}
    </div>
  )
}
