import { BadgeCriteriaType } from '@/types'
import { assignBadges } from '../utils'
import { getAnswerListByAuthorId } from './answer.action'
import { getQuestionListByAuthorId } from './question.action'

export const getBadge = async (userId: string) => {
  // get summary of every action
  // const [questionSum] = await QuestionModel.aggregate([
  //   { $match: { author: userId } },
  //   {
  //     $project: {
  //       _id: 0, // exclude
  //       upVotes: { $size: '$upVotes' }, // create a field which is the size of upVotes
  //       views: { $sum: '$views' },
  //     },
  //   },
  //   {
  //     $group: {
  //       _id: null,
  //       totalUpVotes: { $sum: '$upVotes' },
  //       totalViews: { $sum: '$views' },
  //     },
  //   },
  // ])
  //
  // const [answerUpVotes] = await AnswerModel.aggregate([
  //   { $match: { author: userId } },
  //   {
  //     $project: {
  //       _id: 0, // exclude
  //       upVotes: { $size: '$upVotes' },
  //     },
  //   },
  //   {
  //     $group: {
  //       _id: null,
  //       totalUpVotes: { $sum: '$upVotes' },
  //     },
  //   },
  // ])

  const questionsList = await getQuestionListByAuthorId(userId)
  const answersList = await getAnswerListByAuthorId(userId)

  const questionCount = questionsList.length
  const answerCount = answersList.length
  const viewTotal = questionsList.reduce((total, item) => total + item.views, 0)
  const questionUpvoteCount = questionsList.reduce(
    (total, item) => total + item.upVotes.length,
    0
  )
  const answerUpvoteCount = answersList.reduce(
    (total, item) => total + item.upVotes.length,
    0
  )
  const scores = [
    {
      type: 'QUESTION_COUNT' as BadgeCriteriaType,
      count: questionCount,
    },
    { type: 'ANSWER_COUNT' as BadgeCriteriaType, count: answerCount },
    {
      type: 'QUESTION_UPVOTES' as BadgeCriteriaType,
      count: questionUpvoteCount,
    },
    {
      type: 'ANSWER_UPVOTES' as BadgeCriteriaType,
      count: answerUpvoteCount,
    },
    {
      type: 'TOTAL_VIEWS' as BadgeCriteriaType,
      count: viewTotal || 0,
    },
  ]

  const badgeCounts = assignBadges({ criteria: scores })

  return badgeCounts
}
