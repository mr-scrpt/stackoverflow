import { FC, HTMLAttributes } from 'react'
import { QuestionCard } from '../QuestionCard/QuestionCard'
import { IQuestion } from '@/types'

interface QuestionTabProps extends HTMLAttributes<HTMLDivElement> {
  list: IQuestion[]
  userId: string | undefined
}

export const QuestionTab: FC<QuestionTabProps> = (props) => {
  const { list, userId } = props
  return (
    <>
      {list.map((question) => {
        // console.log('question.author._id', question.author._id)
        // console.log('userId', userId)
        // console.log('is equal', question.author._id === userId)
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
