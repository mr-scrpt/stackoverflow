'use server'

import { PAGINATION_BASE_LIMIT } from '@/constants'
import { AnswerModel } from '@/database/answer.model'
import { InteractionModel } from '@/database/interaction.model'
import { QuestionModel } from '@/database/question.model'
import { TagModel } from '@/database/tag.model'
import { UserModel } from '@/database/user.model'
import { IQuestion } from '@/types'
import {
  ICreateQuestionParams,
  IDeleteQuestionParams,
  IEditQuestionParams,
  IGetQuestionsByTagIdParams,
  IGetQuestionsParams,
  IGetSavedQuestionsParams,
  IQuestionVoteParams,
  IToggleSaveQuestionParams,
} from '@/types/shared'
import { FilterQuery } from 'mongoose'
import { revalidatePath } from 'next/cache'
import { connectToDatabase } from '../mongoose'
import { slugGenerator, toPlainObject } from '../utils'
import { createTag } from './tag.action'

export const getQuestions = async (
  params: IGetQuestionsParams
): Promise<{ questions: IQuestion[]; hasNextPage: boolean }> => {
  try {
    await connectToDatabase()
    const { q, filter, page = 1, limit = PAGINATION_BASE_LIMIT } = params
    const query: FilterQuery<typeof QuestionModel> = q
      ? {
          $or: [
            { title: { $regex: new RegExp(q, 'i') } },
            { content: { $regex: new RegExp(q, 'i') } },
          ],
        }
      : {}

    let sortOption = {}

    switch (filter) {
      case 'newest':
        sortOption = { createdAt: -1 }
        break
      case 'frequent':
        sortOption = { views: -1 }
        break
      case 'unanswered':
        query.answers = { $size: 0 } // update the find query
        break
      default:
        sortOption = { createdAt: -1 }
        break
    }

    // console.log('sortOption', filter, sortOption)

    const skipPage = (page - 1) * limit

    const questions = await QuestionModel.find(query)
      .populate({ path: 'tags', model: TagModel }) // Specifies paths which should be populated with other documents
      .populate({ path: 'author', model: UserModel })
      .skip(skipPage)
      .limit(limit)
      .sort(sortOption)

    // calculate if there is page next
    const totalQuestions = await QuestionModel.countDocuments(query)
    // if total > amount skip + amount show -> next page
    const hasNextPage = totalQuestions > skipPage + questions.length

    const resultQuestion = toPlainObject(questions)

    return { questions: resultQuestion, hasNextPage }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getQuestionListByAuthorId = async (
  authorId: string
): Promise<IQuestion[]> => {
  const questionList = await QuestionModel.find({ author: authorId })
  if (!questionList.length) throw new Error('Questions not found')

  return toPlainObject(questionList)
}

export const fetchQuestionBySlug = async (
  slug: string
): Promise<{ questions: IQuestion[] }> => {
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

    // return question
    return toPlainObject(question)
  } catch (error) {
    console.log(error)
    throw error
  }
}
export const getQuestionsSearchByName = async (
  title: string,
  limit?: number
): Promise<IQuestion[]> => {
  try {
    connectToDatabase()
    const regexQuery = { $regex: title, $options: 'i' }
    let query = QuestionModel.find({ title: regexQuery })
    if (limit) {
      query = query.limit(limit)
    }

    return toPlainObject(await query)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getQuestionByTagSlug = async (
  params: IGetQuestionsByTagIdParams
): Promise<{
  tagTitle: string
  questions: IQuestion[]
  hasNextPage: boolean
}> => {
  try {
    connectToDatabase()

    const { q, filter, page = 1, limit = PAGINATION_BASE_LIMIT, slug } = params
    const query: FilterQuery<typeof QuestionModel> = q
      ? {
          $or: [
            { title: { $regex: new RegExp(q, 'i') } },
            { content: { $regex: new RegExp(q, 'i') } },
          ],
        }
      : {}

    let sortOption = {}

    switch (filter) {
      case 'newest':
        sortOption = { createdAt: -1 }
        break
      case 'frequent':
        sortOption = { views: -1 }
        break
      case 'unanswered':
        query.answers = { $size: 0 } // update the find query
        break
      default:
        sortOption = { createdAt: -1 }
        break
    }
    const skipPage = (page - 1) * limit

    // const tagFilter: FilterQuery<ITag> = { slug }
    const tag = await TagModel.findOne({ slug })

    if (!tag) throw new Error('No tag found')
    const totalQuestionsAggregate = await QuestionModel.aggregate([
      { $match: { tags: tag._id, ...query } },
      { $count: 'count' },
    ])
    const totalQuestions = totalQuestionsAggregate[0]?.count || 0

    // Запрос вопросов с учетом пагинации
    const questions = await QuestionModel.find({ tags: tag._id, ...query })
      .sort(sortOption)
      .skip(skipPage)
      .limit(limit)
      .populate([
        {
          path: 'author',
          model: UserModel,
          select: '_id name clerkId picture',
        },
        { path: 'tags', model: TagModel, select: '_id name' },
      ])

    const hasNextPage = totalQuestions > skipPage + questions.length

    return {
      tagTitle: tag.name,
      questions: toPlainObject(questions),
      hasNextPage,
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const createQuestion = async (params: ICreateQuestionParams) => {
  try {
    connectToDatabase()
    const { title, content, tags, author, path } = params

    const slug = slugGenerator(title)

    const existQuestion = await QuestionModel.findOne({ slug })

    if (existQuestion) {
      throw new Error('question has existing')
    }

    const question = await QuestionModel.create({
      title,
      slug,
      content,
      author,
    })

    const tagDocuments = []

    for (const tag of tags) {
      const existingTag = await createTag({
        name: tag,
        questionId: question._id,
      })
      tagDocuments.push(existingTag.tag._id)
    }

    await InteractionModel.create({
      user: author,
      action: 'ask_question',
      question: question._id,
      tags: tagDocuments,
    })

    // reputation + 5
    if (question) {
      await UserModel.findByIdAndUpdate(author, { $inc: { reputation: 5 } })
    }

    const result = await QuestionModel.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    }).lean()

    revalidatePath(path)
    return toPlainObject(result)
  } catch (e) {
    console.log(e)
    throw e
  }
}

export const editQuestion = async (params: IEditQuestionParams) => {
  try {
    connectToDatabase()

    const { slug, title, content } = params

    const question = await QuestionModel.findOne({ slug }).populate('tags')

    if (!question) throw new Error('Question not found')

    question.title = title
    // question.slug = slugGenerator(title)
    question.content = content

    const result = await question.save()

    revalidatePath(`/question/${result.slug}`)
    // revalidatePath(`/question/${result.slug}`)

    return toPlainObject(result)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const deleteQuestion = async (params: IDeleteQuestionParams) => {
  try {
    connectToDatabase()

    const { questionId, path } = params
    // console.log('questionId =====6....>>>', questionId)

    // delete question/answers/interactivity/tags associate with question
    await QuestionModel.deleteOne({ _id: questionId })
    await AnswerModel.deleteMany({ question: questionId })
    await InteractionModel.deleteMany({ question: questionId })
    await TagModel.updateMany(
      { questions: questionId },
      { $pull: { questions: questionId } }
    )

    revalidatePath(path)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const upVoteQuestion = async (params: IQuestionVoteParams) => {
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

    // reputation
    if (userId !== question.author.toString()) {
      // user reputation + 1
      await UserModel.findByIdAndUpdate(userId, {
        $inc: { reputation: hasupVoted ? -1 : 1 },
      })
      // author reputation + 10
      await UserModel.findByIdAndUpdate(question.author, {
        $inc: { reputation: hasupVoted ? -10 : 10 },
      })
    }
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

    // reputation
    if (userId !== question.author.toString()) {
      // user reputation - 1
      await UserModel.findByIdAndUpdate(userId, {
        $inc: { reputation: hasdownVoted ? 1 : -1 },
      })
      // author reputation - 2
      await UserModel.findByIdAndUpdate(question.author, {
        $inc: { reputation: hasdownVoted ? 10 : -10 },
      })
    }

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

    const isQuestionSaved = user.postSaved?.some((item) => {
      return item._id.toString() === questionId
    })

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

export const getSavedQuestions = async (
  params: IGetSavedQuestionsParams
): Promise<{ questions: IQuestion[]; hasNextPage: boolean }> => {
  try {
    connectToDatabase()

    const {
      clerkId,
      q,
      filter,
      page = 1,
      limit = PAGINATION_BASE_LIMIT,
    } = params

    const query: FilterQuery<typeof QuestionModel> = q
      ? { title: { $regex: new RegExp(q, 'i') } }
      : {}

    let sortOption = {}

    switch (filter) {
      case 'most_recent':
        sortOption = { createdAt: -1 }
        break
      case 'oldest':
        sortOption = { createdAt: 1 }
        break
      case 'most_voted':
        sortOption = { upVotes: -1 }
        break
      case 'most_viewed':
        sortOption = { views: -1 }
        break
      case 'most_answered':
        sortOption = { answers: -1 }
        break
      default:
        break
    }
    const skipPage = (page - 1) * limit

    const user = await UserModel.findOne({ clerkId }).populate({
      path: 'postSaved',
      match: query,
      options: {
        limit,
        sort: sortOption,
        skip: skipPage,
      },
      populate: [
        {
          path: 'author',
          model: UserModel,
          select: '_id name username clerkId picture',
        },
        { path: 'tags', model: TagModel, select: '_id name' },
      ],
    })

    if (!user) throw new Error('User not found')
    if (!user.postSaved) {
      return { questions: [], hasNextPage: false }
    }
    const totalSavedPosts = await UserModel.findOne({ clerkId })
      .select('postSaved')
      .populate({
        path: 'postSaved',
        match: query,
      })
      .exec()

    const totalQuestions = totalSavedPosts!.postSaved!.length

    const hasNextPage = totalQuestions! > skipPage + user.postSaved.length

    return { questions: user.postSaved || [], hasNextPage }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getHotQuestions = async (): Promise<IQuestion[]> => {
  try {
    connectToDatabase()

    const hotQuestions = await QuestionModel.find({})
      .sort({ views: -1, upVotes: -1 }) // descending order
      .limit(5)

    return toPlainObject(hotQuestions)
  } catch (error) {
    console.log(error)
    throw error
  }
}
