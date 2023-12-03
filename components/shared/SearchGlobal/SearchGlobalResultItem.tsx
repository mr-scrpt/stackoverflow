'use client'
import TagIcon from '@/public/assets/icons/tag.svg'
import { ISearchGlobalDataItem } from '@/types/shared'
import Link from 'next/link'
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
      className="group flex cursor-pointer items-start gap-2"
    >
      <TagIcon className="group stroke-dark-500 object-contain opacity-60 transition-all hover:opacity-100 group-hover:stroke-primary-500 dark:stroke-light-400" />
      <div className="flex flex-col">
        <span className="body-medium line-clamp-1 transition-all group-hover:text-primary-500 dark:text-light-800 dark:group-hover:text-primary-500">
          {item.title}
        </span>
      </div>
    </Link>
  )
}
