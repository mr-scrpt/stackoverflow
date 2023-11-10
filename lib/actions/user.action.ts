'use server'

import { UserModel } from '@/database/user.model'
import { connectToDatabase } from '../mongoose'

export async function getUserById(params: any) {
  try {
    await connectToDatabase()

    const { userId } = params
    const user = await UserModel.findOne({ clerkId: userId })
    // console.log('user from action', user)
    // console.log('user parsed', JSON.parse(JSON.stringify(user)))

    return JSON.parse(JSON.stringify(user))
  } catch (error) {
    console.log(error)
    throw error
  }
}
