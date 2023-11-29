'use server'

import { UserModel } from '@/database/user.model'
import { connectToDatabase } from '../mongoose'
import {
  ICreateUserParams,
  IDeleteUserParams,
  IGetAllUsersParams,
  IGetUserStatsParams,
  IUpdateUserParams,
} from '@/types/shared'
import { revalidatePath } from 'next/cache'
import { QuestionModel } from '@/database/question.model'
import { AnswerModel } from '@/database/answer.model'
import { TagModel } from '@/database/tag.model'
import { slugGenerator, toPlainObject } from '../utils'
import { IUser } from '@/types'
import { FilterQuery } from 'mongoose'
import { PAGINATION_BASE_LIMIT } from '@/constants'

export const getUserProfileBySlug = async (
  slug: string
): Promise<{ user: IUser; totalQuestions: number; totalAnswers: number }> => {
  try {
    connectToDatabase()

    const user = await UserModel.findOne({ slug })

    if (!user) throw new Error('User not found')

    const totalQuestions = await QuestionModel.countDocuments({
      author: user._id,
    }) // count where author=userId
    const totalAnswers = await AnswerModel.countDocuments({ author: user._id })

    return {
      user: toPlainObject(user),
      totalAnswers,
      totalQuestions,
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getUserByClerkId = async (
  userId: string | null
): Promise<IUser | null> => {
  try {
    if (!userId) return null
    await connectToDatabase()

    const user = await UserModel.findOne({ clerkId: userId })

    // return JSON.parse(JSON.stringify(user))
    return toPlainObject(user)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getUserById = async (
  userId: string | null
): Promise<IUser | null> => {
  try {
    if (!userId) return null
    await connectToDatabase()

    const user = await UserModel.findOne({ _id: userId })

    // return JSON.parse(JSON.stringify(user))
    return toPlainObject(user)
  } catch (error) {
    console.log(error)
    throw error
  }
}
export const getUserSearchByUsername = async (
  username: string,
  limit?: number
): Promise<IUser[]> => {
  try {
    connectToDatabase()
    const regexQuery = { $regex: username, $options: 'i' }

    let query = UserModel.find({ username: regexQuery })
    if (limit) {
      query = query.limit(limit)
    }

    return toPlainObject(await query)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getAllUsers = async (
  params: IGetAllUsersParams
): Promise<{ users: IUser[]; hasNextPage: boolean }> => {
  try {
    await connectToDatabase()

    const { q, filter, page = 1, limit = PAGINATION_BASE_LIMIT } = params

    const query: FilterQuery<typeof UserModel> = q
      ? {
          $or: [
            { username: { $regex: new RegExp(q, 'i') } },
            { name: { $regex: new RegExp(q, 'i') } },
          ],
        }
      : {}
    let sortOption = {}

    switch (filter) {
      case 'new_users':
        sortOption = { joinedAt: -1 }
        break
      case 'old_users':
        sortOption = { joinedAt: 1 }
        break
      case 'top_contributors':
        sortOption = { reputation: -1 }
        break
      default:
        sortOption = { reputation: -1 }
        break
    }

    const skipPage = (page - 1) * limit

    const users = await UserModel.find(query)
      .sort(sortOption)
      .skip(skipPage)
      .limit(limit)
      .sort(sortOption)

    // calculate if there is page next
    const totalUser = await UserModel.countDocuments(query)
    // if total > amount skip + amount show -> next page
    const hasNextPage = totalUser > skipPage + users.length

    const resultQuestion = toPlainObject(users)

    return { users: resultQuestion, hasNextPage }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const createUser = async (userData: ICreateUserParams) => {
  try {
    await connectToDatabase()
    const userToCreat = { ...userData, slug: slugGenerator(userData.username) }

    return await UserModel.create(userToCreat)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const updateUser = async (params: IUpdateUserParams) => {
  try {
    await connectToDatabase()

    const { clerkId, updateData, path } = params
    const { username } = updateData

    if (username) {
      const slug = slugGenerator(username)
      updateData.slug = slug
    }

    const updatedUser = await UserModel.findOneAndUpdate(
      { clerkId },
      updateData,
      { new: true }
    )

    revalidatePath(path)

    return toPlainObject(updatedUser)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const deleteUser = async (params: IDeleteUserParams) => {
  try {
    await connectToDatabase()

    const { clerkId } = params

    const user = await UserModel.findOneAndDelete({ clerkId })

    if (!user) throw new Error('User not found')

    // Delete user from database
    // and questions, answers, comments, etc..

    // return an array with questionIds with distinct value
    // const userQuestionIds = await Question.find({ author: user._id }).distinct("_id")

    const deleteUser = await UserModel.findByIdAndDelete(user._id)
    // delete user questions Ids
    await QuestionModel.deleteMany({ author: user._id })

    // TODO: delete user answers, comments...

    return deleteUser
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getUserQuestions(params: IGetUserStatsParams) {
  try {
    connectToDatabase()

    const { userId, page = 1, limit = 10 } = params

    const totalQuestions = await QuestionModel.countDocuments({
      author: userId,
    }) // count where author=userId
    const totalAnswers = await AnswerModel.countDocuments({ author: userId })

    const userQuestions = await QuestionModel.find({ author: userId })
      .sort({ createdAt: -1, views: -1, upVotes: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate({ path: 'tags', model: TagModel })
      .populate({ path: 'author', model: UserModel })

    return { questions: userQuestions, totalAnswers, totalQuestions }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getUserAnswers(params: IGetUserStatsParams) {
  try {
    connectToDatabase()

    // const { userId, page = 1, pageSize = 10 } = params
    const { userId, page = 1, limit = 10 } = params

    const totalAnswers = await AnswerModel.countDocuments({ author: userId })
    const userAnswers = await AnswerModel.find({ author: userId })
      .sort({ upVotes: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('author', '_id name clerkId picture')
      .populate('question', 'title _id createdAt author slug')

    return { answers: userAnswers, totalAnswers }
  } catch (error) {
    console.log(error)
    throw error
  }
}
