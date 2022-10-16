import 'dotenv/config'
import jwt from 'jsonwebtoken'
import { User } from '../resources/user/user.model'

export const newToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET)
}

export const verifyToken = async (token) => {
    return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) return reject(err)
      console.log(payload)
      resolve(payload)
    })
  })
}

export const signUp = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: 'email and password required' })
  }
  if (!req.body.username) {
    return res.status(400).send({ message: 'username required' })
  }

  try {
    const user = await User.create(req.body)
    const token = newToken(user)
    return res.status(201).send({ token })
  } catch (e) {
    return res.status(500).end()
  }
}

export const signIn = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: 'email and password required' })
  }

  try {
    const user = await User.findOne({
      email: req.body.email,
    })
      .select('email password')
      .exec()

    if (!user) {
      res.status(401).send({ message: 'invalid username or password' })
    }

   
    const match = user.checkPassword(req.body.password)

    if (!match) {
      res.status(401).send({ message: 'invalid username or password' })
    }

    const token = newToken(user)

    return res.status(201).send({ token }) 
  } catch (e) {
    console.log(e)
    return res.status(500).end()
  }
}

export const protect = async (req, res, next) => {
  const bearer = req.headers.authorization
  if (!bearer) {
    return res.status(401).end()
  }
  const token = bearer.split('Bearer ')[1].trim()
  
  try {
  const payload = await verifyToken(token)
  const user = await User.findById(payload.id).select('-password').exec()
  req.user = user
   next() 
  } catch (e) {
    console.log(e)
    return res.status(401).end()
  }
}
