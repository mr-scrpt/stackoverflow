import { Skeleton } from '@/components/ui/skeleton'
import { arrayGen } from '@/lib/utils'

const Loading = () => {
  return (
    <section>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <Skeleton className="h-14 flex-1" />
      </div>

      <div className="mb-12 mt-11 flex flex-wrap items-center justify-between gap-5">
        <Skeleton className="h-14 flex-1" />
        <div className="hidden max-md:block">
          <Skeleton className="h-14 w-28" />
        </div>
      </div>

      <div className="my-10 hidden flex-wrap gap-6 md:flex">
        <Skeleton className="h-9 grow" />
        <Skeleton className="h-9 grow" />
        <Skeleton className="h-9 grow" />
        <Skeleton className="h-9 grow" />
      </div>

      <div className="grid grid-cols-1 gap-6">
        {arrayGen(10).map((item) => (
          <Skeleton key={item} className="h-48 rounded-xl" />
        ))}
      </div>
    </section>
  )
}

export default Loading
