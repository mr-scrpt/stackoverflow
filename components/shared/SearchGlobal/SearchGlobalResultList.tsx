'use client'
import { globalSearch } from '@/lib/actions/global.action'
import { ISearchGlobalTransformedResult } from '@/types/shared'
import { useSearchParams } from 'next/navigation'
import { FC, HTMLAttributes, useEffect, useState } from 'react'
import { transformSearchData } from './SearchGlobal.helper'
import { SearchGlobalResultEmpty } from './SearchGlobalResultEmpty'
import { SearchGlobalResultLoader } from './SearchGlobalResultLoader'
import { SearchGlobalResultRow } from './SearchGlobalResultRow'
import { SearchGlobalFilterList } from './SearchGlobalFilterList'
import { GLOBAL_SEARCH_FILTER, URL_SEARCH_PARMS } from '@/constants/filters'

interface SearchGlobalResultListProps extends HTMLAttributes<HTMLDivElement> {
  list: ISearchGlobalTransformedResult[]
  isLoading: boolean
}

export const SearchGlobalResultList: FC<SearchGlobalResultListProps> = (
  props
) => {
  const { isLoading, list } = props

  return (
    <div className="mt-3 bg-light-700 dark:bg-dark-400 w-full absolute top-full z-10 rounded-xl py-5 shadow-sm">
      <SearchGlobalFilterList />
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
