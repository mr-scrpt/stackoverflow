import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import * as cheerio from 'cheerio'
import slugify from 'slugify'

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

export const getJoinedDate = (date: Date): string => {
  // Extract the month and year from the Date object
  const month = date.toLocaleString('default', { month: 'long' })
  const year = date.getFullYear()

  // Create the joined date string (e.g., "September 2023")
  const joinedDate = `${month} ${year}`

  return joinedDate
}

export const parseHTMLToString = (html: string) => {
  const $ = cheerio.load(html)
  return $.text()
  // const parser = new DOMParser()
  // return parser.parseFromString(html, 'text/html').textContent
}

export const toPlainObject = (obj) => JSON.parse(JSON.stringify(obj))
