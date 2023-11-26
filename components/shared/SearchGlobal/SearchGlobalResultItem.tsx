'use client'
import { ISearchGlobalDataItem } from '@/types/shared'
import Link from 'next/link'
import Image from 'next/image'
import { FC, HTMLAttributes } from 'react'

interface SearchGlobalResultItemProps extends HTMLAttributes<HTMLDivElement> {
  item: ISearchGlobalDataItem
}

export const SearchGlobalResultItem: FC<SearchGlobalResultItemProps> = (
  props
) => {
  const { item } = props
  return (
    <Link
      href={item.link}
      key={item.id}
      className="flex items-start gap-2 items-center cursor-pointer"
    >
      <Image
        src="/assets/icons/tag.svg"
        alt="tag"
        width={16}
        height={16}
        className="invert-colors object-contain"
      />
      <div className="flex flex-col">
        <span className="body-medium text-dark200_light800 line-clamp-1">
          {item.title}
        </span>
      </div>
    </Link>
  )
}
