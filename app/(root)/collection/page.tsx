// interface pageProps extends HTMLAttributes<HTMLDivElement> {}

import { Filter } from '@/components/shared/Filter/Filter'
import { FilterRow } from '@/components/shared/FilterRow/FilterRow'
import { NoResult } from '@/components/shared/NoResult/NoResult'
import { QuestionCard } from '@/components/shared/QuestionCard/QuestionCard'
import { SearchLocal } from '@/components/shared/SearchLocal/SearchLocal'
import { USER_PAGE_FILTER } from '@/constants/filters'
import { getSavedQuestions } from '@/lib/actions/question.action'
import { auth } from '@clerk/nextjs'
import Link from 'next/link'

const CollectionPage = async () => {
  const { userId } = auth()

  if (!userId) {
    return (
      <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
        <p>You are not loggined</p>
        <div className="flex items-center justify-center"></div>
        <Link href="/sign-in" className="mt-1 font-bold text-accent-blue">
          Sign in
        </Link>
        <Link href="/sign-up" className="mt-1 font-bold text-accent-blue">
          Or sign up
        </Link>
      </div>
    )
  }
  const { questions } = await getSavedQuestions({ clerkId: userId })
  return (
    <section className="flex flex-col gap-8">
      <h1 className="h1-bold text-dark100_light900">Saved Pages</h1>

      <div className="flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <SearchLocal route="/community" placeholder="Search users" />
        <Filter
          list={USER_PAGE_FILTER}
          classTrigger="min-h-[56px] sm:min-w-[170px] bg-light-700 dark:bg-dark-400"
          className="hidden max-md:flex"
        />
      </div>
      <FilterRow list={USER_PAGE_FILTER} />
      <div className="custom-scrollbar flex flex-col items-center flex-wrap md:flex-row md:justify-start  w-full gap-6 overflow-y-auto">
        {questions && questions.length > 0 ? (
          questions.map((item) => {
            return <QuestionCard key={item._id} item={item} />
          })
        ) : (
          <NoResult
            title="There's no question saved to show"
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

export default CollectionPage
