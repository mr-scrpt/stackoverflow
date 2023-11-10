'use server'

import { QuestionModel } from '@/database/question.model'
import { connectToDatabase } from '../mongoose'
import { TagModel } from '@/database/tag.model'
import { revalidatePath } from 'next/cache'

export const createQuestion = async (params: any) => {
  try {
    connectToDatabase()
    const { title, content, tags, author, path } = params

    const question = await QuestionModel.create({
      title,
      content,
      author,
    })

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
