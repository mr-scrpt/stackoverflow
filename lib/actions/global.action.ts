'use server'

import { GLOBAL_SEARCH_LIMIT, GLOBAL_SEARCH_LIMIT_SINGLE } from '@/constants'
import {
  ISearchGlobalResult,
  ISearchParams,
  SearchTypeEnum,
} from '@/types/shared'
import { connectToDatabase } from '../mongoose'
import { getAnswerSearchByContent } from './answer.action'
import { getQuestionsSearchByName } from './question.action'
import { getTagSearchByName } from './tag.action'
import { getUserSearchByUsername } from './user.action'
import {
  globalSearchFiltered,
  mapData,
} from '@/components/shared/SearchGlobal/SearchGlobal.helper'

const SearchableTypes = ['tag', 'answer', 'question', 'user']

export const globalSearch = async (
  params: ISearchParams
): Promise<ISearchGlobalResult[]> => {
  try {
    connectToDatabase()

    const { query, type, limit = GLOBAL_SEARCH_LIMIT } = params

    const results: ISearchGlobalResult[] = []

    const requestCollection = (query: string, limit: number) => ({
      [SearchTypeEnum.QUESTION]: () => getQuestionsSearchByName(query, limit),
      [SearchTypeEnum.ANSWER]: () => getAnswerSearchByContent(query, limit),
      [SearchTypeEnum.TAG]: () => getTagSearchByName(query, limit),
      [SearchTypeEnum.USER]: () => getUserSearchByUsername(query, limit),
    })

    if (!type || !SearchableTypes.includes(type)) {
      const requestList = requestCollection(query, limit)
      const [questionData, answerData, tagData, userData] = await Promise.all([
        requestList[SearchTypeEnum.QUESTION](),
        requestList[SearchTypeEnum.ANSWER](),
        requestList[SearchTypeEnum.TAG](),
        requestList[SearchTypeEnum.USER](),
      ])

      const data = [
        {
          type: SearchTypeEnum.TAG,
          data: mapData(tagData, SearchTypeEnum.TAG),
        },
        {
          type: SearchTypeEnum.QUESTION,
          data: mapData(questionData, SearchTypeEnum.QUESTION),
        },
        {
          type: SearchTypeEnum.USER,
          data: mapData(userData, SearchTypeEnum.USER),
        },
        {
          type: SearchTypeEnum.ANSWER,
          data: mapData(answerData, SearchTypeEnum.ANSWER),
        },
      ]
      results.push(...data)
    } else {
      const requestList = requestCollection(query, GLOBAL_SEARCH_LIMIT_SINGLE)
      const data = { type, data: mapData(await requestList[type](), type) }
      results.push(data)
    }
    return globalSearchFiltered(results)
  } catch (error) {
    console.log(error)
    throw error
  }
}
