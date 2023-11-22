'use server'

import { UserModel } from '@/database/user.model'
import { connectToDatabase } from '../mongoose'
import {
  ICreateTagParams,
  IGetAllTagsParams,
  IGetTopInteractedTagsParams,
} from '@/types/shared'
import { TagModel } from '@/database/tag.model'
import { slugGenerator, toPlainObject } from '../utils'
import { ITag } from '@/types'
import { FilterQuery } from 'mongoose'

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
      { _id: '123', name: 'HTML', slug: 'test' },
      { _id: '123', name: 'HTML', slug: 'test' },
      { _id: '123', name: 'HTML', slug: 'test' },
    ]
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const fetchTagList = async (params: IGetAllTagsParams) => {
  try {
    connectToDatabase()
    const { q, filter } = params

    const query: FilterQuery<typeof TagModel> = q
      ? {
          $or: [{ name: { $regex: new RegExp(q, 'i') } }],
        }
      : {}

    const aggregationPipeline: any[] = [
      { $match: query },
      {
        $lookup: {
          from: 'questions',
          localField: 'questions',
          foreignField: '_id',
          as: 'questionDetails',
        },
      },
      { $addFields: { questionCount: { $size: '$questionDetails' } } },
    ]

    let sortOption: any = {}

    switch (filter) {
      case 'popular':
        sortOption = { questionCount: -1 }
        break
      case 'recent':
        sortOption = { createdOn: -1 }
        break
      case 'name':
        sortOption = { name: 1 }
        break
      case 'old':
        sortOption = { createdOn: 1 }
        break
      default:
        sortOption = { createdOn: -1 }
        break
    }

    aggregationPipeline.push({ $sort: sortOption })

    const tagList = await TagModel.aggregate(aggregationPipeline)

    console.log('list tag+', tagList)

    if (!tagList) throw new Error('tag list not be fetched')

    return { tagList }
  } catch (e) {
    console.error(e)
    throw e
  }
}

export const getTagBySlug = async (slug: string) => {
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

export const getPopularTags = async (): Promise<ITag[]> => {
  try {
    connectToDatabase()

    const popularTags = await TagModel.aggregate([
      {
        $project: {
          name: 1, // include field
          slug: 1,

          totalQuestions: { $size: '$questions' }, // new field with a size of property
        },
      },
      { $sort: { totalQuestions: -1 } },
      { $limit: 5 },
    ])

    return toPlainObject(popularTags)
  } catch (error) {
    console.log(error)
    throw error
  }
}
