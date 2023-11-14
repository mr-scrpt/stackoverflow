'use server'

import { QuestionModel } from '@/database/question.model'
import { connectToDatabase } from '../mongoose'
import { TagModel } from '@/database/tag.model'
import { revalidatePath } from 'next/cache'
import { UserModel } from '@/database/user.model'
import {
  ICreateQuestionParams,
  IGetQuestionsParams,
  IGetSavedQuestionsParams,
  IQuestionVoteParams,
  IToggleSaveQuestionParams,
} from '@/types/shared'
import { slugGenerator } from '../utils'
import { FilterQuery } from 'mongoose'

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

export const fetchQuestionBySlug = async (slug: string) => {
  try {
    await connectToDatabase()
    const question = await QuestionModel.findOne({ slug })
      .populate({ path: 'tags', model: TagModel, select: '_id name' })
      .populate({
        path: 'author',
        model: UserModel,
        select: '_id name clerkId picture',
      })

    // console.log('===>>>', question)

    return question
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const createQuestion = async (params: ICreateQuestionParams) => {
  try {
    connectToDatabase()
    const { title, content, tags, author, path } = params

    console.log('tags =>>>', tags)
    const slug = slugGenerator(title)

    const question = await QuestionModel.create({
      title,
      slug,
      content,
      author,
    })

    const tagDocuments = []

    for (const tag of tags) {
      const existingTag = await TagModel.findOneAndUpdate(
        {
          name: { $regex: new RegExp(`^${tag}$`, 'i') },
        },
        {
          $setOnInsert: { name: tag }, // do update if target found
          $push: { questions: question._id },
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

export const upVoteQuestion = async (params: IQuestionVoteParams) => {
  console.log('upVoteQuestion')
  try {
    connectToDatabase()

    const { questionId, userId, hasupVoted, hasdownVoted, path } = params

    let updateQuery = {}

    if (hasupVoted) {
      updateQuery = { $pull: { upVotes: userId } }
    } else if (hasdownVoted) {
      updateQuery = {
        $pull: { downVotes: userId },
        $push: { upVotes: userId },
      }
    } else {
      // Adds values to the array if not already present.
      updateQuery = { $addToSet: { upVotes: userId } }
    }

    const question = await QuestionModel.findByIdAndUpdate(
      questionId,
      updateQuery,
      {
        new: true,
      }
    )

    if (!question) throw new Error('Question not found!')

    // TODO: interaction

    revalidatePath(path)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const downVoteQuestion = async (params: IQuestionVoteParams) => {
  try {
    connectToDatabase()

    const { questionId, userId, hasupVoted, hasdownVoted, path } = params

    let updateQuery = {}

    if (hasdownVoted) {
      updateQuery = { $pull: { downVotes: userId } }
    } else if (hasupVoted) {
      updateQuery = {
        $pull: { upVotes: userId },
        $push: { downVotes: userId },
      }
    } else {
      updateQuery = { $addToSet: { downVotes: userId } }
    }

    const question = await QuestionModel.findByIdAndUpdate(
      questionId,
      updateQuery,
      {
        new: true,
      }
    )

    if (!question) throw new Error('Question not found!')

    // TODO: interaction

    revalidatePath(path)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const toggleSaveQuestion = async (params: IToggleSaveQuestionParams) => {
  try {
    connectToDatabase()

    const { userId, questionId, path } = params

    const user = await UserModel.findById(userId)

    if (!user) {
      throw new Error('User not found!')
    }

    const isQuestionSaved = user.postSaved?.includes(questionId)

    if (isQuestionSaved) {
      // remove question from saved
      await UserModel.findByIdAndUpdate(
        userId,
        {
          $pull: { postSaved: questionId },
        },
        { new: true }
      )
    } else {
      // add question to saved
      await UserModel.findByIdAndUpdate(
        userId,
        {
          $addToSet: { postSaved: questionId },
        },
        { new: true }
      )
    }

    revalidatePath(path)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getSavedQuestions = async (params: IGetSavedQuestionsParams) => {
  try {
    connectToDatabase()

    const { clerkId, searchQuery, filter, page = 1, pageSize = 10 } = params

    const query: FilterQuery<typeof QuestionModel> = searchQuery
      ? { title: { $regex: new RegExp(searchQuery, 'i') } }
      : {}

    const user = await UserModel.findOne({ clerkId }).populate({
      path: 'postSaved',
      match: query,
      options: {
        sort: { createdAt: -1 },
      },
      populate: [
        {
          path: 'author',
          model: UserModel,
          select: '_id name clerkId picture',
        },
        { path: 'tags', model: TagModel, select: '_id name' },
      ],
    })

    if (!user) throw new Error('User not found')

    return { questions: user.postSaved }
  } catch (error) {
    console.log(error)
    throw error
  }
}
