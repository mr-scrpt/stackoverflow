import { IAnswer } from '@/types'
import { FC, HTMLAttributes } from 'react'
import { AnswerCard } from '../AnswerCard/AnswerCard'

interface QuestionTabProps extends HTMLAttributes<HTMLDivElement> {
  list: IAnswer[]
  userId: string | undefined
}

export const AnswerTab: FC<QuestionTabProps> = (props) => {
  const { list, userId } = props
  return (
    <>
      {list.map((item) => (
        <AnswerCard
          key={item._id}
          item={item}
          isAuthor={
            !!userId &&
            JSON.stringify(item.author._id) === JSON.stringify(userId)
          }
        />
      ))}
    </>
  )
}
