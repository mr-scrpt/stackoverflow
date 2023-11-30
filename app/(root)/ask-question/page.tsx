import { QuestionForm } from '@/components/shared/QuestionForm/QuestionForm'
import { getUserByClerkId } from '@/lib/actions/user.action'
import { QuestionFormTypeEnum } from '@/types/shared'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

const QuestionPage = async () => {
  const { userId } = auth()
  if (!userId) redirect('/sign-in')
  const user = await getUserByClerkId(userId)
  if (!user) {
    return <div>user not found</div>
  }

  return (
    <section className="flex flex-col gap-8">
      <h1 className="h1-bold text-dark100_light900">Ask a Question</h1>

      <div className="flex flex-col">
        <QuestionForm
          userId={user._id.toString()}
          type={QuestionFormTypeEnum.CREATE}
        />
      </div>
    </section>
  )
}

export default QuestionPage
