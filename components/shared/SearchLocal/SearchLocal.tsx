'use client'
import { FC, HTMLAttributes, useEffect, useState } from 'react'
import { Search } from '../Search/Search'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils'
import { TIME_DEBOUNCE_DELAY } from '@/constants'

interface SearchLocalProps extends HTMLAttributes<HTMLDivElement> {
  route: string
}

export const SearchLocal: FC<SearchLocalProps> = (props) => {
  const { route, placeholder = '' } = props
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const query = searchParams.get('q')
  const [search, setSearch] = useState(query || '')

  useEffect(() => {
    // Do not send request on every change event happened
    // fire request after specific delay => debounce
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(), // original params in Url
          key: 'q',
          value: search,
        })

        router.push(newUrl, { scroll: true })
      } else {
        // if input is cleared
        if (pathname === route) {
          // delete query
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ['q'],
          })

          router.push(route, { scroll: true })
        }
      }
    }, TIME_DEBOUNCE_DELAY)

    return () => clearTimeout(delayDebounceFn)
  }, [search, router, route, pathname, searchParams, query])

  return (
    <Search
      onSearch={(str) => setSearch(str)}
      icon="/assets/icons/search.svg"
      iconPosition="left"
      placeholder={placeholder}
      route={route}
      classBg="bg-light700_dark400"
      className="flex-1"
      value={search}
    />
  )
}
