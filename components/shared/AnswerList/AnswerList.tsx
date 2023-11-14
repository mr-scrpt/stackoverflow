import { getAnswerList } from '@/lib/actions/answer.action'
import { getTimestamp } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { FC, HTMLAttributes } from 'react'
import { ParseHTML } from '../ParseHTML/ParseHTML'

interface AnswerListProps extends HTMLAttributes<HTMLDivElement> {
  questionId: string
  userId: string
  page?: number
  filter?: number
}

export const AnswerList: FC<AnswerListProps> = async (props) => {
  const { questionId } = props
  const answerList = await getAnswerList({ questionId })
  console.log('answerList', answerList)
  if (!answerList) {
    return null
  }
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient">{answerList.length} Answers</h3>

        {/* <Filter filters={AnswerFilters} /> */}
      </div>

      <div>
        {answerList.map((answer) => (
          <article key={answer._id} className="light-border border-b py-10">
            <div className="mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
              <Link
                href={`/profile/${answer.author.clerkId}`}
                className="flex flex-1 items-start gap-1.5 sm:items-center"
              >
                <Image
                  src={answer.author.picture}
                  width={22}
                  height={22}
                  alt="profile"
                  className="rounded-full object-cover"
                />
                <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center">
                  <span className="body-semibold text-dark300_light700">
                    {answer.author.name}
                  </span>

                  <span className="small-regular text-light400_light500 line-clamp-1">
                    answered - {getTimestamp(answer.createdAt)}
                  </span>
                </div>
              </Link>
              <div className="flex justify-end">
                {/* <Votes */}
                {/*   type="answer" */}
                {/*   itemId={JSON.stringify(answer._id)} */}
                {/*   userId={userId} */}
                {/*   upVotes={answer.upVotes.length} */}
                {/*   downVotes={answer.downVotes.length} */}
                {/*   hasUpVoted={answer.upVotes.includes(userId)} */}
                {/*   hasDownVoted={answer.downVotes.includes(userId)} */}
                {/* /> */}
              </div>
            </div>
            <ParseHTML data={answer.content} />
          </article>
        ))}
      </div>
    </div>
  )
}
