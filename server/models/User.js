const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 20
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  profile: {
    avatar: {
      type: String,
      default: '👻'
    },
    status: {
      type: String,
      default: 'Newly haunting the digital realm...'
    },
    bio: {
      type: String,
      default: ''
    },
    location: {
      type: String,
      default: 'Digital Afterlife'
    },
    age: {
      type: Number,
      default: null
    },
    interests: [{
      type: String
    }]
  },
  lastLogin: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('User', userSchema)