'use client'
import { FC, HTMLAttributes } from 'react'
import { Pagination } from '../Pagination/Pagination'
import { PaginationDirectionEnum } from '@/types/shared'
import { formUrlQuery } from '@/lib/utils'
import { useRouter, useSearchParams } from 'next/navigation'

interface PaginationContentProps extends HTMLAttributes<HTMLDivElement> {
  pageCurrent: number
  hasNextPage: boolean
  // pageTotal: number
}

export const PaginationContent: FC<PaginationContentProps> = (props) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const { pageCurrent, hasNextPage } = props
  if (!hasNextPage && pageCurrent === 1) return null

  const handleNav = (direction: PaginationDirectionEnum) => {
    const nextPageNumber =
      direction === PaginationDirectionEnum.PREV
        ? pageCurrent - 1
        : pageCurrent + 1

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: 'page',
      value: nextPageNumber.toString(),
    })

    router.push(newUrl)
  }
  return (
    <Pagination
      handleNavigation={handleNav}
      pageCurrent={pageCurrent}
      hasNextPage={hasNextPage}
    />
  )
}
