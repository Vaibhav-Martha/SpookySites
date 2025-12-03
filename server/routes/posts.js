const express = require('express')
const multer = require('multer')
const path = require('path')
const Post = require('../models/Post')
const UserProfile = require('../models/UserProfile')
const { authenticateToken } = require('../middleware/auth')
const router = express.Router()

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true)
    } else {
      cb(new Error('Only image files are allowed!'), false)
    }
  }
})

// Get posts for a specific platform and user
router.get('/:platform/:userId?', authenticateToken, async (req, res) => {
  try {
    const { platform, userId } = req.params
    const targetUserId = userId || req.user.userId
    
    const posts = await Post.find({
      platform,
      $or: [
        { author: targetUserId },
        { recipient: targetUserId }
      ]
    })
    .populate('author', 'username profile.avatar')
    .populate('recipient', 'username')
    .populate('likes.user', 'username')
    .populate('replies.author', 'username profile.avatar')
    .sort({ createdAt: -1 })
    
    res.json(posts)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create a new post
router.post('/:platform', authenticateToken, upload.array('images', 5), async (req, res) => {
  try {
    const { platform } = req.params
    const { type, content, recipient, rating, relationship, guestName, guestEmail } = req.body
    
    const postData = {
      author: req.user.userId,
      platform,
      type,
      content,
      recipient: recipient || null,
      metadata: {
        rating: rating || null,
        relationship: relationship || null,
        guestName: guestName || null,
        guestEmail: guestEmail || null
      }
    }
    
    // Handle uploaded images
    if (req.files && req.files.length > 0) {
      postData.images = req.files.map(file => ({
        filename: file.filename,
        originalName: file.originalname,
        mimetype: file.mimetype,
        size: file.size
      }))
    }
    
    const post = new Post(postData)
    await post.save()
    
    // Populate the post before sending response
    await post.populate('author', 'username profile.avatar')
    if (post.recipient) {
      await post.populate('recipient', 'username')
    }
    
    res.status(201).json(post)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Like/unlike a post
router.post('/:postId/like', authenticateToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)
    if (!post) {
      return res.status(404).json({ error: 'Post not found' })
    }
    
    const existingLike = post.likes.find(like => 
      like.user.toString() === req.user.userId
    )
    
    if (existingLike) {
      // Unlike
      post.likes = post.likes.filter(like => 
        like.user.toString() !== req.user.userId
      )
    } else {
      // Like
      post.likes.push({ user: req.user.userId })
    }
    
    await post.save()
    await post.populate('likes.user', 'username')
    
    res.json({ likes: post.likes })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Add reply to a post
router.post('/:postId/reply', authenticateToken, async (req, res) => {
  try {
    const { content } = req.body
    const post = await Post.findById(req.params.postId)
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' })
    }
    
    post.replies.push({
      author: req.user.userId,
      content
    })
    
    await post.save()
    await post.populate('replies.author', 'username profile.avatar')
    
    res.json({ replies: post.replies })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Delete a post
router.delete('/:postId', authenticateToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' })
    }
    
    // Check if user owns the post or is the recipient
    if (post.author.toString() !== req.user.userId && 
        (!post.recipient || post.recipient.toString() !== req.user.userId)) {
      return res.status(403).json({ error: 'Not authorized to delete this post' })
    }
    
    await Post.findByIdAndDelete(req.params.postId)
    res.json({ message: 'Post deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router