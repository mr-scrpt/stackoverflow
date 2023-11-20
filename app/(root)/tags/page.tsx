import { Filter } from '@/components/shared/Filter/Filter'
import { FilterRowContent } from '@/components/shared/FilterContend/FilterContent'
import { FilterRow } from '@/components/shared/FilterRow/FilterRow'
import { NoResult } from '@/components/shared/NoResult/NoResult'
import { SearchLocal } from '@/components/shared/SearchLocal/SearchLocal'
import { TagCard } from '@/components/shared/TagCard/TagCard'
import { TAG_PAGE_FILTER } from '@/constants/filters'
import { fetchTagList } from '@/lib/actions/tag.action'
import { ISearchParamsProps } from '@/types'

const TagsPage = async (props: ISearchParamsProps) => {
  const { searchParams } = props

  const { tagList } = await fetchTagList({
    q: searchParams.q,
    filter: searchParams.filter,
  })
  return (
    <section className="flex flex-col gap-8">
      <h1 className="h1-bold text-dark100_light900">Tags list</h1>

      <div className="flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <SearchLocal route="/tags" placeholder="Search tags" />
        <Filter
          list={TAG_PAGE_FILTER}
          classTrigger="min-h-[56px] sm:min-w-[170px] bg-light-700 dark:bg-dark-400"
          className="hidden max-md:flex"
        />
      </div>
      <FilterRowContent list={TAG_PAGE_FILTER} />
      <div className="custom-scrollbar flex flex-col items-center flex-wrap md:flex-row md:justify-start  w-full gap-6 overflow-y-auto">
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

      <div className="flex flex-col"></div>
    </section>
  )
}

export default TagsPage
