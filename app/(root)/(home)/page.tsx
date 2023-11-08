'use client'
import { Filter } from '@/components/shared/Filter/Filter'
import { FilterRow } from '@/components/shared/FilterRow/FilterRow'
import { NoResult } from '@/components/shared/NoResult/NoResult'
import { QuestionCard } from '@/components/shared/QuestionCard/QuestionCard'
import { SearchLocal } from '@/components/shared/SearchLocal/SearchLocal'
import { Button } from '@/components/ui/button'
import { HOME_PAGE_FILTER } from '@/constants/filters'
import { QUESTIONS } from '@/constants/question'
import Link from 'next/link'

export default function Home() {
  return (
    <section className="flex flex-col gap-8">
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[40px] px-4 py-3 text-light-900">
            Ask question
          </Button>
        </Link>
      </div>

      <div className="flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <SearchLocal />
        <Filter
          list={HOME_PAGE_FILTER}
          classTrigger="min-h-[56px] sm:min-w-[170px] bg-light-700 dark:bg-dark-400"
          className="hidden max-md:flex"
          classList=""
        />
      </div>
      <FilterRow list={HOME_PAGE_FILTER} />

      <div className="custom-scrollbar flex w-full flex-col gap-6 overflow-y-auto">
        {QUESTIONS.length ? (
          QUESTIONS.map((item) => <QuestionCard key={item._id} item={item} />)
        ) : (
          <NoResult
            title="There's no question to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the
        discussion. our query could be the next big thing others learn from. Get
        involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </section>
  )
}
