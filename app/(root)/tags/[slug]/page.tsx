import { FilterContent } from '@/components/shared/FilterContent/FilterContent'
import { FilterRowContent } from '@/components/shared/FilterRowContend/FilterRowContent'
import { NoResult } from '@/components/shared/NoResult/NoResult'
import { PaginationContent } from '@/components/shared/PaginationContent/PaginationContent'
import { QuestionCard } from '@/components/shared/QuestionCard/QuestionCard'
import { SearchLocal } from '@/components/shared/SearchLocal/SearchLocal'
import { HOME_PAGE_FILTER } from '@/constants/filters'
import { getQuestionByTagSlug } from '@/lib/actions/question.action'
import { getUserById } from '@/lib/actions/user.action'
import { ISearchParam } from '@/types'
import { auth } from '@clerk/nextjs'

interface TagPageProps {
  params: {
    slug: string
  }
  searchParams: ISearchParam
}

const TagPage = async (props: TagPageProps) => {
  const { params, searchParams } = props
  const { q, filter, page } = searchParams
  const { slug } = params

  const { tagTitle, questions, hasNextPage } = await getQuestionByTagSlug({
    slug,
    q,
    filter,
    page: page ? +page : 1,
  })
  const { userId: clerkId } = auth()
  const userActual = await getUserById(clerkId)

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
        <SearchLocal
          route={`/tags/${params.slug}`}
          placeholder="Search questions"
        />
        <FilterContent
          list={HOME_PAGE_FILTER}
          classTrigger="min-h-[56px] sm:min-w-[170px] bg-light-700 dark:bg-dark-400"
          className="hidden max-md:flex"
        />
      </div>
      <FilterRowContent list={HOME_PAGE_FILTER} />

      <div className="custom-scrollbar flex w-full flex-col gap-6 overflow-y-auto">
        {questions && questions.length ? (
          questions.map((item) => (
            <QuestionCard
              key={item._id}
              item={item}
              isAuthor={!!userActual && item.author._id === userActual._id}
            />
          ))
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
      <PaginationContent
        hasNextPage={hasNextPage}
        pageCurrent={page ? +page : 1}
      />
    </section>
  )
}

export default TagPage
