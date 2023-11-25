import { globalSearch } from '@/lib/actions/global.action'
import Image from 'next/image'
import { IFilteredResultItem } from '@/types'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { FC, HTMLAttributes, useEffect, useState } from 'react'

interface SearchGlobalResultListProps extends HTMLAttributes<HTMLDivElement> {}

export const SearchGlobalResultList: FC<SearchGlobalResultListProps> = (
  props
) => {
  const searchParams = useSearchParams()

  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<IFilteredResultItem[]>([])

  const global = searchParams.get('global')
  const type = searchParams.get('type')

  useEffect(() => {
    const fetchResult = async () => {
      console.log('fetch')
      // setResult([])
      setIsLoading(true)

      try {
        // EVERYTHING EVERYWHERE ALL AT ONCE...
        const res = await globalSearch({ query: global, type })
        console.log('res', res)
        setResult(res)
      } catch (error) {
        console.log(error)
        throw error
      } finally {
        setIsLoading(false)
      }
    }

    if (global) fetchResult()
  }, [global, type])

  // how to render specific link
  function renderLink(type: string, slug: string, id?: string) {
    switch (type) {
      case 'question':
        return `/question/${slug}`
      case 'answer':
        return `/question/${slug}#${id}`
      case 'tag':
        return `/tag/${slug}`
      case 'user':
        return `/profile/${slug}`
      default:
        return '/'
    }
  }

  return (
    <div className="mt-3 bg-light-800 dark:bg-dark-400 w-full absolute top-full z-10 rounded-xl py-5 shadow-sm">
      {/* <GlobalFilter /> */}

      {/* divider */}
      <div className="my-5 h-[1px] bg-light-700/50 dark:bg-dark-500/50" />

      <div className="space-y-5">
        <p className="base-bold text-dark400_light800 px-5">Top Match</p>
        {isLoading ? (
          <div className="flex-center flex-col px-5">
            {/* <ReloadIcon className='my-2 h-10 w-10 text-primary-500 animate-spin'/> */}
            <p className="text-dark200_light800 body-regular">
              Browsing the entire database
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {result.length ? (
              result.map((item) => {
                const title =
                  item.link === '' ? (
                    <span key={item.type} className="text-light400_light500">
                      {item.title}
                    </span>
                  ) : (
                    <Link
                      key={item.type}
                      href={item.link}
                      className="cursor-pointer text-light400_light500"
                    >
                      {item.title}
                    </Link>
                  )

                return (
                  <span
                    key={item.type}
                    className="flex flex-wrap w-full items-start gap-3 px-5 py-2.5 hover:bg-light-700/5 dark:bg-dark-700/50"
                  >
                    <div className="w-full">{title}</div>
                    <div className="flex flex-col gap-3">
                      {item.data.map((inner) => (
                        <Link
                          href={renderLink(item.type, inner.link, inner.id)}
                          key={inner.id}
                          className="flex items-start gap-2 items-center cursor-pointer"
                        >
                          <Image
                            src="/assets/icons/tag.svg"
                            alt="tag"
                            width={16}
                            height={16}
                            className="invert-colors object-contain"
                          />
                          <div className="flex flex-col">
                            <span className="body-medium text-dark200_light800 line-clamp-1">
                              {inner.title}
                            </span>
                            {/* <p className="mt-1 small-medium font-bold text-light400_light500 capitalize"> */}
                            {/*   {item.type} */}
                            {/* </p> */}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </span>
                )
              })
            ) : (
              <div className="flex-center flex-col px-5">
                <p className="text-dark200_light800 body-regular px-5 py-2.5">
                  Oops, No results found...
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
