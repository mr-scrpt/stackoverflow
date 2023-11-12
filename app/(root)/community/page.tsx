// interface pageProps extends HTMLAttributes<HTMLDivElement> {}

import { Filter } from '@/components/shared/Filter/Filter'
import { FilterRow } from '@/components/shared/FilterRow/FilterRow'
import { SearchLocal } from '@/components/shared/SearchLocal/SearchLocal'
import { USER_PAGE_FILTER } from '@/constants/filters'

const CommunityPage = () => {
  console.log('init')
  console.log('list filter', USER_PAGE_FILTER)
  return (
    <section className="flex flex-col gap-8">
      <h1 className="h1-bold text-dark100_light900">Community Page</h1>

      <div className="flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <SearchLocal route="/community" placeholder="Search users" />
        <Filter
          list={USER_PAGE_FILTER}
          classTrigger="min-h-[56px] sm:min-w-[170px] bg-light-700 dark:bg-dark-400"
          className="hidden max-md:flex"
        />
      </div>
      <FilterRow list={USER_PAGE_FILTER} />
      <div className="custom-scrollbar flex w-full flex-col gap-6 overflow-y-auto">
        {/* {questions.length ? ( */}
        {/*   questions.map((item) => <QuestionCard key={item._id} item={item} />) */}
        {/* ) : ( */}
        {/*   <NoResult */}
        {/*     title="There's no question to show" */}
        {/*     description="Be the first to break the silence! 🚀 Ask a Question and kickstart the */}
        {/* discussion. our query could be the next big thing others learn from. Get */}
        {/* involved! 💡" */}
        {/*     link="/ask-question" */}
        {/*     linkTitle="Ask a Question" */}
        {/*   /> */}
        {/* )} */}
      </div>
    </section>
  )
}

export default CommunityPage
