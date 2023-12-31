import { FilterContent } from '@/components/shared/FilterContent/FilterContent'
import { FilterRowContent } from '@/components/shared/FilterRowContend/FilterRowContent'
import { NoResult } from '@/components/shared/NoResult/NoResult'
import { PaginationContent } from '@/components/shared/PaginationContent/PaginationContent'
import { QuestionCard } from '@/components/shared/QuestionCard/QuestionCard'
import { SearchLocal } from '@/components/shared/SearchLocal/SearchLocal'
import { buttonVariants } from '@/components/ui/button'
import { HOME_PAGE_FILTER } from '@/constants/filters'
import { getQuestions } from '@/lib/actions/question.action'
import { getUserByClerkId } from '@/lib/actions/user.action'
import { cn } from '@/lib/utils'
import { ISearchParamsProps } from '@/types'
import { auth } from '@clerk/nextjs'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Home | Dev Overflow',
  description: 'Dev Overflow is awesome site to developer',
}

const HomePage = async (props: ISearchParamsProps) => {
  const { searchParams } = props
  const { q, filter, page } = searchParams
  const { userId: clerkId } = auth()
  const { questions, hasNextPage } = await getQuestions({
    q,
    userId: clerkId || undefined,
    filter,
    page: page ? +page : 1,
  })

  const userActual = await getUserByClerkId(clerkId)

  return (
    <section className="flex flex-col gap-8">
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link
          href="/ask-question"
          className={cn(
            buttonVariants(),
            'primary-gradient h-[50px] self-end px-4 py-3 text-light-900 max-sm:w-full'
          )}
        >
          {/* <Button className="primary-gradient min-h-[40px] px-4 py-3 text-light-900"> */}
          Ask question
          {/* </Button> */}
        </Link>
      </div>

      <div className="flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <SearchLocal route="/" placeholder="Search questions" />
        <FilterContent
          list={HOME_PAGE_FILTER}
          classTrigger="min-h-[56px] sm:min-w-[170px] bg-light-700 dark:bg-dark-400"
          className="hidden max-md:flex"
        />
      </div>
      {/* <FilterRow list={HOME_PAGE_FILTER} /> */}
      <FilterRowContent list={HOME_PAGE_FILTER} />

      <div className="custom-scrollbar flex w-full flex-col gap-6 overflow-y-auto">
        {questions.length ? (
          questions.map((item) => (
            <QuestionCard
              key={item._id}
              item={item}
              isAuthor={!!userActual && item.author._id === userActual?._id}
            />
          ))
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

      <PaginationContent
        hasNextPage={hasNextPage}
        pageCurrent={page ? +page : 1}
      />
    </section>
  )
}

export default HomePage
