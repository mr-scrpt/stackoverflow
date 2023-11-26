import { FC, HTMLAttributes } from 'react'

interface SearchGlobalResultEmptyProps extends HTMLAttributes<HTMLDivElement> {}

export const SearchGlobalResultEmpty: FC<SearchGlobalResultEmptyProps> = (
  props
) => {
  return (
    <div className="flex-center flex-col px-5">
      <p className="text-dark200_light800 body-regular px-5 py-2.5">
        Oops, No results found...
      </p>
    </div>
  )
}
