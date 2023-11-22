'use client'
import { Button } from '@/components/ui/button'
import { FC, HTMLAttributes } from 'react'

interface PaginationProps extends HTMLAttributes<HTMLDivElement> {
  handleNavigation: (value: string) => void
  pageCurrent: number
  hasNextPage: boolean
}

export const Pagination: FC<PaginationProps> = (props) => {
  const { handleNavigation, pageCurrent: currentPage, hasNextPage } = props
  return (
    <div className="flex w-full justify-center items-center gap-2">
      <Button
        className="btn light-border-2 min-h-[36px] border flex items-center justify-center"
        onClick={() => handleNavigation('prev')}
        disabled={currentPage === 1}
      >
        <p className="text-dark200_light800 body-medium">Previous</p>
      </Button>
      <div className="flex items-center justify-center rounded-md bg-primary-500 px-3.5 py-2">
        <p className="body-semibold text-light-900 text-center">
          {currentPage}
        </p>
      </div>
      <Button
        disabled={!hasNextPage}
        className="btn light-border-2 min-h-[36px] border flex items-center justify-center"
        onClick={() => handleNavigation('next')}
      >
        <p className="text-dark200_light800 body-medium">Next</p>
      </Button>
    </div>
  )
}
