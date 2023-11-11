import { IBaseTag } from '@/types'
import { Schema, models, model, Document } from 'mongoose'

export interface IDBTag extends Document, IBaseTag {
  // name: string,
  // description: string,
  // questions?: Schema.Types.ObjectId[],
  // followers?: Schema.Types.ObjectId[],
  // createdOn: Date
}

const TagSchema = new Schema<IDBTag>({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
  followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdOn: { type: Date, default: Date.now() },
})

export const TagModel = models.Tag || model<IDBTag>('Tag', TagSchema)
