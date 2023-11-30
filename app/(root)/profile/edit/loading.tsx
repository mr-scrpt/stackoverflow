import { Skeleton } from '@/components/ui/skeleton'

const Loading = () => {
  return (
    <section>
      <div className="grid grid-cols w-full gap-4 sm:flex-row sm:items-center">
        <Skeleton className="h-14 flex-1 mb-8" />
        <Skeleton className="h-4 flex-1 w-1/2" />
        <Skeleton className="h-14 flex-1 mb-8" />
        <Skeleton className="h-4 flex-1 w-1/2" />
        <Skeleton className="h-14 flex-1 mb-8" />
        <Skeleton className="h-4 flex-1 w-1/2" />
        <Skeleton className="h-14 flex-1 mb-8" />
        <Skeleton className="h-4 flex-1 w-1/2" />
        <Skeleton className="h-14 flex-1 mb-8" />
        <Skeleton className="h-14 flex-1 w-44" />
      </div>
    </section>
  )
}

export default Loading
