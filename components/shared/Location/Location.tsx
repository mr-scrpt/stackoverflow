import { FC, HTMLAttributes } from 'react'
import Image from 'next/image'

interface LocationProps extends HTMLAttributes<HTMLDivElement> {
  job_country?: string
  job_city?: string
  job_state?: string
}

export const Location: FC<LocationProps> = (props) => {
  const { job_state, job_city, job_country } = props
  return (
    <div className="bg-light800_dark400 flex items-center justify-end gap-2 rounded-2xl px-3 py-1.5">
      <Image
        src={`https://flagsapi.com/${job_country}/flat/64.png`}
        alt="country symbol"
        width={16}
        height={16}
        className="rounded-full"
      />

      <p className="body-medium text-dark400_light700">
        {job_city && `${job_city}, `}
        {job_state && `${job_state}, `}
        {job_country && `${job_country}`}
      </p>
    </div>
  )
}
