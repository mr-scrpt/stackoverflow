'use client'
import { Filter } from '@/components/shared/Filter/Filter'
import { SearchLocal } from '@/components/shared/SearchLocal/SearchLocal'
import { Button } from '@/components/ui/button'
import { HOME_PAGE_FILTER } from '@/constants/filters'
import Link from 'next/link'

export default function Home() {
  return (
    <section>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[40px] px-4 py-3 text-light-900">
            Ask question
          </Button>
        </Link>
        text
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <SearchLocal />
        <Filter
          list={HOME_PAGE_FILTER}
          classTrigger="min-h-[56px] sm:min-w-[170px] bg-light-700 dark:bg-dark-400"
          className="hidden max-md:flex"
          classList=""
        />
      </div>
    </section>
  )
}
