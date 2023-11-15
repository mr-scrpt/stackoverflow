'use server'

import { UserModel } from '@/database/user.model'
import { connectToDatabase } from '../mongoose'
import { ICreateTagParams, IGetTopInteractedTagsParams } from '@/types/shared'
import { TagModel } from '@/database/tag.model'
import { slugGenerator } from '../utils'

export const fetchTagsByUserId = async (
  params: IGetTopInteractedTagsParams
) => {
  try {
    connectToDatabase()

    const { userId } = params

    // console.log('', limit)

    const user = await UserModel.findById(userId)

    if (!user) throw Error('user not found')

    // find interactions for the user and grown tags...
    // interaction

    return [
      { _id: '123', name: 'HTML' },
      { _id: '123', name: 'HTML' },
      { _id: '123', name: 'HTML' },
    ]
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const fetchTagList = async () => {
  try {
    connectToDatabase()
    const tagList = await TagModel.find({})

    if (!tagList) throw new Error('tag list not be fetched')

    return { tagList }
  } catch (e) {
    console.log(e)
    throw e
  }
}

export const getTagBySlug = async (slug: sting) => {
  try {
    const tag = await TagModel.findOne({ slug })
    return tag
  } catch (e) {
    console.log(e)
    throw e
  }
}

export const createTag = async (params: ICreateTagParams) => {
  try {
    connectToDatabase()

    const { name, questionId } = params

    const slug = slugGenerator(name)

    const tag = await TagModel.findOneAndUpdate(
      {
        name: { $regex: new RegExp(`^${name}$`, 'i') },
      },
      {
        $setOnInsert: { name, slug }, // do update if target found
        $push: { questions: questionId },
      },
      {
        upsert: true, // upsert if target not found
        new: true, // return new doc instead original one
      }
    )

    return { tag }
  } catch (e) {
    console.log('CREATE_TAG: ', e)
    throw e
  }
}
