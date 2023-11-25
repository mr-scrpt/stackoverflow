'use server'

import { ISearchParams } from '@/types/shared'
import { connectToDatabase } from '../mongoose'
import { QuestionModel } from '@/database/question.model'
import { UserModel } from '@/database/user.model'
import { AnswerModel } from '@/database/answer.model'
import { TagModel } from '@/database/tag.model'
import { toPlainObject } from '../utils'
import { GLOBAL_SEARCH_LIMIT } from '@/constants'

const SearchableTypes = ['tag', 'answer', 'question', 'user']

export const globalSearch = async (params: ISearchParams) => {
  try {
    connectToDatabase()

    const { query, type } = params

    const regexQuery = { $regex: query, $options: 'i' }
    const modelsAndTypes = [
      { model: TagModel, searchFields: 'name', type: 'tag' },
      { model: QuestionModel, searchFields: 'title', type: 'question' },
      { model: UserModel, searchFields: 'name', type: 'user' },
      { model: AnswerModel, searchFields: 'content', type: 'answer' },
    ]

    let results = []
    const requestType = type?.toLowerCase()
    // if no filter type selected -> show 2 documents from each type
    // Array's map(), foreach() and other iteration methods do not use promises.
    if (!requestType || !SearchableTypes.includes(requestType)) {
      const data = await Promise.all([
        {
          title: 'Tags',
          type: 'tag',
          link: 'tags',
          data: (
            await TagModel.find({ name: regexQuery }).limit(GLOBAL_SEARCH_LIMIT)
          ).map((item) => ({
            title: item.name,
            link: item.slug,
            id: toPlainObject(item._id),
          })),
        },
        {
          title: 'Question',
          type: 'question',
          link: '/',
          data: (
            await QuestionModel.find({ title: regexQuery }).limit(
              GLOBAL_SEARCH_LIMIT
            )
          ).map((item) => ({
            title: item.title,
            link: item.slug,
            id: toPlainObject(item._id),
          })),
        },
        {
          title: 'User by username',
          type: 'user',
          link: 'community',
          data: (
            await UserModel.find({ username: regexQuery }).limit(
              GLOBAL_SEARCH_LIMIT
            )
          ).map((item) => ({
            title: item.username,
            link: item.slug,
            id: toPlainObject(item._id),
          })),
        },
        {
          title: `Answers containing "${query}"`,
          type: 'answer',
          link: '',
          data: (
            await AnswerModel.find({ content: regexQuery })
              .populate({
                path: 'question',
                model: QuestionModel,
                select: 'slug title',
              })
              .limit(GLOBAL_SEARCH_LIMIT)
          ).map((item) => ({
            title: item.question.title,
            link: item.question.slug,
            id: toPlainObject(item._id),
          })),
        },
      ])
      results.push(...data)
      // console.log('data', data)
    }
    const filteredResults = results.filter((item) => item.data.length)

    return toPlainObject(filteredResults)
  } catch (error) {
    console.log(error)
    throw error
  }
}
