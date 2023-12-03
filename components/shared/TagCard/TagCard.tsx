import { ITag } from '@/types'
import Link from 'next/link'
import { FC, HTMLAttributes } from 'react'

interface TagCardProps extends HTMLAttributes<HTMLDivElement> {
  tag: ITag
}

export const TagCard: FC<TagCardProps> = (props) => {
  const { tag } = props
  return (
    <article className="bg-light900_dark200 light-border shadow-light100_darknone flex w-full flex-col gap-8 rounded-2xl border px-4 py-8 max-xs:min-w-full">
      <div className="w-full">
        <Link
          href={`/tags/${tag.slug}`}
          className="bg-light800_dark400 w-fit rounded-sm px-5 py-1.5"
        >
          <span className="paragraph-semibold text-dark300_light900">
            {tag.name}
          </span>
        </Link>
      </div>
      {/* <p className="text-dark500_light700 small-regular">
                  {tag.description}
                </p> */}

      <div className="text-dark400_light500 small-medium flex items-center gap-2 py-1">
        <span className="primary-text-gradient body-semibold">
          {tag.questions?.length}+
        </span>

        <span>Questions</span>
      </div>
    </article>
  )
}
