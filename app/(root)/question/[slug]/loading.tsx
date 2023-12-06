import { Skeleton } from '@/components/ui/skeleton'
import { arrayGen } from '@/lib/utils'

const Loading = () => {
  return (
    <section>
      <div className="flex w-full flex-row flex-wrap justify-between gap-4 sm:items-center">
        <div className="flex w-full items-center justify-between gap-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="mr-auto h-6 w-[250px]" />
          <Skeleton className="h-6 w-[200px]" />
        </div>
        <div className="flex w-full flex-wrap items-center justify-between gap-5">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full max-w-[300px]" />
        </div>
      </div>
      <div className=" my-8 flex w-full">
        <Skeleton className="h-56 w-full rounded-xl" />
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
