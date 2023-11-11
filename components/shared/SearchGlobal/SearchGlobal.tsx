// 'use client'
import { FC, HTMLAttributes } from 'react'

import { Search } from '../Search/Search'

interface SearchGlobalProps extends HTMLAttributes<HTMLDivElement> {}

export const SearchGlobal: FC<SearchGlobalProps> = (props) => {
  return (
    <Search
      onSearch={console.log}
      icon="/assets/icons/search.svg"
      placeholder="Globally search"
      classBg="bg-light700_dark400"
      route="/"
      iconPosition="left"
      className="max-w-[600px] w-full max-lg:hidden"
    />
  )
}
