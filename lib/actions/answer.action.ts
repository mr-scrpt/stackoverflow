'use server'

import { AnswerModel } from '@/database/answer.model'
import { revalidatePath } from 'next/cache'
import { connectToDatabase } from '../mongoose'
import { ICreateAnswerParams, IGetAnswersParams } from '@/types/shared'
import { QuestionModel } from '@/database/question.model'
import { UserModel } from '@/database/user.model'

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
