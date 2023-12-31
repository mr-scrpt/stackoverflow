import { FilterContent } from '@/components/shared/FilterContent/FilterContent'
import { FilterRowContent } from '@/components/shared/FilterRowContend/FilterRowContent'
import { PaginationContent } from '@/components/shared/PaginationContent/PaginationContent'
import { SearchLocal } from '@/components/shared/SearchLocal/SearchLocal'
import { UserCard } from '@/components/shared/UserCard/UserCard'
import { USER_PAGE_FILTER } from '@/constants/filters'
import { getAllUsers } from '@/lib/actions/user.action'
import { ISearchParamsProps } from '@/types'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Community | Dev Overflow',
  description: 'Meet the outstanding people here in Dev Overflow',
}

const CommunityPage = async (props: ISearchParamsProps) => {
  const { searchParams } = props
  const { q, filter, page } = searchParams
  const { users, hasNextPage } = await getAllUsers({
    q,
    filter,
    page: page ? +page : 1,
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
      <div className="custom-scrollbar grid grid-cols-1 gap-6 overflow-y-auto sm:grid-cols-2">
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
      <div>
        <PaginationContent
          hasNextPage={hasNextPage}
          pageCurrent={page ? +page : 1}
        />
      </div>
    </section>
  )
}

export default CommunityPage
