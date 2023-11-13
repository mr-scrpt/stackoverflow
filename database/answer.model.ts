import { IBaseAnswer } from '@/types'
import { Document, Model, Schema, model, models } from 'mongoose'

// Document possess the types of database properties, such as "_id"
export interface IDBAnswer extends Document, IBaseAnswer {}

export const AnswerSchema = new Schema<IDBAnswer>({
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  question: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
  content: { type: String, required: true },
  upVotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  downVotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now() },
})

export const AnswerModel =
  (models.Answer as Model<IDBAnswer>) ||
  model<IDBAnswer>('Answer', AnswerSchema)

// export const QuestionModel = model<IDBQuestion>('Question', QuestionSchema)
// export default QuestionModel
