'use client'
import { Button } from '@/components/ui/button'
import { IFilter } from '@/types'
import { FC, HTMLAttributes } from 'react'

interface FilterRowProps extends HTMLAttributes<HTMLDivElement> {
  list: IFilter[]
  handleClick: (item: IFilter) => void
  active?: IFilter | null
}

export const FilterRow: FC<FilterRowProps> = (props) => {
  const { list, active, handleClick } = props

  return (
    <div className="flex-wrap gap-3 max-lg:hidden md:flex ">
      {list.map((item) => (
        <Button
          key={item.value}
          onClick={() => handleClick(item)}
          className={`body-medium rounded-lg px-6 py-3 capitalize shadow-none hover:bg-light-700 dark:hover:bg-dark-400 ${
            active?.value === item.value
              ? 'bg-primary-100 text-primary-500 dark:bg-dark-400'
              : 'bg-light-800 text-light-500 dark:bg-dark-300'
          }`}
        >
          {item.name}
        </Button>
      ))}
    </div>
  )
}
