import mongoose from 'mongoose'

let isConnected: boolean = false

export const connectToDatabase = async () => {
  mongoose.set('strictQuery', true)

  if (!process.env.MONGOM_DB_CONNECT_URL)
    return console.log('MISSING MONGODB_URL')

  if (isConnected) {
    console.log('MongoDB is already connected')
    return
  }

  try {
    await mongoose.connect(process.env.MONGOM_DB_CONNECT_URL, {
      dbName: 'devflow',
    })

    isConnected = true

    console.log('Mongodb is connected')
  } catch (error) {
    console.error(error)
  }
}
