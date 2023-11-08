import Link from 'next/link'
import { FC, HTMLAttributes } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

interface NoResultProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  description: string
  link: string
  linkTitle: string
}

export const NoResult: FC<NoResultProps> = (props) => {
  const { title, description, link, linkTitle } = props
  return (
    <div className="mt-10 flex w-full flex-col items-center justify-center">
      {/* light mode */}
      <Image
        src="/assets/images/light-illustration.png"
        alt="no result illustration"
        width={270}
        height={200}
        className="block object-contain dark:hidden"
      />

      {/* dark mode */}
      <Image
        src="/assets/images/dark-illustration.png"
        alt="no result illustration"
        width={270}
        height={200}
        className="hidden object-contain dark:flex"
      />

      <h2 className="h2-bold text-dark200_light900 mt-8">{title}</h2>
      <p className="body-regular text-dark500_light700 my-3.5 max-w-md text-center">
        {description}
      </p>

      <Button className="paragraph-medium mt-5 min-h-[46px] rounded-lg bg-primary-500 px-4 py-3 text-light-900 hover:bg-primary-500 dark:bg-primary-500 dark:text-light-900">
        <Link href={link}>{linkTitle}</Link>
      </Button>
    </div>
  )
}
