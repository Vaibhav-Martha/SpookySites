import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { MongoClient } from 'mongodb'

let cachedClient = null

async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient
  }

  const client = new MongoClient(process.env.MONGODB_URI)
  await client.connect()
  cachedClient = client
  return client
}

const generateToken = (userId, username) => {
  return jwt.sign(
    { userId, username },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )
}

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { username, email, password } = req.body

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({
        error: 'Validation failed',
        message: 'All fields are required'
      })
    }

    if (username.length < 3 || username.length > 20) {
      return res.status(400).json({
        error: 'Validation failed',
        message: 'Username must be between 3-20 characters'
      })
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: 'Validation failed',
        message: 'Password must be at least 6 characters'
      })
    }

    const client = await connectToDatabase()
    const db = client.db('spookysites')
    const users = db.collection('users')

    // Check if user already exists
    const existingUser = await users.findOne({
      $or: [{ username }, { email }]
    })

    if (existingUser) {
      return res.status(409).json({
        error: 'User already exists',
        message: 'This digital spirit already haunts our realm 👻'
      })
    }

    // Hash password
    const saltRounds = 12
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Create user
    const newUser = {
      username,
      email: email.toLowerCase(),
      password: hashedPassword,
      profile: {
        avatar: '👻',
        status: 'Newly haunting the digital realm...',
        bio: '',
        location: 'Digital Afterlife',
        age: null,
        interests: []
      },
      lastLogin: null,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const result = await users.insertOne(newUser)

    // Generate token
    const token = generateToken(result.insertedId.toString(), username)

    // Return success response
    res.status(201).json({
      success: true,
      message: 'Welcome to the digital graveyard! Your soul has been registered 🦇',
      token,
      user: {
        _id: result.insertedId,
        username: newUser.username,
        email: newUser.email,
        profile: newUser.profile
      }
    })

  } catch (error) {
    console.error('Signup error:', error)
    res.status(500).json({
      error: 'Internal server error',
      message: 'The digital spirits are restless... Please try again 👻'
    })
  }
}