import { Filter } from '@/components/shared/Filter/Filter'
import { FilterRow } from '@/components/shared/FilterRow/FilterRow'
import { NoResult } from '@/components/shared/NoResult/NoResult'
import { QuestionCard } from '@/components/shared/QuestionCard/QuestionCard'
import { SearchLocal } from '@/components/shared/SearchLocal/SearchLocal'
import { HOME_PAGE_FILTER } from '@/constants/filters'
import { getQuestionByTagSlug } from '@/lib/actions/question.action'
import { ISearchParam } from '@/types'
import { HTMLAttributes } from 'react'

interface TagPageProps extends HTMLAttributes<HTMLDivElement> {
  params: {
    slug: string
  }
  searchParams?: ISearchParam
}

const TagPage = async ({ params, searchParams }: TagPageProps) => {
  const { slug } = params

  // const { userId } = auth()
  console.log('searchParams', searchParams)

  const { tagTitle, questions } = await getQuestionByTagSlug({ slug })
  // const tag = await getTagBySlug(slug)

  return (
    <section className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
          <h1 className="h1-bold text-dark100_light900">
            Current tag: [ {tagTitle} ]
          </h1>
        </div>
      </div>
      <div className="flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <SearchLocal route="/" placeholder="Search questions" />
        <Filter
          list={HOME_PAGE_FILTER}
          classTrigger="min-h-[56px] sm:min-w-[170px] bg-light-700 dark:bg-dark-400"
          className="hidden max-md:flex"
        />
      </div>
      <FilterRow list={HOME_PAGE_FILTER} />

      <div className="custom-scrollbar flex w-full flex-col gap-6 overflow-y-auto">
        {questions && questions.length ? (
          questions.map((item) => <QuestionCard key={item._id} item={item} />)
        ) : (
          <NoResult
            title="There's no tag question to show"
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

export default TagPage
