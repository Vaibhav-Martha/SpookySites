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
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({
        error: 'Validation failed',
        message: 'Username and password are required'
      })
    }

    const client = await connectToDatabase()
    const db = client.db('spookysites')
    const users = db.collection('users')

    // Find user by username or email
    const user = await users.findOne({
      $or: [{ username }, { email: username }]
    })

    if (!user) {
      return res.status(401).json({
        error: 'Authentication failed',
        message: 'Invalid credentials - user not found in the digital realm 👻'
      })
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({
        error: 'Authentication failed',
        message: 'Invalid credentials - wrong password for this digital spirit 🔐'
      })
    }

    // Update last login
    await users.updateOne(
      { _id: user._id },
      { $set: { lastLogin: new Date() } }
    )

    // Generate token
    const token = generateToken(user._id.toString(), user.username)

    // Return success response
    res.status(200).json({
      success: true,
      message: 'Welcome back to the digital graveyard! 🦇',
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        profile: user.profile
      }
    })

  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({
      error: 'Internal server error',
      message: 'The digital spirits are restless... Please try again 👻'
    })
  }
}