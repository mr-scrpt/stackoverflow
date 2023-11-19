import { QuestionForm } from '@/components/shared/QuestionForm/QuestionForm'
import { fetchQuestionBySlug } from '@/lib/actions/question.action'
import { getUserById } from '@/lib/actions/user.action'
import { QuestionFormTypeEnum } from '@/types/shared'
import { auth } from '@clerk/nextjs'

interface EditQuestionDetailsProps {
  params: {
    slug: string
  }
}
const EditQuestionPage = async ({ params }: EditQuestionDetailsProps) => {
  const { slug } = params

  const { userId } = auth()

  if (!userId) return null

  const user = await getUserById(userId)
  const question = await fetchQuestionBySlug(slug)

  if (!user) return null

  return (
    <section className="flex flex-col gap-8">
      <h1 className="h1-bold text-dark100_light900">Edit question</h1>

      {/* <div className="flex justify-between gap-5 max-sm:flex-col sm:items-center"></div> */}
      <div className="custom-scrollbar flex flex-col items-center flex-wrap md:flex-row md:justify-start  w-full gap-6 overflow-y-auto">
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
