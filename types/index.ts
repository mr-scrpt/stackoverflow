import { BADGE_CRITERIA } from '@/constants'

export interface IFilter {
  name: string
  value: string
}

export interface ITag {
  _id: string
  name: string
}

export interface IPost {}

export interface IBaseUser {
  clerkId: string
  name: string
  username: string
  picture: string /* not required if login through third party */
  email: string
  password?: string
  bio?: string
  location?: string
  portfolioWebsite?: string
  reputation?: number
  joinedAt: Date
  postSaved?: IPost[]
}

export interface IAuthor extends Pick<IBaseUser, 'username' | 'picture'> {
  _id: string
  // name: string
  // img: string
}

export interface IBaseQuestion {
  title: string
  content: string
  tags: ITag[]
  author: IAuthor
  upVotes: number
  downVotes: number
  views: number
  answers: []
  createdAt: Date
}

export interface IQuestion extends IBaseQuestion {
  _id: string
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

export interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined }
}

export interface URLProps {
  params: { id: string }
  searchParams: { [key: string]: string | undefined }
}

export interface BadgeCounts {
  GOLD: number
  SILVER: number
  BRONZE: number
}

export type BadgeCriteriaType = keyof typeof BADGE_CRITERIA
