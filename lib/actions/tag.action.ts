'use server'

import { UserModel } from '@/database/user.model'
import { connectToDatabase } from '../mongoose'
import { IGetTopInteractedTagsParams } from '@/types/shared'

export async function getTopInteractiveTags(
  params: IGetTopInteractedTagsParams
) {
  try {
    connectToDatabase()

    const { userId, limit = 3 } = params

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
