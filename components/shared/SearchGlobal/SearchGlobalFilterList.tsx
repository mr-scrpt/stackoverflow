import { Button } from '@/components/ui/button'
import { ISearchGlobalFiter, SearchTypeEnum } from '@/types/shared'
import { FC, HTMLAttributes } from 'react'

interface SearchGlobalFilterListProps extends HTMLAttributes<HTMLDivElement> {
  listFilter: ISearchGlobalFiter[]
  onFilterClick: (str: SearchTypeEnum) => void
  activeFilter: string
}

export const SearchGlobalFilterList: FC<SearchGlobalFilterListProps> = (
  props
) => {
  const { listFilter, activeFilter, onFilterClick } = props

  return (
    <div className="px-5 flex items-center gap-5">
      <span className="body-medium text-dark400_light900">Type: </span>
      <div className="flex gap-3">
        {listFilter.map((filter) => (
          <Button
            className={`light-border-2 rounded-2xl small-medium px-5 py-2 capitalize dark:hover:text-primary-500 dark:text-light-800 ${
              activeFilter === filter.value
                ? 'bg-primary-500 text-light-900 hover:dark:text-light-900'
                : 'bg-light-800 text-dark-400 hover:text-light-500 dark:bg-dark-500 hover:dark:text-primary-500'
            }`}
            onClick={() => onFilterClick(filter.value)}
            key={filter.value}
          >
            {filter.name}
          </Button>
        ))}
      </div>
    </div>
  )
}
