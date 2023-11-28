'use client'
import { FC, HTMLAttributes, useEffect, useRef, useState } from 'react'

import { formUrlQuery } from '@/lib/utils'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { useOutsideClick } from '@/lib/hook/clickOutside'
import { Search } from '../Search/Search'
import { SearchGlobalResultList } from './SearchGlobalResultList'
import { GLOBAL_SEARCH_FILTER, URL_SEARCH_PARMS } from '@/constants/filters'
import { ISearchGlobalTransformedResult } from '@/types/shared'
import { globalSearch } from '@/lib/actions/global.action'
import { transformSearchData } from './SearchGlobal.helper'

interface SearchGlobalProps extends HTMLAttributes<HTMLDivElement> {}

export const SearchGlobal: FC<SearchGlobalProps> = (props) => {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<ISearchGlobalTransformedResult[]>([])

  const pathname = usePathname()
  const searchParams = useSearchParams()
  const queryGlobal = searchParams.get(URL_SEARCH_PARMS.global)
  const queryType = searchParams.get(URL_SEARCH_PARMS.type)

  const searchContainerRef = useRef(null)

  const [search, setSearch] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (queryGlobal) {
      setIsOpen(true)
      setSearch(queryGlobal)
    }
  }, [queryGlobal])

  useOutsideClick({
    ref: searchContainerRef,
    callback: () => {
      setSearch('')
      setIsOpen(false)
    },
    keysToRemove: [URL_SEARCH_PARMS.global, URL_SEARCH_PARMS.type],
    params: searchParams.toString(),
  })

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: URL_SEARCH_PARMS.global,
          value: search,
        })

        router.replace(newUrl, { scroll: false })
      }
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [search, pathname, router, searchParams, queryGlobal])

  // fetching data
  useEffect(() => {
    if (queryGlobal) {
      const fetchResult = async () => {
        setIsLoading(true)

        try {
          const typeExisting = GLOBAL_SEARCH_FILTER.find(
            (item) => item.value === queryType
          )
          const res = await globalSearch({
            query: queryGlobal,
            type: typeExisting?.value,
          })
          const searchData = transformSearchData(res)
          setResult(searchData)
        } catch (error) {
          console.log(error)
          throw error
        } finally {
          setIsLoading(false)
        }
      }

      fetchResult()
    }
  }, [queryType, queryGlobal])

  const onSearch = (str: string) => {
    setSearch(str)
    if (!isOpen) setIsOpen(true)
    if (str === '' && isOpen) setIsOpen(false)
  }

  return (
    <div className="relative w-full max-w-[600px]" ref={searchContainerRef}>
      <Search
        onSearch={onSearch}
        value={search}
        icon="/assets/icons/search.svg"
        placeholder="Globally search"
        classBg="bg-light700_dark400"
        route="/"
        iconPosition="left"
        className="max-w-[600px] w-full max-lg:hidden"
      />
      {isOpen && <SearchGlobalResultList list={result} isLoading={isLoading} />}
    </div>
  )
}
