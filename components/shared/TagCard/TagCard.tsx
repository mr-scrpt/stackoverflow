import { ITag } from '@/types'
import Link from 'next/link'
import { FC, HTMLAttributes } from 'react'

interface TagCardProps extends HTMLAttributes<HTMLDivElement> {
  tag: ITag
}

export const TagCard: FC<TagCardProps> = (props) => {
  const { tag } = props
  return (
    <article className="bg-light900_dark200 rounded-2xl border light-border shadow-light100_darknone w-full max-xs:min-w-full xs:w-[260px] flex flex-col gap-8 py-8 px-4">
      <div className="w-full">
        <Link
          href={`/tags/${tag.name}`}
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

      <div className="text-dark400_light500 small-medium flex items-center py-1 gap-2">
        <span className="primary-text-gradient body-semibold">
          {tag.questions?.length}+
        </span>

        <span>Questions</span>
      </div>
    </article>
  )
}
