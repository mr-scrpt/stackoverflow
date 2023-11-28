import { SearchTypeEnum } from '@/types/shared'

export const ANSWER_PAGE_FILTER = [
  { name: 'Highest Upvotes', value: 'highestUpvotes' },
  { name: 'Lowest Upvotes', value: 'lowestUpvotes' },
  { name: 'Most Recent', value: 'recent' },
  { name: 'Oldest', value: 'old' },
]

export const USER_PAGE_FILTER = [
  { name: 'New Users', value: 'new_users' },
  { name: 'Old Users', value: 'old_users' },
  { name: 'Top Contributors', value: 'top_contributors' },
]

export const QUESTION_PAGE_FILTER = [
  { name: 'Most Recent', value: 'most_recent' },
  { name: 'Oldest', value: 'oldest' },
  { name: 'Most Voted', value: 'most_voted' },
  { name: 'Most Viewed', value: 'most_viewed' },
  { name: 'Most Answered', value: 'most_answered' },
]

export const TAG_PAGE_FILTER = [
  { name: 'Popular', value: 'popular' },
  { name: 'Recent', value: 'recent' },
  { name: 'Name', value: 'name' },
  { name: 'Old', value: 'old' },
]

export const HOME_PAGE_FILTER = [
  { name: 'Newest', value: 'newest' },
  { name: 'Recommended', value: 'recommended' },
  { name: 'Frequent', value: 'frequent' },
  { name: 'Unanswered', value: 'unanswered' },
]

// export enum FilterDataEnum {
//   NEWEST = 'newest',
//   RECOMMENDED = 'recommended',
//   FREQUENT = 'frequent',
//   UNANSWERED = 'answered',
// }
// export const HOME_PAGE_FILTER = [
//   { name: FilterDataEnum.NEWEST, value: FilterDataEnum.NEWEST },
//   { name: FilterDataEnum.RECOMMENDED, value: FilterDataEnum.RECOMMENDED},
//   { name: FilterDataEnum.FREQUENT, value: FilterDataEnum.FREQUENT},
//   { name: FilterDataEnum.UNANSWERED, value: FilterDataEnum.UNANSWERED },
// ]

export const GLOBAL_SEARCH_FILTER = [
  { name: 'Question', value: SearchTypeEnum.QUESTION },
  { name: 'Answer', value: SearchTypeEnum.ANSWER },
  { name: 'User', value: SearchTypeEnum.USER },
  { name: 'Tag', value: SearchTypeEnum.TAG },
]

export const URL_SEARCH_PARMS = {
  q: 'q',
  global: 'global',
  type: 'type',
}
