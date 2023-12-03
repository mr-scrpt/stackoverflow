import { IQuestion } from '@/types'
import { FC, HTMLAttributes } from 'react'
import { QuestionCard } from '../QuestionCard/QuestionCard'

interface QuestionTabProps extends HTMLAttributes<HTMLDivElement> {
  list: IQuestion[]
  userId: string | undefined
  // hasNextPage: boolean
  // pageCurrent: number
}

export const QuestionTab: FC<QuestionTabProps> = (props) => {
  const { list, userId } = props
  return (
    <>
      {list.map((question) => {
        return (
          <QuestionCard
            key={question._id}
            item={question}
            isAuthor={
              !!userId &&
              JSON.stringify(question.author._id) === JSON.stringify(userId)
            }
          />
        )
      })}
    </>
  )
}
