import {
  ISearchGlobalCategoryInfo,
  ISearchGlobalDataItem,
  ISearchGlobalResult,
  ISearchGlobalTransformedResult,
  SearchTypeEnum,
} from '@/types/shared'

export const transformSearchData = (
  data: ISearchGlobalResult[]
): ISearchGlobalTransformedResult[] =>
  data.map((category) => {
    const categoryInfo = getCategoryInfo[category.type]

    return {
      type: category.type,
      title: categoryInfo.title,
      link: categoryInfo.link,
      data: category.data.map((item) => ({
        title: item.title,
        link: getCategoryItemLink[category.type](item.link, item.id),
        id: item.id,
      })),
    }
  })
const getCategoryInfo: Record<string, ISearchGlobalCategoryInfo> = {
  tag: { title: 'Tags', link: '/tags' },
  question: { title: 'Questions', link: '/' },
  user: { title: 'By username', link: '/community' },
  answer: { title: 'Answers in questions', link: '' },
}

export const getCategoryItemLink: Record<
  string,
  (itemLink: string, itemId: string) => string
> = {
  tag: (itemLink, itemId) => `/tags/${itemLink}`,
  question: (itemLink, itemId) => `/question/${itemLink}`,
  user: (itemLink, itemId) => `/community/${itemLink}`,
  answer: (itemLink, itemId) => `/question/${itemLink}#${itemId}`,
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
// type AdditionalMappingFunction = (item: any) => string
//
// export const mapData = (
//   dataArray: any[],
//   titleField: string,
//   linkField: string,
//   idField: string,
//   additionalMapping?: Record<string, AdditionalMappingFunction>
// ): ISearchGlobalDataItem[] => {
//   return dataArray.map((item) => ({
//     title: getField(item, titleField, additionalMapping),
//     link: getField(item, linkField, additionalMapping),
//     id: getField(item, idField, additionalMapping),
//   }))
// }
//
// export const getField = (
//   item: any,
//   field: string,
//   additionalMapping?: Record<string, AdditionalMappingFunction>
// ): string => {
//   if (additionalMapping && additionalMapping[field]) {
//     return additionalMapping[field](item)
//   }
//
//   return item[field]
// }
//
export const globalSearchFiltered = (obj: ISearchGlobalResult[]) =>
  obj.filter((item) => item.data.length)
