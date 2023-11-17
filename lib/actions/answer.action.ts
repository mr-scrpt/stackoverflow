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

export const createAnswer = async (params: ICreateAnswerParams) => {
  try {
    connectToDatabase()

    const { author, content, question, path } = params
    const newAnswer = await AnswerModel.create({ author, content, question })

    // Add answer into question's answer array
    await QuestionModel.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    })

    // TODO: Add interaction...

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

export const getAnswerList = async (params: IGetAnswersParams) => {
  try {
    connectToDatabase()
    const { questionId } = params

    const answers = await AnswerModel.find({ question: questionId })
      .populate({
        path: 'author',
        model: UserModel,
        select: '_id clerkId picture name',
      })
      .sort({ createdAt: -1 })

    return answers
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

    // TODO: interaction

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

    // TODO: interaction

    revalidatePath(path)
  } catch (error) {
    console.log(error)
    throw error
  }
}
