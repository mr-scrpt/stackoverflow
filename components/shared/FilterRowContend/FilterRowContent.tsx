'use client'
import { formUrlQuery } from '@/lib/utils'
import { IFilter } from '@/types'
import { useRouter, useSearchParams } from 'next/navigation'
import { FC, HTMLAttributes, useEffect, useState } from 'react'
import { FilterRow } from '../FilterRow/FilterRow'

interface FilterRowContentProps extends HTMLAttributes<HTMLDivElement> {
  list: IFilter[]
}

export const FilterRowContent: FC<FilterRowContentProps> = (props) => {
  const { list } = props
  const searchParams = useSearchParams()
  const router = useRouter()
  const filterValue: string | null = searchParams.get('filter')
  const [active, setActive] = useState<IFilter | null>(null)
  useEffect(() => {
    if (filterValue) {
      const activeItem = list.find((item) => item.value === filterValue)
      activeItem && setActive(activeItem)
    }
  }, [filterValue, list])

  const handleClick = (item: IFilter) => {
    if (active?.value === item.value) {
      setActive(null)
      const newUrl = formUrlQuery({
        params: searchParams.toString(), // original params in Url
        key: 'filter',
        value: null,
      })

      router.push(newUrl, { scroll: true })
    } else {
      setActive(item)
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'filter',
        value: item.value.toLowerCase(),
      })
      // if input is cleared
      router.push(newUrl, { scroll: true })
    }
  }

  return <FilterRow list={list} active={active} handleClick={handleClick} />
}
