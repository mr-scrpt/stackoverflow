'use server'

import { IViewQuestionParams } from '@/types/shared'
import { connectToDatabase } from '../mongoose'
import { QuestionModel } from '@/database/question.model'
import { InteractionModel } from '@/database/interaction.model'
import { getQuestion } from './question.action'
import { revalidatePath } from 'next/cache'

export async function viewQuestion(params: IViewQuestionParams) {
  try {
    connectToDatabase()

    const { userId, questionId } = params

    // check if user viewed already
    if (userId) {
      const existingInteraction = await InteractionModel.findOne({
        user: userId,
        action: 'view',
        question: questionId,
      })

      if (existingInteraction) return console.log('User has already viewed')

      const question = await getQuestion(questionId)

      // Create interaction
      await InteractionModel.create({
        user: userId,
        action: 'view',
        question: questionId,
        tags: question?.tags,
      })

      // Update view count for the question
      await QuestionModel.findByIdAndUpdate(
        questionId,
        {
          $inc: { views: 1 }, // increment
        },
        { new: true }
      )
      revalidatePath('/community')
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}
