import { FC, HTMLAttributes } from 'react'
import { QuestionCard } from '../QuestionCard/QuestionCard'
import { IQuestion } from '@/types'

interface QuestionTabProps extends HTMLAttributes<HTMLDivElement> {
  list: IQuestion[]
}

export const QuestionTab: FC<QuestionTabProps> = (props) => {
  const { list } = props
  return (
    <>
      {list.map((question) => (
        <QuestionCard key={question._id} item={question} />
      ))}
    </>
  )
}
