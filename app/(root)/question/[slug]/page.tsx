import { AnswerForm } from '@/components/shared/AnswerForm/AnswerForm'
import { AnswerList } from '@/components/shared/AnswerList/AnswerList'
import { Metric } from '@/components/shared/Metric/Metric'
import { ParseHTML } from '@/components/shared/ParseHTML/ParseHTML'
import { Tag } from '@/components/shared/Tag/Tag'
import { VoteBar } from '@/components/shared/VoteBar/VoteBar'
import { fetchQuestionBySlug } from '@/lib/actions/question.action'
import { getUserByClerkId } from '@/lib/actions/user.action'
import { formatNumber, getTimestamp } from '@/lib/utils'
import { ISearchParam } from '@/types'
import { VoteTypeEnum } from '@/types/shared'
import { auth } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'

interface QuestionDetailsProps {
  params: {
    slug: string
  }
  searchParams: ISearchParam
}

const QuestionDetailsPage = async (props: QuestionDetailsProps) => {
  const { searchParams, params } = props
  const { filter, page } = searchParams
  const { slug } = params
  const { userId } = auth()

  const user = await getUserByClerkId(userId)
  console.log('user::', user)

  const question = await fetchQuestionBySlug(slug)
  if (!question) return null
  console.log('question', question)

  return (
    <section className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Link
            href={`/profile/${question.author.username}`}
            className="flex items-center justify-start gap-1"
          >
            <Image
              src={question.author.picture}
              alt="profile"
              width={22}
              height={22}
              className="rounded-full"
            />

            <span className="paragraph-semibold text-dark300_light700">
              {question.author.name}
            </span>
          </Link>

          {/* {question.upVotes.map(item=>item._id)} */}
          <div className="flex justify-end">
            {user && (
              <VoteBar
                type={VoteTypeEnum.QUESTION}
                itemId={question._id.toString()}
                userId={user?._id.toString()}
                upVotes={question.upVotes.length}
                downVotes={question.downVotes.length}
                hasUpVoted={question.upVotes.some(
                  (item) => item._id === user?._id
                )}
                hasDownVoted={question.downVotes.some(
                  (item) => item._id === user?._id
                )}
                hasSaved={user?.postSaved?.some(
                  (item) => item._id === question._id
                )}
              />
            )}
          </div>
        </div>
        <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
          <h1 className="h1-bold text-dark100_light900">{question?.title}</h1>
        </div>
        <div className="flex flex-wrap gap-4">
          <Metric
            imgUrl="/assets/icons/clock.svg"
            value={` asked ${getTimestamp(question.createdAt)}`}
            alt="clock icon"
            title=""
            textStyles="small-medium text-dark400_light800"
          />
          <Metric
            imgUrl="/assets/icons/message.svg"
            value={formatNumber(question.answers.length)}
            alt="Message"
            title="Answers"
            textStyles="small-medium text-dark400_light800"
          />
          <Metric
            imgUrl="/assets/icons/eye.svg"
            value={formatNumber(question.views)}
            alt="eye"
            title="Views"
            textStyles="small-medium text-dark400_light800"
          />
        </div>
      </div>

      <ParseHTML data={question.content} />
      <div className="flex flex-wrap gap-2">
        {question.tags.map((tag: any) => (
          <Tag
            key={tag._id}
            _id={tag._id}
            name={tag.name}
            showCount={false}
            slug={tag.slug}
          />
        ))}
      </div>
      <AnswerList
        questionId={question._id}
        userId={user?._id}
        filter={filter}
        page={page}
        // totalAnswers={question.answers.length}
      />
      {user && (
        <AnswerForm
          question={question.content}
          questionId={question._id}
          authorId={user._id}
        />
      )}
    </section>
  )
}

export default QuestionDetailsPage
