'use client'
import { FC, HTMLAttributes, useEffect, useRef, useState } from 'react'

import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { Search } from '../Search/Search'
import { SearchGlobalResultList } from './SearchGlobalResultList'
import { useOutsideClick } from '@/lib/hook/clickOutside'

interface SearchGlobalProps extends HTMLAttributes<HTMLDivElement> {}

export const SearchGlobal: FC<SearchGlobalProps> = (props) => {
  const router = useRouter()

  const pathname = usePathname()
  const searchParams = useSearchParams()
  const query = searchParams.get('global')

  const searchContainerRef = useRef(null)

  const [search, setSearch] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (query) {
      setIsOpen(true)
      setSearch(query)
    }
  }, [query])

  useOutsideClick({
    ref: searchContainerRef,
    callback: () => {
      setSearch('')
      setIsOpen(false)
    },
    keysToRemove: ['global', 'type'],
    params: searchParams.toString(),
  })

  // const handleOutsideClick = (e: any) => {
  //   const anchor = e.target.closest('a')
  //   const ref = searchContainerRef.current
  //   const isOutside = !ref.contains(e.target) || null
  //   if (isOutside) {
  //     setSearch('')
  //     setIsOpen(false)
  //     if (!anchor) {
  //       const newUrl = removeKeysFromQuery({
  //         params: searchParams.toString(),
  //         keysToRemove: ['global', 'type'],
  //       })
  //
  //       router.replace(newUrl, { scroll: false })
  //     }
  //   }
  // }
  // useEffect(() => {
  //   document.addEventListener('click', handleOutsideClick)
  //
  //   return () => document.removeEventListener('click', handleOutsideClick)
  // }, [])

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'global',
          value: search,
        })

        router.replace(newUrl, { scroll: false })
      } else {
        if (query) {
          // const newUrl = removeKeysFromQuery({
          //   params: searchParams.toString(),
          //   keysToRemove: ['global', 'type'],
          // })
          //
          // router.replace(newUrl, { scroll: false })
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
