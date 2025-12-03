const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator')
const User = require('../models/User')
const router = express.Router()

// Helper function to generate JWT token
const generateToken = (userId, username) => {
  return jwt.sign(
    { userId, username },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  )
}

// Sign Up Route
router.post('/signup', [
  body('username')
    .isLength({ min: 3, max: 20 })
    .withMessage('Username must be between 3-20 characters')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers, and underscores'),
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        message: 'The digital spirits reject your offering 👻',
        details: errors.array()
      })
    }

    const { username, email, password } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ username }, { email }]
    })
    
    if (existingUser) {
      return res.status(409).json({
        error: 'User already exists',
        message: 'This soul has already been claimed by the digital graveyard 💀'
      })
    }

    // Hash password
    const saltRounds = 12
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    })

    await newUser.save()

    // Generate token
    const token = generateToken(newUser._id, newUser.username)

    res.status(201).json({
      success: true,
      message: 'Welcome to the digital graveyard! Your soul has been registered 🪦',
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        profile: newUser.profile
      }
    })

  } catch (error) {
    console.error('Signup error:', error)
    res.status(500).json({
      error: 'Internal server error',
      message: 'The digital spirits are experiencing technical difficulties 👻'
    })
  }
})

// Login Route
router.post('/login', [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        message: 'The graveyard gates require proper credentials 🔐',
        details: errors.array()
      })
    }

    const { username, password } = req.body

    // Find user by username or email
    const user = await User.findOne({
      $or: [{ username }, { email: username }]
    })

    if (!user) {
      return res.status(401).json({
        error: 'Invalid credentials',
        message: 'No such soul exists in our digital graveyard 💀'
      })
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    
    if (!isPasswordValid) {
      return res.status(401).json({
        error: 'Invalid credentials',
        message: 'The spirits reject your password offering 👻'
      })
    }

    // Update last login
    user.lastLogin = new Date()
    await user.save()

    // Generate token
    const token = generateToken(user._id, user.username)

    res.json({
      success: true,
      message: `Welcome back to the graveyard, ${user.username}! 🕯️`,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profile: user.profile,
        lastLogin: user.lastLogin
      }
    })

  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({
      error: 'Internal server error',
      message: 'The digital spirits are experiencing technical difficulties 👻'
    })
  }
})

// Get current user profile
router.get('/profile', require('../middleware/auth').authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
    
    if (!user) {
      return res.status(404).json({
        error: 'User not found',
        message: 'Your digital soul seems to have vanished from the graveyard 👻'
      })
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profile: user.profile,
        lastLogin: user.lastLogin
      }
    })
  } catch (error) {
    res.status(500).json({
      error: 'Server error',
      message: 'The digital spirits are experiencing technical difficulties 👻'
    })
  }
})

// Logout route (client-side token removal)
router.post('/logout', (req, res) => {
  res.json({
    success: true,
    message: 'Your spirit has departed the digital graveyard... until next time 🪦'
  })
})

module.exports = router