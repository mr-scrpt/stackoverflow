import {
  ISearchGlobalCategoryInfo,
  ISearchGlobalResult,
  ISearchGlobalTransformedResult,
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
  user: { title: 'By username', link: '/profile' },
  answer: { title: 'Answers in questions', link: '' },
}

export const getCategoryItemLink: Record<
  string,
  (itemLink: string, itemId: string) => string
> = {
  tag: (itemLink, itemId) => `/tags/${itemLink}`,
  question: (itemLink, itemId) => `/question/${itemLink}`,
  user: (itemLink, itemId) => `/profile/${itemLink}`,
  answer: (itemLink, itemId) => `/question/${itemLink}#${itemId}`,
}
