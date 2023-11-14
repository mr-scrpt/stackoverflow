'use server'

import { IViewQuestionParams } from '@/types/shared'
import { connectToDatabase } from '../mongoose'
import { QuestionModel } from '@/database/question.model'
import { InteractionModel } from '@/database/interaction.model'

export async function viewQuestion(params: IViewQuestionParams) {
  try {
    connectToDatabase()

    const { userId, questionId } = params

    // Update view count for the question
    await QuestionModel.findByIdAndUpdate(
      questionId,
      {
        $inc: { views: 1 }, // increment
      },
      { new: true }
    )

    // check if user viewed already
    if (userId) {
      const existingInteraction = await InteractionModel.findOne({
        user: userId,
        action: 'view',
        question: questionId,
      })

      if (existingInteraction) return console.log('User has already viewed')

      // Create interaction
      await InteractionModel.create({
        user: userId,
        action: 'view',
        question: questionId,
      })
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}
