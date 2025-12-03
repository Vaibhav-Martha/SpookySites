const mongoose = require('mongoose')

const userProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  myspace: {
    profileSong: {
      type: String,
      default: 'My Chemical Romance - Welcome to the Black Parade'
    },
    aboutMe: {
      type: String,
      default: 'Hey! Thanks for checking out my MySpace!'
    },
    whoIdLikeToMeet: {
      type: String,
      default: 'Cool people who share my interests!'
    },
    customCSS: String,
    backgroundColor: {
      type: String,
      default: '#ffffff'
    },
    textColor: {
      type: String,
      default: '#000000'
    },
    top8Friends: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    profileViews: {
      type: Number,
      default: 0
    }
  },
  orkut: {
    personalInfo: {
      relationship: String,
      age: Number,
      location: String,
      hometown: String,
      occupation: String,
      smoking: String,
      drinking: String,
      children: String,
      ethnicity: String,
      religion: String
    },
    karma: {
      type: Number,
      default: 50
    },
    communities: [{
      name: String,
      icon: String,
      joined: {
        type: Boolean,
        default: false
      }
    }]
  },
  geocities: {
    backgroundColor: {
      type: String,
      default: '#000080'
    },
    textColor: {
      type: String,
      default: '#FFFF00'
    },
    showConstruction: {
      type: Boolean,
      default: true
    },
    customHTML: {
      type: String,
      default: '<marquee>Welcome to my homepage!</marquee>'
    },
    visitorCount: {
      type: Number,
      default: Math.floor(Math.random() * 100000) + 50000
    },
    webRings: [{
      name: String,
      members: Number,
      joined: {
        type: Boolean,
        default: false
      }
    }]
  },
  photos: [{
    filename: String,
    originalName: String,
    caption: String,
    album: String,
    uploadDate: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
})

module.exports = mongoose.model('UserProfile', userProfileSchema)