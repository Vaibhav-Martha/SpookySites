const express = require('express')
const multer = require('multer')
const path = require('path')
const UserProfile = require('../models/UserProfile')
const User = require('../models/User')
const { authenticateToken } = require('../middleware/auth')
const router = express.Router()

// Configure multer for profile photos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/profiles/')
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, 'profile-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true)
    } else {
      cb(new Error('Only image files are allowed!'), false)
    }
  }
})

// Get user profile
router.get('/:userId?', authenticateToken, async (req, res) => {
  try {
    const targetUserId = req.params.userId || req.user.userId
    
    let profile = await UserProfile.findOne({ user: targetUserId })
      .populate('user', 'username email profile')
      .populate('myspace.top8Friends', 'username profile.avatar')
    
    if (!profile) {
      // Create default profile if it doesn't exist
      profile = new UserProfile({
        user: targetUserId,
        myspace: {},
        orkut: {
          communities: [
            { name: 'College Students', icon: '🎓', joined: false },
            { name: 'Music Lovers', icon: '🎵', joined: false },
            { name: 'Photography', icon: '📸', joined: false },
            { name: 'Travel', icon: '✈️', joined: false }
          ]
        },
        geocities: {
          webRings: [
            { name: 'HTML Wizards Ring', members: 42, joined: false },
            { name: 'Retro Web Ring', members: 128, joined: false },
            { name: 'Cool Sites Ring', members: 256, joined: false }
          ]
        }
      })
      await profile.save()
      await profile.populate('user', 'username email profile')
    }
    
    // Increment profile views if viewing someone else's profile
    if (targetUserId !== req.user.userId) {
      profile.myspace.profileViews += 1
      await profile.save()
    }
    
    res.json(profile)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update profile data
router.put('/:platform', authenticateToken, async (req, res) => {
  try {
    const { platform } = req.params
    const updateData = req.body
    
    let profile = await UserProfile.findOne({ user: req.user.userId })
    
    if (!profile) {
      profile = new UserProfile({ user: req.user.userId })
    }
    
    // Update the specific platform data
    if (platform === 'myspace') {
      profile.myspace = { ...profile.myspace, ...updateData }
    } else if (platform === 'orkut') {
      profile.orkut = { ...profile.orkut, ...updateData }
    } else if (platform === 'geocities') {
      profile.geocities = { ...profile.geocities, ...updateData }
    }
    
    await profile.save()
    await profile.populate('user', 'username email profile')
    
    res.json(profile)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Upload profile photo
router.post('/photo', authenticateToken, upload.single('photo'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }
    
    let profile = await UserProfile.findOne({ user: req.user.userId })
    
    if (!profile) {
      profile = new UserProfile({ user: req.user.userId })
    }
    
    const photoData = {
      filename: req.file.filename,
      originalName: req.file.originalname,
      caption: req.body.caption || '',
      album: req.body.album || 'Profile Photos'
    }
    
    profile.photos.push(photoData)
    await profile.save()
    
    res.json({ 
      message: 'Photo uploaded successfully',
      photo: photoData,
      url: `/uploads/profiles/${req.file.filename}`
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get user's photos
router.get('/:userId/photos', authenticateToken, async (req, res) => {
  try {
    const profile = await UserProfile.findOne({ user: req.params.userId })
    
    if (!profile) {
      return res.json([])
    }
    
    const photos = profile.photos.map(photo => ({
      ...photo.toObject(),
      url: `/uploads/profiles/${photo.filename}`
    }))
    
    res.json(photos)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Search users
router.get('/search/:query', authenticateToken, async (req, res) => {
  try {
    const { query } = req.params
    
    const users = await User.find({
      $or: [
        { username: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } }
      ]
    }).select('username profile.avatar profile.status').limit(10)
    
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router