'use server'

import { UserModel } from '@/database/user.model'
import { connectToDatabase } from '../mongoose'
import {
  ICreateUserParams,
  IDeleteUserParams,
  IUpdateUserParams,
} from '@/types/shared'
import { revalidatePath } from 'next/cache'
import { QuestionModel } from '@/database/question.model'

export const getUserById = async (params: any) => {
  try {
    await connectToDatabase()

    const { userId } = params
    const user = await UserModel.findOne({ clerkId: userId })

    return JSON.parse(JSON.stringify(user))
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const createUser = async (userData: ICreateUserParams) => {
  try {
    await connectToDatabase()

    const newUser = await UserModel.create(userData)
    return newUser
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const updateUser = async (params: IUpdateUserParams) => {
  try {
    await connectToDatabase()

    const { clerkId, updateData, path } = params

    await UserModel.findOneAndUpdate({ clerkId }, updateData, { new: true })

    revalidatePath(path)
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

    // delete user questions Ids
    await QuestionModel.deleteMany({ author: user._id })

    // TODO: delete user answers, comments...

    const deleteUser = await UserModel.findByIdAndDelete(user._id)
    return deleteUser
  } catch (error) {
    console.log(error)
    throw error
  }
}
