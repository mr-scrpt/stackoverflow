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
import { PAGINATION_BASE_LIMIT } from '@/constants'
import { InteractionModel } from '@/database/interaction.model'

// export const fetchTagsByUserId = async (
//   params: IGetTopInteractedTagsParams
// ) => {
//   try {
//     connectToDatabase()
//
//     const { userId } = params
//
//     // console.log('', limit)
//
//     const user = await UserModel.findById(userId)
//
//     if (!user) throw Error('user not found')
//
//     // find interactions for the user and grown tags...
//     // interaction
//
//     return [
//       { _id: '123', name: 'HTML', slug: 'test' },
//       { _id: '123', name: 'HTML', slug: 'test' },
//       { _id: '123', name: 'HTML', slug: 'test' },
//     ]
//   } catch (error) {
//     console.log(error)
//     throw error
//   }
// }

export const getTopInteractedTags = async (
  params: IGetTopInteractedTagsParams
): Promise<ITag[]> => {
  try {
    await connectToDatabase()

    const { userId, limit = 3 } = params

    // Find the user by clerkId
    const user = await UserModel.findById(userId)
    if (!user) {
      throw new Error('User not found')
    }

    // Find interactions for the user and group by tags
    const tagCountMap = await InteractionModel.aggregate([
      { $match: { user: user._id, tags: { $exists: true, $ne: [] } } },
      { $unwind: '$tags' },
      { $group: { _id: '$tags', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: limit },
    ])
    console.log('count', tagCountMap)

    const topTags = tagCountMap.map((tagCount) => tagCount._id)

    // Find the tag documents for the top tags
    const topTagDocuments = await TagModel.find({ _id: { $in: topTags } })

    return toPlainObject(topTagDocuments)
  } catch (error) {
    console.error('Error fetching top interacted tags:', error)
    throw error
  }
}

export const fetchTagList = async (
  params: IGetAllTagsParams
): Promise<{ tagList: ITag[]; hasNextPage: boolean }> => {
  try {
    connectToDatabase()
    const { q, filter, page = 1, limit = PAGINATION_BASE_LIMIT } = params

    const query: FilterQuery<typeof TagModel> = q
      ? {
          $or: [{ name: { $regex: new RegExp(q, 'i') } }],
        }
      : {}

    const skipPage = (page - 1) * limit

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

    const totalTag = (await TagModel.aggregate(aggregationPipeline)).length
    aggregationPipeline.push({ $sort: sortOption })
    aggregationPipeline.push({ $skip: skipPage }, { $limit: limit })
    const tagList = await TagModel.aggregate(aggregationPipeline)

    if (!tagList) throw new Error('tag list not be fetched')
    const hasNextPage = totalTag > skipPage + tagList.length

    const resultTag = toPlainObject(tagList)

    return { tagList: resultTag, hasNextPage }
  } catch (e) {
    console.error(e)
    throw e
  }
}

export const getTagBySlug = async (slug: string) => {
  try {
    connectToDatabase()
    const tag = await TagModel.findOne({ slug })
    return tag
  } catch (e) {
    console.log(e)
    throw e
  }
}

export const getTagSearchByName = async (
  name: string,
  limit?: number
): Promise<ITag[]> => {
  try {
    connectToDatabase()
    const regexQuery = { $regex: name, $options: 'i' }
    let query = TagModel.find({ name: regexQuery })

    if (limit) {
      query = query.limit(limit)
    }

    return toPlainObject(await query)
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
