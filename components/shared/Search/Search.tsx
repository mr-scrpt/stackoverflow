'use client'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import { FC, InputHTMLAttributes } from 'react'

interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string
  route: string
  onSearch: (str: string) => void
  icon?: string
  iconPosition: 'left' | 'right'
}

export const Search: FC<SearchProps> = (props) => {
  const { placeholder, route, icon, className, value, onSearch, iconPosition } =
    props
  return (
    <div className={className}>
      <div className="w-full bg-light700_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4">
        {icon && iconPosition === 'left' && (
          <Image
            src={icon}
            alt="search"
            width={24}
            height={24}
            className="cursor-pointer"
          />
        )}
        <Input
          type="text"
          placeholder={placeholder}
          onChange={(e) => onSearch(e.target?.value)}
          value={value}
          // value=""
          className="paragraph-regular no-focus placeholder bg-light700_darkgradient border-none shadow-none outline-none"
        />
        {icon && iconPosition === 'right' && (
          <Image
            src={icon}
            alt="search"
            width={24}
            height={24}
            className="cursor-pointer"
          />
        )}
      </div>
    </div>
  )
}
