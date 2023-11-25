import { BADGE_CRITERIA } from '@/constants'

export interface IFilter {
  name: string
  value: string
}

export interface IUser
  extends Pick<
    IBaseUser,
    | 'clerkId'
    | 'username'
    | 'name'
    | 'picture'
    | 'postSaved'
    | 'slug'
    | 'portfolioWebsite'
    | 'bio'
    | 'location'
  > {
  _id: string
  // name: string
  // img: string
}

export interface IBaseTag {
  name: string
  slug: string
  description: string
  questions?: IQuestion[]
  totalQuestions?: number
  followers?: IUser[]
  createdOn: Date
}

export interface ITag extends IBaseTag {
  _id: string
}

export interface IBaseQuestion {
  title: string
  slug: string
  content: string
  tags: ITag[]
  author: IUser
  upVotes: IUser[]
  downVotes: IUser[]
  views: number
  answers: []
  createdAt: Date
}

export interface IBaseAnswer {
  author: IUser
  question: IBaseQuestion
  content: string
  upVotes: IUser[]
  downVotes: IUser[]
  createdAt: Date
}
export interface IAnswer extends IBaseAnswer {
  _id: string
}

export interface IBaseInteraction {
  user: IUser
  action: string
  question: IBaseQuestion
  answer: IBaseAnswer
  tags: IBaseTag
  createdAt: Date
}

export interface IQuestion extends IBaseQuestion {
  _id: string
}

export interface IBaseUser {
  clerkId: string
  name: string
  username: string
  slug: string
  picture: string /* not required if login through third party */
  email: string
  password?: string
  bio?: string
  location?: string
  portfolioWebsite?: string
  reputation?: number
  joinedAt: Date
  postSaved?: IQuestion[]
}
export interface SidebarLink {
  imgURL: string
  route: string
  label: string
}

export interface Job {
  id?: string
  employer_name?: string
  employer_logo?: string | undefined
  employer_website?: string
  job_employment_type?: string
  job_title?: string
  job_description?: string
  job_apply_link?: string
  job_city?: string
  job_state?: string
  job_country?: string
}

export interface Country {
  name: {
    common: string
  }
}

export interface ParamsProps {
  params: { id: string }
}
export interface ISearchParam {
  [key: string]: string | undefined
}

export interface ISearchParamsProps {
  searchParams: ISearchParam
}

export interface URLProps {
  params: { id: string }
  searchParams: ISearchParam
}

export interface BadgeCounts {
  GOLD: number
  SILVER: number
  BRONZE: number
}

export type BadgeCriteriaType = keyof typeof BADGE_CRITERIA

export interface IFilteredResultItem {
  title: string
  type: string
  link: string
  data: {
    title: string
    link: string
    id: any
  }[]
}
