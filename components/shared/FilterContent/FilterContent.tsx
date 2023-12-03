'use client'
import { formUrlQuery } from '@/lib/utils'
import { IFilter } from '@/types'
import { useRouter, useSearchParams } from 'next/navigation'
import { FC, HTMLAttributes, useEffect, useState } from 'react'
import { Filter } from '../Filter/Filter'

interface FilterContentProps extends HTMLAttributes<HTMLDivElement> {
  list: IFilter[]
  classList?: string
  classTrigger?: string
  defaultValue?: string
}

export const FilterContent: FC<FilterContentProps> = (props) => {
  const { list, className, classTrigger, defaultValue } = props
  console.log(' =>>>', defaultValue)
  const searchParams = useSearchParams()
  const router = useRouter()
  const filterValue: string | null = searchParams.get('filter')

  const [active, setActive] = useState<IFilter | null>(null)
  const activeItem = list.find((item) => item.value === filterValue)

  useEffect(() => {
    activeItem && setActive(activeItem)
  }, [activeItem])

  function handleUpdateParams(value: string) {
    setActive(activeItem || null)
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: 'filter',
      value,
    })

    router.push(newUrl, { scroll: false })
  }
  return (
    <Filter
      list={list}
      active={active}
      handleSelect={handleUpdateParams}
      classTrigger={classTrigger}
      className={className}
      defaultValue={defaultValue}
    />
  )
}
