import { Skeleton } from '@/components/ui/skeleton'

const Loading = () => {
  return (
    <section>
      <div className="grid w-full grid-cols-1 gap-4 sm:flex-row sm:items-center">
        <Skeleton className="mb-8 h-14 flex-1" />
        <Skeleton className="h-4 w-1/2 flex-1" />
        <Skeleton className="mb-8 h-14 flex-1" />
        <Skeleton className="h-4 w-1/2 flex-1" />
        <Skeleton className="mb-8 h-14 flex-1" />
        <Skeleton className="h-4 w-1/2 flex-1" />
        <Skeleton className="mb-8 h-14 flex-1" />
        <Skeleton className="h-4 w-1/2 flex-1" />
        <Skeleton className="mb-8 h-14 flex-1" />
        <Skeleton className="h-14 w-44 flex-1" />
      </div>
    </section>
  )
}

export default Loading
