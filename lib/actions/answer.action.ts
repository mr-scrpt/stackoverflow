'use server'

import { AnswerModel } from '@/database/answer.model'
import { revalidatePath } from 'next/cache'
import { connectToDatabase } from '../mongoose'
import {
  IAnswerVoteParams,
  ICreateAnswerParams,
  IDeleteAnswerParams,
  IGetAnswersParams,
} from '@/types/shared'
import { QuestionModel } from '@/database/question.model'
import { UserModel } from '@/database/user.model'
import { InteractionModel } from '@/database/interaction.model'
import { PAGINATION_BASE_LIMIT } from '@/constants'
import { toPlainObject } from '../utils'
import { IAnswer } from '@/types'

export const createAnswer = async (params: ICreateAnswerParams) => {
  try {
    connectToDatabase()

    const { author, content, question, path } = params
    const newAnswer = await AnswerModel.create({ author, content, question })

    if (!newAnswer) throw new Error('Answer is not created')
    // Add answer into question's answer array
    const result = await QuestionModel.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    })

    if (!result) throw new Error('Answer is not add to question')

    await InteractionModel.create({
      user: author,
      action: 'answer',
      question,
      answer: newAnswer._id,
      tags: result.tags,
    })

    // reputation + 10
    await UserModel.findByIdAndUpdate(author, { $inc: { reputation: 10 } })

    revalidatePath(path)

    return newAnswer
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const deleteAnswer = async (params: IDeleteAnswerParams) => {
  try {
    connectToDatabase()

    const { answerId, path } = params

    const answer = await AnswerModel.findById(answerId)

    if (!answer) throw new Error('Answer not found')

    // delete answer within quesiton and interaction
    await AnswerModel.deleteOne({ _id: answerId })
    await QuestionModel.updateMany(
      { answer: answerId },
      { $pull: { answers: answerId } }
    )
    await InteractionModel.deleteMany({ answer: answerId })

    revalidatePath(path)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getAnswerList = async (
  params: IGetAnswersParams
): Promise<{
  answers: IAnswer[]
  hasNextPage: boolean
  totalAnswers: number
}> => {
  try {
    connectToDatabase()
    const {
      questionId,
      sortBy,
      page = 1,
      limit = PAGINATION_BASE_LIMIT,
    } = params

    let sortOption = {}

    switch (sortBy) {
      case 'highestUpvotes':
        sortOption = { upVotes: -1 }
        break
      case 'lowestUpvotes':
        sortOption = { upVotes: 1 }
        break
      case 'recent':
        sortOption = { createdAt: -1 }
        break
      case 'old':
        sortOption = { createdAt: 1 }
        break
      default:
        sortOption = { createdAt: -1 }
        break
    }
    const skipPage = (page - 1) * limit

    const answers = await AnswerModel.find({ question: questionId })
      .populate({
        path: 'author',
        model: UserModel,
        select: '_id clerkId picture name',
      })
      .populate({
        path: 'upVotes',
        model: UserModel,
        select: '_id',
      })
      .populate({
        path: 'downVotes',
        model: UserModel,
        select: '_id',
      })
      .skip(skipPage)
      .limit(limit)
      .sort(sortOption)
    const totalAnswers = await AnswerModel.countDocuments({
      question: questionId,
    })
    const hasNextPage = totalAnswers > limit * (page - 1) + answers.length

    // answers.map((item) => item.upVotes.map((item) => console.log('item', item)))
    const answersPlain = toPlainObject(answers)
    // console.log('answersPlain', answersPlain)
    return { answers: answersPlain, hasNextPage, totalAnswers }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getAnswerListByAuthorId = async (
  authorId: string
): Promise<IAnswer[]> => {
  const answersList = await AnswerModel.find({ author: authorId })
  // if (!answersList.length) throw new Error('Answers not found')

  return toPlainObject(answersList)
}

export const getAnswerSearchByContent = async (
  content: string,
  limit?: number
): Promise<IAnswer[]> => {
  try {
    connectToDatabase()
    const regexQuery = { $regex: content, $options: 'i' }

    let query = AnswerModel.find({ content: regexQuery }).populate({
      path: 'question',
      model: QuestionModel,
      select: 'slug title',
    })
    if (limit) {
      query = query.limit(limit)
    }

    return toPlainObject(await query)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const upVoteAnswer = async (params: IAnswerVoteParams) => {
  try {
    connectToDatabase()

    const { answerId, userId, hasupVoted, hasdownVoted, path } = params

    let updateQuery = {}

    if (hasupVoted) {
      updateQuery = { $pull: { upVotes: userId } }
    } else if (hasdownVoted) {
      updateQuery = {
        $pull: { downVotes: userId },
        $push: { upVotes: userId },
      }
    } else {
      updateQuery = { $addToSet: { upVotes: userId } }
    }

    const answer = await AnswerModel.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    })

    if (!answer) throw new Error('Answer not found')

    // reputation
    if (userId !== answer.author.toString()) {
      // user reputation + 2
      await UserModel.findByIdAndUpdate(userId, {
        $inc: { reputation: hasupVoted ? -2 : 2 },
      })
      // author reputation + 10
      await UserModel.findByIdAndUpdate(answer.author, {
        $inc: { reputation: hasupVoted ? -10 : 10 },
      })
    }

    revalidatePath(path)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const downVoteAnswer = async (params: IAnswerVoteParams) => {
  try {
    connectToDatabase()

    const { answerId, userId, hasupVoted, hasdownVoted, path } = params

    let updateQuery = {}

    if (hasdownVoted) {
      updateQuery = { $pull: { downVotes: userId } }
    } else if (hasupVoted) {
      updateQuery = {
        $pull: { upVotes: userId },
        $push: { downVotes: userId },
      }
    } else {
      updateQuery = { $addToSet: { downVotes: userId } }
    }

    const answer = await AnswerModel.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    })

    if (!answer) throw new Error('Answer not found')

    if (userId !== answer.author.toString()) {
      await UserModel.findByIdAndUpdate(userId, {
        $inc: { reputation: hasdownVoted ? 2 : -2 },
      })
      await UserModel.findByIdAndUpdate(answer.author, {
        $inc: { reputation: hasdownVoted ? 10 : -10 },
      })
    }

    revalidatePath(path)
  } catch (error) {
    console.log(error)
    throw error
  }
}
