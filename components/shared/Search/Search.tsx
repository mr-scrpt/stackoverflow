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
  classBg?: string
}

export const Search: FC<SearchProps> = (props) => {
  const {
    placeholder,
    icon,
    className,
    onSearch,
    iconPosition,
    classBg,
    value,
  } = props
  return (
    <div className={className}>
      <div
        className={`${classBg} relative flex min-h-[56px] w-full grow items-center gap-1 rounded-xl px-4 `}
      >
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
          className={`${classBg} paragraph-regular no-focus placeholder text-dark200_light900 border-none shadow-none outline-none`}
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
