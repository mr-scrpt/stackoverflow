import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { FC, HTMLAttributes } from 'react'

interface TagProps extends HTMLAttributes<HTMLDivElement> {
  _id: string | number
  slug: string
  name: string
  totalQuestions?: number
  showCount?: boolean
}

export const Tag: FC<TagProps> = (props) => {
  const { name, slug, totalQuestions, showCount } = props
  return (
    <Link href={`/tags/${slug}`} className="flex justify-between gap-2">
      <Badge className="subtle-medium bg-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase">
        {name}
      </Badge>

      {showCount && (
        <p className="small-medium text-dark500_light700">{totalQuestions}</p>
      )}
    </Link>
  )
}
