import { BADGE_CRITERIA } from '@/constants'
import { BadgeCounts } from '@/types'
import { IRemoveUrlQueryParams, IUrlQueryParams } from '@/types/shared'
import { clsx, type ClassValue } from 'clsx'
import qs from 'query-string'
import slugify from 'slugify'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const slugifyConfig = {
  remove: undefined,
  lower: true,
  strict: false,
  locale: 'vi',
  trim: true,
}

export const slugGenerator = (str: string) => slugify(str, slugifyConfig)

export const getTimestamp = (createdAt: Date | string): string => {
  const now = new Date()
  // const createdAtDate = new Date(createdAt).getTime()
  // const diffMilliseconds = now.getTime() - createdAtDate
  let diffMilliseconds
  if (typeof createdAt === 'string') {
    diffMilliseconds = now.getTime() - new Date(createdAt).getTime()
  } else {
    diffMilliseconds = now.getTime() - createdAt.getTime()
  }

  const diffMinutes = Math.floor(diffMilliseconds / (1000 * 60))
  const diffHours = Math.floor(diffMinutes / 60)
  const diffDays = Math.floor(diffHours / 24)
  const diffMonths = Math.floor(diffDays / 30) // Approximate months
  const diffYears = Math.floor(diffDays / 365) // Approximate years

  let result = ''

  if (diffYears > 0) {
    result += `${diffYears} year${diffYears > 1 ? 's' : ''} ago`
  } else if (diffMonths > 0) {
    result += `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`
  } else if (diffDays > 0) {
    result += `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
  } else if (diffHours > 0) {
    result += `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
  } else if (diffMinutes > 0) {
    result += `${diffMinutes} min${diffMinutes > 1 ? 's' : ''} ago`
  } else {
    result += 'just now'
  }

  return result
}

export function formatNumber(number: number | string): string {
  const symbols = ['', 'K', 'M', 'B', 'T'] // Add more symbols for larger numbers if needed
  const tier = (Math.log10(Math.abs(Number(number))) / 3) | 0

  if (tier === 0) return String(number)

  const suffix = symbols[tier]
  const scale = Math.pow(10, tier * 3)
  const scaled = Number(number) / scale

  return `${scaled.toFixed(1)}${suffix}`
}

export const getJoinedDate = (date: Date | string): string => {
  // Extract the month and year from the Date object
  let dateInner
  if (typeof date === 'string') {
    dateInner = new Date(date)
  } else {
    dateInner = date
  }
  const month = dateInner.toLocaleString('default', { month: 'long' })
  const year = dateInner.getFullYear()

  // Create the joined date string (e.g., "September 2023")
  const joinedDate = `${month} ${year}`

  return joinedDate
}

export const toPlainObject = (obj: any) => JSON.parse(JSON.stringify(obj))

export const formUrlQuery = ({ params, key, value }: IUrlQueryParams) => {
  const currentUrl = qs.parse(params) // obj

  currentUrl[key] = value

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  )
}

export const removeKeysFromQuery = ({
  params,
  keysToRemove,
}: IRemoveUrlQueryParams) => {
  const currentParams = qs.parse(params) // obj

  keysToRemove.forEach((key) => delete currentParams[key])

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentParams,
    },
    { skipNull: true }
  )
}
interface BadgeParams {
  criteria: {
    type: keyof typeof BADGE_CRITERIA
    count: number
  }[]
}

// badge system
// accept user's scores and compare to criteria
export function assignBadges(param: BadgeParams) {
  const userBadges: BadgeCounts = {
    GOLD: 0,
    SILVER: 0,
    BRONZE: 0,
  }

  const { criteria } = param // user scores

  criteria.forEach((item) => {
    const { type, count } = item
    const badgeLevel: any = BADGE_CRITERIA[type] // {type: {GOLD, SILVER, BRONZE}}

    Object.keys(badgeLevel).forEach((level: any) => {
      if (count > badgeLevel[level]) {
        // if user's value > criteria
        userBadges[level as keyof BadgeCounts] += 1
      }
    })
  })

  return userBadges
}

export const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) {
    return text
  }

  const lastSpace = text.lastIndexOf(' ', maxLength)
  return text.substring(0, lastSpace) + '...'
}

export const arrayGen = (length: number) =>
  Array.from({ length }, (_, index) => index + 1)

export const stripHtmlTags = (input: string) => {
  const regex = /<[^>]*>/g
  return input.replace(regex, '')
}

export const processJobTitle = (title: string | undefined | null): string => {
  // Check if title is undefined or null
  if (title === undefined || title === null) {
    return 'No Job Title'
  }

  // Split the title into words
  const words = title.split(' ')

  // Filter out undefined or null and other unwanted words
  const validWords = words.filter((word) => {
    return (
      word !== undefined &&
      word !== null &&
      word.toLowerCase() !== 'undefined' &&
      word.toLowerCase() !== 'null'
    )
  })

  // If no valid words are left, return the general title
  if (validWords.length === 0) {
    return 'No Job Title'
  }

  // Join the valid words to create the processed title
  const processedTitle = validWords.join(' ')

  return processedTitle
}
