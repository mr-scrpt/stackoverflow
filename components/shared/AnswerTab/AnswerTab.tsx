import { IAnswer } from '@/types'
import { FC, HTMLAttributes } from 'react'
import { AnswerCard } from '../AnswerCard/AnswerCard'

interface QuestionTabProps extends HTMLAttributes<HTMLDivElement> {
  list: IAnswer[]
  userId: string
}

export const AnswerTab: FC<QuestionTabProps> = (props) => {
  const { list, userId } = props
  console.log('', userId)
  // console.log('list', list)
  return (
    <>
      {list.map((item) => (
        <AnswerCard
          key={item._id}
          item={item}
          isAuthor={JSON.stringify(item.author._id) === JSON.stringify(userId)}
        />
      ))}
    </>
  )
}
