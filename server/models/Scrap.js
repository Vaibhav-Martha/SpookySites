const mongoose = require('mongoose')

const scrapSchema = new mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  message: {
    type: String,
    required: true,
    maxlength: 1000
  },
  isPublic: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Scrap', scrapSchema)