'use server'

import { GLOBAL_SEARCH_LIMIT, GLOBAL_SEARCH_LIMIT_SINGLE } from '@/constants'
import {
  ISearchGlobalDataItem,
  ISearchGlobalResult,
  ISearchParams,
  SearchTypeEnum,
} from '@/types/shared'
import { connectToDatabase } from '../mongoose'
import { getAnswerSearchByContent } from './answer.action'
import { getQuestionsSearchByName } from './question.action'
import { getTagSearchByName } from './tag.action'
import { getUserSearchByUsername } from './user.action'

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

type MappingFunction = string | ((item: any) => string)

interface Mapping {
  title: MappingFunction
  link: MappingFunction
  id: MappingFunction
}

const defaultMapping: Record<SearchTypeEnum, Mapping> = {
  tag: {
    title: 'name',
    link: 'slug',
    id: '_id',
  },
  question: {
    title: 'title',
    link: 'slug',
    id: '_id',
  },
  user: {
    title: 'username',
    link: 'slug',
    id: '_id',
  },
  answer: {
    title: (item) => item.question.title,
    link: (item) => item.question.slug,
    id: '_id',
  },
}
export const mapData = (
  dataArray: any[],
  type: SearchTypeEnum
): ISearchGlobalDataItem[] => {
  const mapping = defaultMapping[type]

  if (!mapping) {
    throw new Error(`Unsupported search type: ${type}`)
  }

  return dataArray.map((item) => ({
    title: getField(item, mapping.title),
    link: getField(item, mapping.link),
    id: getField(item, mapping.id),
  }))
}

const getField = (item: any, field: string | MappingFunction): string => {
  if (typeof field === 'function') {
    return field(item)
  }

  return item[field]
}
export const globalSearchFiltered = (obj: ISearchGlobalResult[]) =>
  obj.filter((item) => item.data.length)
