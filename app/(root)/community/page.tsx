// interface pageProps extends HTMLAttributes<HTMLDivElement> {}

import { Filter } from '@/components/shared/Filter/Filter'
import { FilterRow } from '@/components/shared/FilterRow/FilterRow'
import { SearchLocal } from '@/components/shared/SearchLocal/SearchLocal'
import { UserCard } from '@/components/shared/UserCard/UserCard'
import { USER_PAGE_FILTER } from '@/constants/filters'
import { getAllUsers } from '@/lib/actions/user.action'
import Link from 'next/link'

const CommunityPage = async () => {
  const { users } = await getAllUsers({})
  console.log('user =>>', users)
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
        {users.length > 0 ? (
          users.map((user) => {
            return <UserCard user={user} key={user._id} />
          })
        ) : (
          <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
            <p>No user yet</p>
            <Link href="/sign-up" className="mt-1 font-bold text-accent-blue">
              Join to be the first!
            </Link>
          </div>
        )}
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
