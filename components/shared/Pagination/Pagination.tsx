'use client'
import { Button } from '@/components/ui/button'
import { PaginationDirectionEnum } from '@/types/shared'
import { FC, HTMLAttributes } from 'react'

interface PaginationProps extends HTMLAttributes<HTMLDivElement> {
  handleNavigation: (value: PaginationDirectionEnum) => void
  pageCurrent: number
  hasNextPage: boolean
}

export const Pagination: FC<PaginationProps> = (props) => {
  const { handleNavigation, pageCurrent, hasNextPage } = props
  return (
    <div className="flex w-full justify-center items-center gap-2">
      <Button
        className="btn light-border-2 min-h-[36px] border flex items-center justify-center"
        onClick={() => handleNavigation(PaginationDirectionEnum.PREV)}
        disabled={pageCurrent === 1}
      >
        <span className="text-dark200_light800 body-medium">Previous</span>
      </Button>
      <div className="flex items-center justify-center rounded-md bg-primary-500 px-3.5 py-2">
        <span className="body-semibold text-light-900 text-center">
          {pageCurrent}
        </span>
      </div>
      <Button
        disabled={!hasNextPage}
        className="btn light-border-2 min-h-[36px] border flex items-center justify-center"
        onClick={() => handleNavigation(PaginationDirectionEnum.NEXT)}
      >
        <span className="text-dark200_light800 body-medium">Next</span>
      </Button>
    </div>
  )
}
