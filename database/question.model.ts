import { IBaseQuestion } from '@/types'
import { Document, Model, Schema, model, models } from 'mongoose'

export interface IDBQuestion extends Document, IBaseQuestion {}

export const QuestionSchema = new Schema<IDBQuestion>({
  title: { type: String, required: true },
  slug: { type: String, required: true },
  content: { type: String, required: true },
  tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
  answers: [{ type: Schema.Types.ObjectId, ref: 'Answer' }],
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  upVotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  downVotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
})

export const QuestionModel =
  (models?.Question as Model<IDBQuestion>) ||
  model<IDBQuestion>('Question', QuestionSchema)
