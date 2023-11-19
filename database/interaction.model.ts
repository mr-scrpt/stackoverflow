import { IBaseInteraction } from '@/types'
import { Schema, model, models, Document, Model } from 'mongoose'

// record user action to every question
export interface IDBInteraction extends Document, IBaseInteraction {
  // user: Schema.Types.ObjectId // reference to user
  // action: string
  // question: Schema.Types.ObjectId // reference to quesiton
  // answer: Schema.Types.ObjectId // reference to answer
  // tags: Schema.Types.ObjectId[] // reference to tag
  // createdAt: Date
}

export const InteractionSchema = new Schema<IDBInteraction>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, require: true },
  question: { type: Schema.Types.ObjectId, ref: 'Question' },
  answer: { type: Schema.Types.ObjectId, ref: 'Answer' },
  tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
  createdAt: { type: Date, default: Date.now() },
})

export const InteractionModel =
  (models.Interaction as Model<IDBInteraction>) ||
  model<IDBInteraction>('Interaction', InteractionSchema)
