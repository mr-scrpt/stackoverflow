import { IBaseUser } from '@/types'
import { Schema, models, model, Document } from 'mongoose'

interface IUser extends Document, IBaseUser {
  // clerkId: string
  // name: string
  // username: string
  // picture: string
  // email: string
  // password?: string
  // bio?: string
  // location?: string
  // portfolioWebsite?: string
  // reputation?: number
  // joinedAt: Date
  // postSaved?: Schema.Types.ObjectId[]
}

export const UserSchema = new Schema<IUser>({
  clerkId: { type: String, required: true } /* clerk ID */,
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  picture: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  bio: { type: String },
  portfolioWebsite: { type: String },
  reputation: { type: Number, default: 0 },
  joinedAt: { type: Date, default: Date.now() },
  postSaved: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
})

export const UserModel = models.User || model<IUser>('User', UserSchema)
