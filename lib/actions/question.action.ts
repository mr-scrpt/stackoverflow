'use server'

import { QuestionModel } from '@/database/question.model'
import { connectToDatabase } from '../mongoose'
import { TagModel } from '@/database/tag.model'
import { revalidatePath } from 'next/cache'
import { UserModel } from '@/database/user.model'
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
import { slugGenerator, toPlainObject } from '../utils'
import { FilterQuery } from 'mongoose'
import { createTag } from './tag.action'
import { IQuestion, ITag } from '@/types'
import { AnswerModel } from '@/database/answer.model'
import { InteractionModel } from '@/database/interaction.model'

export const getQuestions = async (
  params: IGetQuestionsParams
): Promise<IQuestion[]> => {
  try {
    await connectToDatabase()
    const questions = await QuestionModel.find({})
      .populate({ path: 'tags', model: TagModel }) // Specifies paths which should be populated with other documents
      .populate({ path: 'author', model: UserModel })
      .sort({ createdAt: -1 })

    return toPlainObject(questions)
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

    // return question
    return toPlainObject(question)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getQuestionByTagSlug(params: IGetQuestionsByTagIdParams) {
  try {
    connectToDatabase()

    // const { tagId, searchQuery, page = 1, pageSize = 10 } = params
    const { searchQuery, slug } = params

    // const tagIds = await TagModel.find({ slug }).distinct('_id')
    // let query = { tags: { $in: tagIds } }
    //
    // // Добавляем условие поиска по регулярному выражению, если searchQuery передан
    // if (searchQuery) {
    //   query.title = { $regex: new RegExp(searchQuery, 'i') }
    // }
    //
    // const questions = await QuestionModel.find(query)
    //   .populate('tags') // Заполняем данные о тегах
    //   .populate('author')
    //   .exec()
    //
    // return questions

    // const questions = await QuestionModel.find({ 'tags.slug': slug })
    //   .populate({ path: 'tags', model: TagModel }) // Specifies paths which should be populated with other documents
    //   .populate({ path: 'author', model: UserModel })
    //   .sort({ createdAt: -1 })
    // console.log('questions =====', questions)

    const tagFilter: FilterQuery<ITag> = { slug }

    const tag = await TagModel.findOne(tagFilter).populate({
      path: 'questions',
      model: QuestionModel,
      match: searchQuery
        ? { title: { $regex: new RegExp(searchQuery, 'i') } }
        : {},
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

    if (!tag) throw new Error('No tag found')

    const questions = tag.questions

    return { tagTitle: tag.name, questions }
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

    const { slug, title, content, path } = params

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

export const getSavedQuestions = async (params: IGetSavedQuestionsParams) => {
  try {
    connectToDatabase()

    const { clerkId, searchQuery } = params
    // const { clerkId, searchQuery, filter, page = 1, pageSize = 10 } = params

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
          select: '_id name username clerkId picture',
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
