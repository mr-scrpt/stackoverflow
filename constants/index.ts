import { SidebarLink } from '@/types'

export const THEME_LIGHT = 'light'
export const THEME_DARK = 'dark'
export const THEME_SYSTEM = 'system'

export const THEME_LIST = [
  {
    value: THEME_LIGHT,
    name: 'Light',
    icon: `/assets/icons/${THEME_LIGHT}.svg`,
  },
  { value: THEME_DARK, name: 'Dark', icon: `/assets/icons/${THEME_DARK}.svg` },

  {
    value: THEME_SYSTEM,
    name: 'System',
    icon: `/assets/icons/${THEME_SYSTEM}.svg`,
  },
]

export const SIDEBAR_LINKS: SidebarLink[] = [
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

// export const HOT_NETWORKS = [
//   {
//     _id: 1,
//     title:
//       'Would it be appropriate to point out an error in another paper during a referee report?',
//   },
//   {
//     _id: 2,
//     title: 'How can an airconditioning machine exist?',
//   },
//   {
//     _id: 3,
//     title: 'Interrogated every time crossing UK Border as citizen',
//   },
//   {
//     _id: 4,
//     title: 'WLow digit addition generator',
//   },
//   {
//     _id: 5,
//     title:
//       'What is an example of 3 totalQuestionss that do not make up a vector?',
//   },
// ]
//
// export const POPULAR_TAG = [
//   {
//     _id: 1,
//     name: 'JAVASCRIPT',
//     totalQuestions: 20152,
//   },
//   {
//     _id: 2,
//     name: 'PYTHON',
//     totalQuestions: 18493,
//   },
//   {
//     _id: 3,
//     name: 'JAVA',
//     totalQuestions: 18269,
//   },
//   {
//     _id: 4,
//     name: 'KUBERNATES',
//     totalQuestions: 15121,
//   },
//
//   {
//     _id: 5,
//     name: 'APOLLO',
//     totalQuestions: 14431,
//   },
//   {
//     _id: 6,
//     name: 'DOCKER',
//     totalQuestions: 9429,
//   },
//   {
//     _id: 7,
//     name: 'WEBSOCKET',
//     totalQuestions: 9429,
//   },
//   {
//     _id: 8,
//     name: 'MACHINE LEARNING',
//     totalQuestions: 9429,
//   },
// ]
