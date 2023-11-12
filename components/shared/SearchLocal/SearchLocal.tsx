'use client'
import { FC, HTMLAttributes } from 'react'
import { Search } from '../Search/Search'

interface SearchLocalProps extends HTMLAttributes<HTMLDivElement> {
  route: string
}

export const SearchLocal: FC<SearchLocalProps> = (props) => {
  const { route, placeholder = '' } = props
  return (
    <Search
      onSearch={console.log}
      icon="/assets/icons/search.svg"
      iconPosition="left"
      placeholder={placeholder}
      route={route}
      classBg="bg-light700_dark400"
      className="flex-1"
      value=""
    />
  )
}
