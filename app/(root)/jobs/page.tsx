import { FilterContent } from '@/components/shared/FilterContent/FilterContent'
import { JobCard } from '@/components/shared/JobCard/JobCard'
import { NoResult } from '@/components/shared/NoResult/NoResult'
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
    <section className="flex flex-col gap-8">
      <div className="flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <h1 className="h1-bold text-dark100_light900">Jobs list</h1>

        {/* <JobsFilter countriesList={countries} /> */}
        <FilterContent
          list={countries}
          classTrigger="min-h-[56px] sm:min-w-[170px] bg-light-700 dark:bg-dark-400"
          className="flex"
          defaultValue={userLocation}
        />
      </div>

      <div className="custom-scrollbar flex w-full flex-col flex-wrap items-center gap-6  overflow-y-auto md:flex-row md:justify-start">
        {jobs && jobs.length > 0 ? (
          jobs.map((job) => {
            if (job.job_title && job.job_title.toLowerCase() !== 'undefined')
              return <JobCard key={job.id} job={job} />

            return null
          })
        ) : (
          <NoResult
            title="There are no vacancies"
            description="Don't despair!🥲 Try choosing a different region for your vacancy search  🌍"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>

      {jobs && jobs.length > 0 && (
        <PaginationContent
          pageCurrent={page ? +page : 1}
          hasNextPage={jobs.length === 10}
        />
      )}
    </section>
  )
}

export default JobPage
