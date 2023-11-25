'use client'

import { FC, HTMLAttributes, useEffect, useRef, useState } from 'react'

import { Search } from '../Search/Search'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils'
import { SearchGlobalResultList } from '../SearchGlobalResult/SearchGlobalResultList'
import { useOutsideClick } from '@/lib/hook/clickOutside'

interface SearchGlobalProps extends HTMLAttributes<HTMLDivElement> {}

export const SearchGlobal: FC<SearchGlobalProps> = (props) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

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
        setSearch('')
      }
    },
  })
  //
  useEffect(() => {
    setIsOpen(false)
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
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'global',
          value: search,
        })

        router.push(newUrl, { scroll: false })
      } else {
        // if local search exist -> clear
        if (queryLocal) {
          console.log('query', queryLocal)
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ['q', 'type'],
          })
          router.push(newUrl, { scroll: false })
          console.log('remove', newUrl)
        }
      }
    }, 300)

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
