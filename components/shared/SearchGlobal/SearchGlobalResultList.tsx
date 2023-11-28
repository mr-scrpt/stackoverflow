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
    <div className="mt-3 bg-light-700 dark:bg-dark-400 w-full absolute top-full z-10 rounded-xl py-5 shadow-sm">
      <SearchGlobalFilterList
        listFilter={listFilter}
        activeFilter={activeFilter}
        onFilterClick={onFilterClick}
      />
      {/* divider */}
      <div className="my-5 h-[1px] bg-light-700/50 dark:bg-dark-500/50" />

      <div className="space-y-5 max-h-[300px] overflow-auto custom-scrollbar md:max-h-[600px]">
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
