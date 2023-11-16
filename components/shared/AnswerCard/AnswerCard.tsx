import { formatNumber, getTimestamp } from '@/lib/utils'
import { IAnswer } from '@/types'
import Link from 'next/link'
import { FC, HTMLAttributes } from 'react'
import { Metric } from '../Metric/Metric'

interface AnswerCardProps extends HTMLAttributes<HTMLDivElement> {
  item: IAnswer
}

export const AnswerCard: FC<AnswerCardProps> = (props) => {
  const { item } = props
  const { question, author } = item
  console.log('question $$$$', question)
  return (
    <div
      // href={`/question/${question.slug}/#${item._id}`}
      className="card-wrapper rounded-[10px] px-11 py-9"
    >
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {/* {getTimestamp(createdAt)} */}
          </span>

          <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
            <Link href={`/question/${question.slug}/#${item._id}`}>
              {question.title}
            </Link>
          </h3>
        </div>

        {/* <SignedIn>
          {showActionButtons && (
            <EditDeleteAction type="Answer" itemId={JSON.stringify(_id)} />
          )}
        </SignedIn> */}
      </div>

      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl={author.picture}
          alt="user avatar"
          value={author.name}
          title={` • asked ${getTimestamp(item.createdAt)}`}
          href={`/profile/${author.clerkId}`}
          textStyles="body-medium text-dark400_light700"
          isAuthor
        />

        <div className="flex-center gap-3">
          <Metric
            imgUrl="/assets/icons/like.svg"
            alt="like icon"
            value={formatNumber(item.upVotes.length)}
            title=" Votes"
            textStyles="small-medium text-dark400_light800"
          />
        </div>
      </div>
    </div>
  )
}
