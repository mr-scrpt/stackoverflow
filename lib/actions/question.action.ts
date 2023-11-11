'use server'

import { QuestionModel } from '@/database/question.model'
import { connectToDatabase } from '../mongoose'
import { TagModel } from '@/database/tag.model'
import { revalidatePath } from 'next/cache'
import { UserModel } from '@/database/user.model'
import { ICreateQuestionParams, IGetQuestionsParams } from '@/types/shared'

export const getQuestions = async (params: IGetQuestionsParams) => {
  try {
    await connectToDatabase()
    const questions = await QuestionModel.find({})
      .populate({ path: 'tags', model: TagModel }) // Specifies paths which should be populated with other documents
      .populate({ path: 'author', model: UserModel })
      .sort({ createdAt: -1 })

    return { questions }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const createQuestion = async (params: ICreateQuestionParams) => {
  try {
    connectToDatabase()
    const { title, content, tags, author, path } = params

    const question = await QuestionModel.create({
      title,
      content,
      author,
    })

    console.log('question created', question)
    console.log('', Date.now())

    const tagDocuments = []

    for (const tag of tags) {
      const existingTag = await TagModel.findOneAndUpdate(
        {
          name: { $regex: new RegExp(`^${tag}$,"i"`) },
        },
        {
          $setOnInsert: { name: tag, $push: { question: question._id } }, // do update if target found
        },
        {
          upsert: true, // upsert if target not found
          new: true, // return new doc instead original one
        }
      )
      tagDocuments.push(existingTag._id)
    }
    await QuestionModel.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    })

    // revalidation => purge data cache and update UI
    revalidatePath(path)
  } catch (e) {
    // throw error
  }
}
