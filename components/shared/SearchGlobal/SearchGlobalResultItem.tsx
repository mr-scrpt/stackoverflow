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
      className="flex items-start gap-2 cursor-pointer group"
    >
      <TagIcon className="object-contain stroke-dark-500 group opacity-60 dark:stroke-light-400 group-hover:stroke-primary-500 transition-all hover:opacity-100" />
      <div className="flex flex-col">
        <span className="body-medium transition-all line-clamp-1 group-hover:text-primary-500 dark:text-light-800 dark:group-hover:text-primary-500">
          {item.title}
        </span>
      </div>
    </Link>
  )
}
