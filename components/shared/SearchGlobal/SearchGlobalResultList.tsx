'use client'
import {
  ISearchGlobalFiter,
  ISearchGlobalTransformedResult,
  SearchTypeEnum,
} from '@/types/shared'
import { FC, HTMLAttributes } from 'react'
import { SearchGlobalFilterList } from './SearchGlobalFilterList'
import { SearchGlobalResultEmpty } from './SearchGlobalResultEmpty'
import { SearchGlobalResultLoader } from './SearchGlobalResultLoader'
import { SearchGlobalResultRow } from './SearchGlobalResultRow'

interface SearchGlobalResultListProps extends HTMLAttributes<HTMLDivElement> {
  list: ISearchGlobalTransformedResult[]
  listFilter: ISearchGlobalFiter[]
  activeFilter: string
  isLoading: boolean

  onFilterClick: (str: SearchTypeEnum) => void
}

export const SearchGlobalResultList: FC<SearchGlobalResultListProps> = (
  props
) => {
  const { isLoading, list, listFilter, activeFilter, onFilterClick } = props

  return (
    <div className="absolute top-full z-10 mt-3 w-full rounded-xl bg-light-700 py-5 shadow-sm dark:bg-dark-400">
      <SearchGlobalFilterList
        listFilter={listFilter}
        activeFilter={activeFilter}
        onFilterClick={onFilterClick}
      />
      {/* divider */}
      <div className="my-5 h-[1px] bg-light-700/50 dark:bg-dark-500/50" />

      <div className="custom-scrollbar max-h-[300px] space-y-5 overflow-auto md:max-h-[600px]">
        <p className="base-bold text-dark400_light800 px-5">Top Match</p>
        {isLoading ? (
          <SearchGlobalResultLoader />
        ) : (
          <div className="flex flex-col gap-2">
            {list.length ? (
              list.map((item) => {
                return <SearchGlobalResultRow key={item.link} item={item} />
              })
            ) : (
              <SearchGlobalResultEmpty />
            )}
          </div>
        )}
      </div>
    </div>
  )
}
