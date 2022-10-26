import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import { signUp, signIn, protect } from './utils/auth'
import { connectDb } from './utils/db'
import taskRouter from './resources/task/task.router'
import listRouter from './resources/list/list.router'
import userRouter from './resources/user/user.router'

const app = express()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

app.post('/signup', signUp)
app.post('/signin', signIn)

app.use('/api', protect)
app.use('/api/list', listRouter)
app.use('/api/list', taskRouter)
app.use('/api/user', userRouter)

export const start = async () => {
  try {
    connectDb()
    app.listen(process.env.PORT, () => {
      console.log('listening on port 8080')
    })
  } catch (e) {
    console.log(e)
  }
}
