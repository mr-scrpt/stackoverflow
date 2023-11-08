import { FC, HTMLAttributes } from 'react'
import { Search } from '../Search/Search'

interface SearchGlobalProps extends HTMLAttributes<HTMLDivElement> {}

export const SearchGlobal: FC<SearchGlobalProps> = (props) => {
  return (
    <Search
      onSearch={console.log}
      icon="/assets/icons/search.svg"
      placeholder="Globally search"
      route="/"
      className="relative w-full max-w-[600px] max-lg:hidden"
    />
  )
}
