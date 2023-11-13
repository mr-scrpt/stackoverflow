import { fetchQuestionBySlug } from '@/lib/actions/question.action'
import Link from 'next/link'
import Image from 'next/image'
import { Metric } from '@/components/shared/Metric/Metric'
import { formatNumber, getTimestamp } from '@/lib/utils'
import { Tag } from '@/components/shared/Tag/Tag'
import { ParseHTML } from '@/components/shared/ParseHTML/ParseHTML'
import { AnswerForm } from '@/components/shared/AnswerForm/AnswerForm'
import { auth } from '@clerk/nextjs'
import { getUserById } from '@/lib/actions/user.action'
import { AnswerList } from '@/components/shared/AnswerList/AnswerList'

const QuestionDetailsPage = async ({ params }) => {
  const { slug } = params
  const { userId } = auth()
  console.log('userId', userId)

  const user = await getUserById({ userId })

  console.log('user', user)

  const question = await fetchQuestionBySlug(slug)
  if (!question) return null
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

          <div className="flex justify-end">
            {/* <Votes */}
            {/*   type="question" */}
            {/*   itemId={JSON.stringify(question._id)} */}
            {/*   userId={JSON.stringify(mongoUser._id)} */}
            {/*   upVotes={question.upVotes.length} */}
            {/*   downVotes={question.downVotes.length} */}
            {/*   hasUpVoted={question.upVotes.includes(mongoUser._id)} */}
            {/*   hasDownVoted={question.downVotes.includes(mongoUser._id)} */}
            {/*   hasSaved={mongoUser?.saved.includes(question._id)} */}
            {/* /> */}
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
          <Tag key={tag._id} _id={tag._id} name={tag.name} showCount={false} />
        ))}
      </div>
      <AnswerList
        questionId={question._id}
        userId={JSON.stringify(user._id)}
        // totalAnswers={question.answers.length}
      />
      {user && (
        <AnswerForm
          question={question.content}
          questionId={JSON.stringify(question._id)}
          authorId={JSON.stringify(user._id)}
        />
      )}
    </section>
  )
}

export default QuestionDetailsPage
