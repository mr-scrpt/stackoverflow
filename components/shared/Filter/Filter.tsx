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
  classTrigger?: string
  classList?: string
}

export const Filter: FC<FilterProps> = (props) => {
  const { list, className, classTrigger, classList } = props
  return (
    <div className={`relative ${className}`}>
      <Select>
        <SelectTrigger
          className={`${classTrigger} body-regular light-border rounded-xl text-dark500_light700 border px-5 py-2.5`}
        >
          <div className="line-clamp-1 flex-1 text-left">
            <SelectValue placeholder="Select a Filter" />
          </div>
        </SelectTrigger>
        <SelectContent className={`${classList} text-dark500_light700 `}>
          <SelectGroup>
            {list.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
