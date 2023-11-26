'use server'

import { GLOBAL_SEARCH_LIMIT } from '@/constants'
import {
  ISearchGlobalResult,
  ISearchParams,
  SearchTypeEnum,
} from '@/types/shared'
import { connectToDatabase } from '../mongoose'
import { globalSearchFiltered, mapData } from '../utils'
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
    const requestType = type?.toLowerCase()
    // if no filter type selected -> show 2 documents from each type
    // Array's map(), foreach() and other iteration methods do not use promises.
    if (!requestType || !SearchableTypes.includes(requestType)) {
      const [tagData, questionData, userData, answerData] = await Promise.all([
        getTagSearchByName(query, limit),
        getQuestionsSearchByName(query, limit),
        getUserSearchByUsername(query, limit),
        getAnswerSearchByContent(query, limit),
      ])

      console.log('answerData', answerData)

      const data = [
        {
          type: SearchTypeEnum.TAG,
          data: mapData(tagData, 'name', 'slug', '_id'),
        },
        {
          type: SearchTypeEnum.QUESTION,
          data: mapData(questionData, 'title', 'slug', '_id'),
        },
        {
          type: SearchTypeEnum.USER,
          data: mapData(userData, 'username', 'slug', '_id'),
        },
        {
          type: SearchTypeEnum.ANSWER,
          data: mapData(answerData, 'question.title', 'question.slug', '_id', {
            'question.title': (item) => item.question.title,
            'question.slug': (item) => item.question.slug,
          }),
        },
      ]
      results.push(...data)
      // console.log('data', data)
      // return results
    }
    return globalSearchFiltered(results)
    // const filteredResults = results.filter((item) => item.data.length)
    //
    // return toPlainObject(filteredResults)
  } catch (error) {
    console.log(error)
    throw error
  }
}

// Нужно массив объектов такого вида
//
// const data = [
//   {
//     type: "tag",
//     data: [
//       {
//         title: "ade",
//         link: "ade",
//         id: "6558975e20b738f3e3b3fc93",
//       },
//       {
//         title: "dd",
//         link: "dd",
//         id: "6558954620b738f3e3b2a9a0",
//       },
//     ],
//   },
//   {
//     type: "question",
//     data: [
//       {
//         title: "How to toggle display of inline/block elements without losing original display",
//         link: "how-to-toggle-display-of-inlineblock-elements-without-losing-original-display",
//         id: "6551e2861b092ac04fcc3786",
//       },
//       {
//         title: "My new question agddddddeeeeeeeddd",
//         link: "my-new-question-agddddddeeee",
//         id: "6554a59abe0180307e510ccd",
//       },
//     ],
//   },
//   {
//     type: "user",
//     data: [
//       {
//         title: "devuser",
//         link: "devuser",
//         id: "654f774ff075de6e1fa3a68f",
//       },
//     ],
//   },
//   {
//     type: "answer",
//     data: [
//       {
//         title: "How to toggle display of inline/block elements without losing original display",
//         link: "how-to-toggle-display-of-inlineblock-elements-without-losing-original-display",
//         id: "655222cf8a2928fb49ad0200",
//       },
//       {
//         title: "6test new new all",
//         link: "6test-new-new-all",
//         id: "655f334bfb37bba1354e84f3",
//       },
//     ],
//   },
// ];
// с мапить в массив объектов такого вида
//
// const data = [
//   {
//     type: "tag",
//     title: "Tags",
//     link: "/tags",
//     data: [
//       {
//         title: "ade",
//         link: "/tags/ade",
//         id: "6558975e20b738f3e3b3fc93",
//       },
//       {
//         title: "dd",
//         link: "/tags/dd",
//         id: "6558954620b738f3e3b2a9a0",
//       },
//     ],
//   },
//   {
//     type: "question",
//     title: "Questions",
//     link: "/questions",
//     data: [
//       {
//         title: "How to toggle display of inline/block elements without losing original display",
//         link: "/questions/how-to-toggle-display-of-inlineblock-elements-without-losing-original-display",
//         id: "6551e2861b092ac04fcc3786",
//       },
//       {
//         title: "My new question agddddddeeeeeeeddd",
//         link: "/questions/my-new-question-agddddddeeee",
//         id: "6554a59abe0180307e510ccd",
//       },
//     ],
//   },
//   {
//     type: "user",
//     title: "By username",
//     link: "/community",
//     data: [
//       {
//         title: "devuser",
//         link: "/community/devuser",
//         id: "654f774ff075de6e1fa3a68f",
//       },
//     ],
//   },
//   {
//     type: "answer",
//     title: "Answers in questions",
//     link: "",
//     data: [
//       {
//         title: "How to toggle display of inline/block elements without losing original display",
//         link: "/questions/how-to-toggle-display-of-inlineblock-elements-without-losing-original-display#655222cf8a2928fb49ad0200",
//         id: "655222cf8a2928fb49ad0200",
//       },
//       {
//         title: "6test new new all",
//         link: "/questions/6test-new-new-all#655f334bfb37bba1354e84f3",
//         id: "655f334bfb37bba1354e84f3",
//       },
//     ],
//   },
// ];
//
