// interface pageProps extends HTMLAttributes<HTMLDivElement> {}

import { FilterContent } from '@/components/shared/FilterContent/FilterContent'
import { FilterRowContent } from '@/components/shared/FilterRowContend/FilterRowContent'
import { SearchLocal } from '@/components/shared/SearchLocal/SearchLocal'
import { UserCard } from '@/components/shared/UserCard/UserCard'
import { USER_PAGE_FILTER } from '@/constants/filters'
import { getAllUsers } from '@/lib/actions/user.action'
import { ISearchParamsProps } from '@/types'
import Link from 'next/link'

const CommunityPage = async (props: ISearchParamsProps) => {
  const { searchParams } = props
  const users = await getAllUsers({
    q: searchParams.q,
    filter: searchParams.filter,
  })
  return (
    <section className="flex flex-col gap-8">
      <h1 className="h1-bold text-dark100_light900">Community Page</h1>

      <div className="flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <SearchLocal route="/community" placeholder="Search users" />
        <FilterContent
          list={USER_PAGE_FILTER}
          classTrigger="min-h-[56px] sm:min-w-[170px] bg-light-700 dark:bg-dark-400"
          className="hidden max-md:flex"
        />
      </div>
      <FilterRowContent list={USER_PAGE_FILTER} />
      <div className="custom-scrollbar flex flex-col items-center flex-wrap md:flex-row md:justify-start  w-full gap-6 overflow-y-auto">
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
      </div>
    </section>
  )
}

export default CommunityPage
