'use client'

import { FC, HTMLAttributes, useEffect, useRef, useState } from 'react'

import { TIME_DEBOUNCE_DELAY } from '@/constants'
import { useOutsideClick } from '@/lib/hook/clickOutside'
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Search } from '../Search/Search'
import { SearchGlobalResultList } from './SearchGlobalResultList'

interface SearchGlobalProps extends HTMLAttributes<HTMLDivElement> {}

export const SearchGlobal: FC<SearchGlobalProps> = (props) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const query = searchParams.get('global')

  const [search, setSearch] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
    if (query) {
      setIsOpen(true)
      setSearch(query)
    }
  }, [query])
  const searchContainerRef = useRef(null)
  // useOutsideClick({
  //   ref: searchContainerRef,
  //   callback: () => {
  //     if (isOpen) {
  //       setIsOpen(false)
  //       setSearch('')
  //     }
  //   },
  // })

  useEffect(() => {
    // click outside global search -> close and rest
    const handleOutsideClick = (e: any) => {
      const anchor = e.target.closest('a')
      if (anchor) {
        router.push(anchor.getAttribute('href'))
      }

      // @ts-ignore
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target)
      ) {
        setIsOpen(false)
        setSearch('')
      }
    }

    setIsOpen(false) // if path changes -> close

    document.addEventListener('click', handleOutsideClick)

    return () => document.removeEventListener('click', handleOutsideClick)
  }, [pathname])

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'global',
          value: search,
        })

        router.push(newUrl, { scroll: false })
      } else {
        if (query) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ['global', 'type'],
          })

          router.push(newUrl, { scroll: false })
        }
      }
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [search, pathname, router, searchParams, query])

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
