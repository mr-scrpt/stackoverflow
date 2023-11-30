'use client'
import { useRouter } from 'next/navigation'
import { HTMLAttributes, startTransition } from 'react'

interface ErrorProps extends HTMLAttributes<HTMLDivElement> {
  error: Error & { digest?: string }
  reset: () => void
}

const Error = (props: ErrorProps) => {
  const { reset } = props
  const router = useRouter()
  const reload = () => {
    startTransition(() => {
      router.refresh()
      reset()
    })
  }
  return (
    <div className="text-dark200_light800">
      <button onClick={reload}>Reload</button>
    </div>
  )
}

export default Error
