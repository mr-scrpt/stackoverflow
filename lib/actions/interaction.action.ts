'use server'

import { IViewQuestionParams } from '@/types/shared'
import { connectToDatabase } from '../mongoose'
import { QuestionModel } from '@/database/question.model'
import { InteractionModel } from '@/database/interaction.model'

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
      console.log('existingInteraction', existingInteraction)

      if (existingInteraction) return console.log('User has already viewed')

      // Create interaction
      await InteractionModel.create({
        user: userId,
        action: 'view',
        question: questionId,
      })

      // Update view count for the question
      await QuestionModel.findByIdAndUpdate(
        questionId,
        {
          $inc: { views: 1 }, // increment
        },
        { new: true }
      )
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}
