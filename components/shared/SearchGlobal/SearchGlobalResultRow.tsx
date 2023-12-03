'use client'
import { ISearchGlobalTransformedResult, SearchTypeEnum } from '@/types/shared'
import Link from 'next/link'
import { FC, HTMLAttributes } from 'react'
import { SearchGlobalResultItem } from './SearchGlobalResultItem'

interface SearchGlobalResultItemProps extends HTMLAttributes<HTMLDivElement> {
  item: ISearchGlobalTransformedResult
}

export const SearchGlobalResultRow: FC<SearchGlobalResultItemProps> = (
  props
) => {
  const { item } = props
  const title =
    item.type === SearchTypeEnum.ANSWER ? (
      <span key={item.type} className="text-light400_light500">
        {item.title}
      </span>
    ) : (
      <Link
        key={item.type}
        href={item.link}
        className="text-light400_light500 cursor-pointer"
      >
        {item.title}
      </Link>
    )

  return (
    <span
      key={item.type}
      className="dark:bg-dark-700/50 flex w-full flex-wrap items-start gap-3 px-5 py-2.5 hover:bg-light-700/5"
    >
      {item.title && <div className="w-full">{title}</div>}
      <div className="flex flex-col gap-3">
        {item.data.map((inner) => (
          <SearchGlobalResultItem key={inner.id} item={inner} />
        ))}
      </div>
    </span>
  )
}
