import { FilterContent } from '@/components/shared/FilterContent/FilterContent'
import { JobCard } from '@/components/shared/JobCard/JobCard'
import { PaginationContent } from '@/components/shared/PaginationContent/PaginationContent'
import {
  fetchCountries,
  fetchJobs,
  fetchLocation,
} from '@/lib/actions/job.action'
import { ISearchParamsProps } from '@/types'

const JobPage = async (props: ISearchParamsProps) => {
  const { searchParams } = props
  const { page, filter } = searchParams
  const userLocation = await fetchLocation()

  const jobs = await fetchJobs({
    query: filter ? `${filter}` : `${userLocation}`,
    page: page ? +page : 1,
  })

  const countries = await fetchCountries()
  // const page = parseInt(page ?? 1)

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Jobs</h1>

      <div className="flex">
        {/* <JobsFilter countriesList={countries} /> */}
        <FilterContent
          list={countries}
          classTrigger="min-h-[56px] sm:min-w-[170px] bg-light-700 dark:bg-dark-400"
          className="flex"
          defaultValue={userLocation}
        />
      </div>

      <section className="light-border mb-9 mt-11 flex flex-col gap-9 border-b pb-9">
        {jobs.length > 0 ? (
          jobs.map((job) => {
            if (job.job_title && job.job_title.toLowerCase() !== 'undefined')
              return <JobCard key={job.id} job={job} />

            return null
          })
        ) : (
          <div className="paragraph-regular text-dark200_light800 w-full text-center">
            Oops! We couldn&apos;t find any jobs at the moment. Please try again
            later
          </div>
        )}
      </section>

      {jobs.length > 0 && (
        <PaginationContent
          pageCurrent={page ? +page : 1}
          hasNextPage={jobs.length === 10}
        />
      )}
    </div>
  )
}

export default JobPage
