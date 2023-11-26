'use client'

import { FC, HTMLAttributes, useEffect, useRef, useState } from 'react'

import { Search } from '../Search/Search'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils'
import { SearchGlobalResultList } from './SearchGlobalResultList'
import { useOutsideClick } from '@/lib/hook/clickOutside'
import { TIME_DEBOUNCE_DELAY } from '@/constants'

interface SearchGlobalProps extends HTMLAttributes<HTMLDivElement> {}

export const SearchGlobal: FC<SearchGlobalProps> = (props) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  console.log('pathname', pathname)
  console.log('router', router.asPath)

  const queryLocal = searchParams.get('q') // local search value
  const queryGlobal = searchParams.get('global')

  const [search, setSearch] = useState(queryGlobal || '')
  const [isOpen, setIsOpen] = useState(false)
  const searchContainerRef = useRef<HTMLDivElement>(null)

  // const globalPathRemove = () => {
  //   const newUrl = removeKeysFromQuery({
  //     params: searchParams.toString(),
  //     keysToRemove: ['global'],
  //   })
  //   router.push(newUrl, { scroll: false })
  // }

  useOutsideClick({
    ref: searchContainerRef,
    callback: () => {
      if (isOpen) {
        setIsOpen(false)
        // setSearch('')
      }
    },
  })
  //
  useEffect(() => {
    setIsOpen(false)
    setSearch('')
  }, [pathname])

  useEffect(() => {
    const delayDebouncedFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'global',
          value: search,
        })

        router.push(newUrl, { scroll: false })
      }
    }, TIME_DEBOUNCE_DELAY)

    return () => clearTimeout(delayDebouncedFn)
  }, [search, router, pathname, queryLocal, searchParams])

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
      {isOpen && <SearchGlobalResultList />}
    </div>
  )
}
