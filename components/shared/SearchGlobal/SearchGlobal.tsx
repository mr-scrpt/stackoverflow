import { Input } from '@/components/ui/input'
import Image from 'next/image'
import { FC, HTMLAttributes } from 'react'

interface SearchGlobalProps extends HTMLAttributes<HTMLDivElement> {}

export const SearchGlobal: FC<SearchGlobalProps> = (props) => {
  return (
    <div className="relative w-full max-w-[600px] max-lg:hidden">
      <div className="bg-light700_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4">
        <Image
          src="/assets/icons/search.svg"
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer"
        />

        <Input
          type="text"
          placeholder="Search globally"
          // value=""
          className="paragraph-regular no-focus placeholder bg-light700_darkgradient border-none shadow-none outline-none"
        />
      </div>
    </div>
  )
}
