'use client'
import { FC, HTMLAttributes } from 'react'
import { Pagination } from '../Pagination/Pagination'

interface PaginationContentProps extends HTMLAttributes<HTMLDivElement> {
  pageCurrent: number
  hasNextPage: boolean
}

export const PaginationContent: FC<PaginationContentProps> = (props) => {
  const { pageCurrent, hasNextPage } = props
  const handleNav = () => {}
  return (
    <Pagination
      handleNavigation={handleNav}
      pageCurrent={pageCurrent}
      hasNextPage={hasNextPage}
    />
  )
}
