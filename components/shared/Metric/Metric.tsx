import { FC, HTMLAttributes } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface MetricProps extends HTMLAttributes<HTMLDivElement> {
  imgUrl: string
  alt: string
  title: string
  value: string | number
  href?: string
  textStyles?: string
  isAuthor?: boolean
}

export const Metric: FC<MetricProps> = (props) => {
  const { imgUrl, alt, value, title, href, textStyles, isAuthor } = props
  const metricContent = (
    <div className={`${textStyles} flex items-center gap-1`}>
      <Image
        src={imgUrl}
        alt={alt}
        width={16}
        height={16}
        className={`object-contain ${href ? 'rounded-full' : ''}`}
      />
      <span>{value}</span>
      <span
        className={`small-regular line-clamp-1 ${
          isAuthor ? 'max-sm:hidden' : ''
        }`}
      >
        {title}
      </span>
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="flex-center gap-1">
        {metricContent}
      </Link>
    )
  }

  return <div className="flex-center flex-wrap gap-1">{metricContent}</div>
}
