import { IBaseTag } from '@/types'
import { Document, Model, Schema, model, models } from 'mongoose'

export interface IDBTag extends Document, IBaseTag {}

export const TagSchema = new Schema<IDBTag>({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true },
  description: { type: String, required: true },
  questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
  followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdOn: { type: Date, default: Date.now() },
})

export const TagModel =
  (models?.Tag as Model<IDBTag>) || model<IDBTag>('Tag', TagSchema)
