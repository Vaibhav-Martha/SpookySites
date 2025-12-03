const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  platform: {
    type: String,
    enum: ['myspace', 'orkut', 'geocities'],
    required: true
  },
  type: {
    type: String,
    enum: ['comment', 'scrap', 'guestbook', 'testimonial', 'status'],
    required: true
  },
  content: {
    type: String,
    required: true
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  images: [{
    filename: String,
    originalName: String,
    mimetype: String,
    size: Number,
    uploadDate: {
      type: Date,
      default: Date.now
    }
  }],
  likes: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  replies: [{
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    content: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  metadata: {
    rating: Number,
    relationship: String,
    guestName: String,
    guestEmail: String
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Post', postSchema)