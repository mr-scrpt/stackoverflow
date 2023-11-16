import { IAnswer } from '@/types'
import { FC, HTMLAttributes } from 'react'
import { AnswerCard } from '../AnswerCard/AnswerCard'

interface QuestionTabProps extends HTMLAttributes<HTMLDivElement> {
  list: IAnswer[]
}

export const AnswerTab: FC<QuestionTabProps> = (props) => {
  const { list } = props
  console.log('list', list)
  return (
    <>
      {list.map((item) => (
        <AnswerCard key={item._id} item={item} />
      ))}
    </>
  )
}
