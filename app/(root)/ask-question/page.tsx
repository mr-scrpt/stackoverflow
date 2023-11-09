import { QuestionForm } from '@/components/shared/QuestionForm/QuestionForm'
import { redirect } from 'next/navigation'
import { FC, HTMLAttributes } from 'react'

interface PageProps extends HTMLAttributes<HTMLDivElement> {}

const Page: FC<PageProps> = (props) => {
  const userId = '123456'

  if (!userId) redirect('/sign-in')

  // const mongoUser = await getUserById({ userId })

  return (
    <section className="flex flex-col gap-8">
      <h1 className="h1-bold text-dark100-light900">Ask a Question</h1>

      <div className="flex flex-col">
        <QuestionForm />
      </div>
    </section>
  )
}

export default Page
