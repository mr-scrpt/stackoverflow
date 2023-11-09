'use server'

import { connectToDatabase } from '../mongoose'

export const createQuestion = async () => {
  try {
    connectToDatabase()
  } catch (e) {
    // throw error
  }
}
