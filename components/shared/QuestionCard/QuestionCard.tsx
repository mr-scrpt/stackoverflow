import { IQuestion } from '@/types'
import { FC, HTMLAttributes } from 'react'
import { Tag } from '../Tag/Tag'
import Link from 'next/link'
import { formatNumber, getTimestamp, parseHTMLToString } from '@/lib/utils'
import { Metric } from '../Metric/Metric'
import { ParseHTML } from '../ParseHTML/ParseHTML'

interface QuestionCardProps extends HTMLAttributes<HTMLDivElement> {
  item: IQuestion
}

export const QuestionCard: FC<QuestionCardProps> = (props) => {
  const {
    title,
    slug,
    tags,
    author,
    upVotes,
    views,
    answers,
    createdAt,
    content,
  } = props.item
  return (
    <div className="flex flex-col gap-2 card-wrapper rounded-[10px] p-2 sm:p-4">
      <div className="flex flex-col items-start justify-between gap-1">
        <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
          {/* for mobile size */}
          {getTimestamp(createdAt)}
        </span>
        <Link href={`/question/${slug}`}>
          <h3 className="sm:h3-semibold base-semibold text-dark200_light900 flex-1">
            {title}
          </h3>
        </Link>
        <div className="text-dark400_light700 ">
          <h3 className="text-[13px] leading-[15px]  opacity-50 break-all">
            {parseHTMLToString(content.substring(0, 100))}...
          </h3>
        </div>
      </div>

      {/* if signed in add edit delete actions */}

      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Tag key={tag._id} _id={tag._id} name={tag.name} slug={tag.slug} />
        ))}
      </div>

      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        {/* question author */}
        <Metric
          imgUrl={author.picture}
          value={author.username}
          alt="user"
          title={` - asked ${getTimestamp(createdAt)}`}
          href={`/profile/${author.username}`}
          textStyles="body-medium text-dark400_light700"
        />
        {/* likes, answer, views */}
        <div className="flex items-center gap-3 max-sm:flex-wrap max-sm:justify-start">
          <Metric
            imgUrl="/assets/icons/like.svg"
            value={formatNumber(upVotes.length)}
            alt="UpVotes"
            title="Votes"
            textStyles="small-medium text-dark400_light800"
          />
          <Metric
            imgUrl="/assets/icons/message.svg"
            value={formatNumber(answers.length)}
            alt="Message"
            title="Answers"
            textStyles="small-medium text-dark400_light800"
          />
          <Metric
            imgUrl="/assets/icons/eye.svg"
            value={formatNumber(views)}
            alt="eye"
            title="Views"
            textStyles="small-medium text-dark400_light800"
          />
        </div>
      </div>
    </div>
  )
}
