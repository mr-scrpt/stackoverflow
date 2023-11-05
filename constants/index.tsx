import { SidebarLink } from '@/types'

const THEME_LIGHT = 'light'
const THEME_DARK = 'dark'
const THEME_SYSTEM = 'system'

export const THEME_LIST = [
  { value: THEME_LIGHT, name: 'Light', icon: '/assets/icons/sun.svg' },
  { value: THEME_DARK, name: 'Dark', icon: '/assets/icons/moon.svg' },
  { value: THEME_SYSTEM, name: 'System', icon: '/assets/icons/computer.svg' },
]

export const sidebarLinks: SidebarLink[] = [
  {
    imgURL: '/assets/icons/home.svg',
    route: '/',
    label: 'Home',
  },
  {
    imgURL: '/assets/icons/users.svg',
    route: '/community',
    label: 'Community',
  },
  {
    imgURL: '/assets/icons/star.svg',
    route: '/collection',
    label: 'Collections',
  },
  {
    imgURL: '/assets/icons/suitcase.svg',
    route: '/jobs',
    label: 'Find Jobs',
  },
  {
    imgURL: '/assets/icons/tag.svg',
    route: '/tags',
    label: 'Tags',
  },
  {
    imgURL: '/assets/icons/user.svg',
    route: '/profile',
    label: 'Profile',
  },
  {
    imgURL: '/assets/icons/question.svg',
    route: '/ask-question',
    label: 'Ask a question',
  },
]

export const BADGE_CRITERIA = {
  QUESTION_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  QUESTION_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  TOTAL_VIEWS: {
    BRONZE: 1000,
    SILVER: 10000,
    GOLD: 100000,
  },
}
