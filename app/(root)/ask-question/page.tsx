import { QuestionForm } from '@/components/shared/QuestionForm/QuestionForm'
import { getUserById } from '@/lib/actions/user.action'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { FC, HTMLAttributes } from 'react'

interface PageProps extends HTMLAttributes<HTMLDivElement> {}

const Page: FC<PageProps> = async (props) => {
  // const { userId } = auth()
  const userId = '123456'
  const user = await getUserById({ userId })
  if (!userId) redirect('/sign-in')

  return (
    <section className="flex flex-col gap-8">
      <h1 className="h1-bold text-dark100-light900">Ask a Question</h1>

      <div className="flex flex-col">
        <QuestionForm userId={user._id} />
      </div>
    </section>
  )
}

export default Page
