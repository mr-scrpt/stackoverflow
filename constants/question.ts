import { IQuestion } from '@/types'

export const QUESTIONS: IQuestion[] = [
  {
    _id: '1',
    title:
      'The Lightning Component c:LWC_PizzaTracker generated invalid output for field status. Error How to solve this',
    tags: [
      { _id: '1', name: 'python' },
      { _id: '2', name: 'sql' },
    ],
    author: {
      _id: 'author1',
      name: 'John Doe',
      picture: 'url/to/picture1.jpg',
    },
    upVotes: 1510649,
    views: 1600,
    answers: [],
    createdAt: new Date('2023-09-01T12:00:00.000Z'),
  },
  {
    _id: '2',
    title:
      'JavaScript validation for a form stops the form data from being submitted to mysql database',
    tags: [
      { _id: '4', name: 'react' },
      { _id: '62', name: 'javascript' },
      { _id: '92', name: 'invalid fileds' },
    ],
    author: {
      _id: 'author2',
      name: 'Satheesh',
      picture: 'url/to/picture2.jpg',
    },
    upVotes: 6,
    views: 10,
    answers: [],
    createdAt: new Date('2023-09-1T12:00:00.000Z'),
  },
  {
    _id: '3',
    title:
      'The Lightning Component c:LWC_PizzaTracker generated invalid output for field status. Error How to solve this',
    tags: [{ _id: '6', name: 'C++' }],
    author: { _id: 'author3', name: 'Dave', picture: 'url/to/picture3.jpg' },
    upVotes: 103,
    views: 1006,
    answers: [],
    createdAt: new Date('2021-09-01T12:00:00.000Z'),
  },
]
