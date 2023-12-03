import { QuestionForm } from '@/components/shared/QuestionForm/QuestionForm'
import { fetchQuestionBySlug } from '@/lib/actions/question.action'
import { getUserByClerkId } from '@/lib/actions/user.action'
import { QuestionFormTypeEnum } from '@/types/shared'
import { auth } from '@clerk/nextjs'
import { Metadata } from 'next'

interface EditQuestionDetailsProps {
  params: {
    slug: string
  }
}

export const metadata: Metadata = {
  title: 'Edit Question | Dev Overflow',
  description: 'Page to edit question',
}

const EditQuestionPage = async ({ params }: EditQuestionDetailsProps) => {
  const { slug } = params

  const { userId } = auth()

  if (!userId) return null

  const user = await getUserByClerkId(userId)
  const question = await fetchQuestionBySlug(slug)

  if (!user) return null

  return (
    <section className="flex flex-col gap-8">
      <h1 className="h1-bold text-dark100_light900">Edit question</h1>

      {/* <div className="flex justify-between gap-5 max-sm:flex-col sm:items-center"></div> */}
      <div className="custom-scrollbar flex w-full flex-col flex-wrap items-center gap-6  overflow-y-auto md:flex-row md:justify-start">
        <QuestionForm
          type={QuestionFormTypeEnum.EDIT}
          questionDetails={question}
          userId={user?._id}
        />
      </div>

      <div className="flex flex-col"></div>
    </section>
  )
}

export default EditQuestionPage
