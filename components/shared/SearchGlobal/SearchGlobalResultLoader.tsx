'use client'
import { ReloadIcon } from '@radix-ui/react-icons'
import { FC, HTMLAttributes } from 'react'

interface SearchGlobalResultLoaderProps
  extends HTMLAttributes<HTMLDivElement> {}

export const SearchGlobalResultLoader: FC<SearchGlobalResultLoaderProps> = (
  props
) => {
  const { className } = props
  return (
    <div className={`flex-center flex-col px-5 ${className}`}>
      <ReloadIcon className="my-2 h-10 w-10 text-primary-500 animate-spin" />
      <p className="text-dark200_light800 body-regular">
        Browsing the entire database
      </p>
    </div>
  )
}
