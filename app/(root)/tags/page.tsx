import { FilterContent } from '@/components/shared/FilterContent/FilterContent'
import { FilterRowContent } from '@/components/shared/FilterRowContend/FilterRowContent'
import { NoResult } from '@/components/shared/NoResult/NoResult'
import { PaginationContent } from '@/components/shared/PaginationContent/PaginationContent'
import { SearchLocal } from '@/components/shared/SearchLocal/SearchLocal'
import { TagCard } from '@/components/shared/TagCard/TagCard'
import { TAG_PAGE_FILTER } from '@/constants/filters'
import { fetchTagList } from '@/lib/actions/tag.action'
import { ISearchParamsProps } from '@/types'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tags list | Dev Overflow',
  description: 'Popular tags from Dev Overflow site community',
}

const TagsPage = async (props: ISearchParamsProps) => {
  const { searchParams } = props
  const { q, filter, page } = searchParams

  const { tagList, hasNextPage } = await fetchTagList({
    q,
    filter,
    page: page ? +page : 1,
  })

  return (
    <section className="flex flex-col gap-8">
      <h1 className="h1-bold text-dark100_light900">Tags list</h1>

      <div className="flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <SearchLocal route="/tags" placeholder="Search tags" />
        <FilterContent
          list={TAG_PAGE_FILTER}
          classTrigger="min-h-[56px] sm:min-w-[170px] bg-light-700 dark:bg-dark-400"
          className="hidden max-md:flex"
        />
      </div>
      <FilterRowContent list={TAG_PAGE_FILTER} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 custom-scrollbar overflow-y-auto">
        {tagList.length > 0 ? (
          tagList.map((tag) => {
            return <TagCard key={tag._id} tag={tag} />
          })
        ) : (
          <NoResult
            title="Mo Tags Found"
            description="it looks like there are no tags found."
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
      <PaginationContent
        hasNextPage={hasNextPage}
        pageCurrent={page ? +page : 1}
      />

      {/* <div className="flex flex-col"></div> */}
    </section>
  )
}

export default TagsPage
