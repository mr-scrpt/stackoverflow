'use client'
import { IFilter } from '@/types'
import { FC, HTMLAttributes } from 'react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface FilterProps extends HTMLAttributes<HTMLDivElement> {
  list: IFilter[]
  defaultValue?: string
  handleSelect: (value: string) => void
  active?: IFilter | null
  classTrigger?: string
  classList?: string
}

export const Filter: FC<FilterProps> = (props) => {
  const {
    list,
    defaultValue,
    className,
    classTrigger,
    classList,
    active,
    handleSelect,
  } = props
  return (
    <div className={`relative ${className}`}>
      <Select
        defaultValue={active?.value || defaultValue || list[0].value}
        value={active?.value}
        onValueChange={handleSelect}
      >
        <SelectTrigger
          className={`${classTrigger} body-regular light-border text-dark500_light700 rounded-xl border px-5 py-2.5 `}
        >
          <div className="line-clamp-1 flex-1 text-left">
            <SelectValue placeholder="Select a Filter" />
          </div>
        </SelectTrigger>
        <SelectContent
          className={`${classList} text-dark500_light700 small-regular max-h-72 border-none bg-light-900 dark:bg-dark-400`}
        >
          <SelectGroup>
            {list.map((item) => (
              <SelectItem
                key={item.value}
                value={item.value}
                className="cursor-pointer focus:bg-light-800 dark:focus:bg-dark-300"
              >
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
