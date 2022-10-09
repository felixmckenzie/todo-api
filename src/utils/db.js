import mongoose from 'mongoose'
import 'dotenv/config'

export const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL)
}
