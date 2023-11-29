'use client'
import { useRouter } from 'next/navigation'
import { FC, HTMLAttributes } from 'react'

interface NotFoundUserProps extends HTMLAttributes<HTMLDivElement> {}

export const NotFoundUser: FC<NotFoundUserProps> = () => {
  const router = useRouter()
  const onClick = () => {
    router.refresh()
  }
  return (
    <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
      <p>User not found</p>
      <div className="flex items-center justify-center"></div>
      <button className="mt-1 font-bold text-accent-blue" onClick={onClick}>
        Refrash page
      </button>
    </div>
  )
}
