import { globalSearch } from '@/lib/actions/global.action'
import { ISearchGlobalTransformedResult } from '@/types/shared'
import { useSearchParams } from 'next/navigation'
import { FC, HTMLAttributes, useEffect, useState } from 'react'
import { transformSearchData } from './SearchGlobalResult.helper'
import { SearchGlobalResultEmpty } from './SearchGlobalResultEmpty'
import { SearchGlobalResultLoader } from './SearchGlobalResultLoader'
import { SearchGlobalResultRow } from './SearchGlobalResultRow'

interface SearchGlobalResultListProps extends HTMLAttributes<HTMLDivElement> {}

export const SearchGlobalResultList: FC<SearchGlobalResultListProps> = (
  props
) => {
  const searchParams = useSearchParams()

  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<ISearchGlobalTransformedResult[]>([])

  const global = searchParams.get('global')
  const type = searchParams.get('type')

  useEffect(() => {
    const fetchResult = async () => {
      // setResult([])
      if (!global) return null
      setIsLoading(true)

      try {
        const res = await globalSearch({ query: global, type })
        const searchData = transformSearchData(res)
        setResult(searchData)
      } catch (error) {
        console.log(error)
        throw error
      } finally {
        setIsLoading(false)
      }
    }

    if (global) fetchResult()
  }, [global, type])

  return (
    <div className="mt-3 bg-light-800 dark:bg-dark-400 w-full absolute top-full z-10 rounded-xl py-5 shadow-sm">
      {/* <GlobalFilter /> */}

      {/* divider */}
      <div className="my-5 h-[1px] bg-light-700/50 dark:bg-dark-500/50" />

      <div className="space-y-5">
        <p className="base-bold text-dark400_light800 px-5">Top Match</p>
        {isLoading ? (
          <SearchGlobalResultLoader />
        ) : (
          <div className="flex flex-col gap-2">
            {result.length ? (
              result.map((item) => {
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
