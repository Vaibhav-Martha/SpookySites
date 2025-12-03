const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
require('dotenv').config()

const demoUsers = [
  {
    username: 'GhostUser',
    email: 'ghost@graveyard.com',
    password: 'spooky123',
    profile: {
      avatar: '👻',
      status: 'Haunting the digital realm since 2003...',
      bio: 'Original MySpace user, now a digital ghost wandering the forgotten corners of the internet.',
      location: 'Digital Afterlife',
      age: null,
      interests: ['Haunting', 'Nostalgia', 'Web 1.0', 'Digital Archaeology']
    }
  },
  {
    username: 'ZombieKing',
    email: 'zombie@graveyard.com',
    password: 'undead666',
    profile: {
      avatar: '🧟‍♂️',
      status: 'Braaaains... and social media nostalgia',
      bio: 'Undead since the fall of Friendster. Still looking for brains and good HTML.',
      location: 'Zombie Apocalypse Server',
      age: null,
      interests: ['Brains', 'Orkut Scraps', 'Undead Networking', 'Retro Gaming']
    }
  },
  {
    username: 'VampireQueen',
    email: 'vampire@graveyard.com',
    password: 'bloodmoon',
    profile: {
      avatar: '🧛‍♀️',
      status: 'Eternal beauty, eternal MySpace profile',
      bio: 'Immortal vampire who has witnessed the rise and fall of every social network. My MySpace profile is still perfect.',
      location: 'Transylvanian Castle WiFi',
      age: 666,
      interests: ['Blood', 'Gothic Fashion', 'MySpace Customization', 'Eternal Youth']
    }
  },
  {
    username: 'SkeletonDJ',
    email: 'skeleton@graveyard.com',
    password: 'bones123',
    profile: {
      avatar: '💀',
      status: 'Spinning tracks from the crypt',
      bio: 'DJ by night, skeleton by... also night. Still have my original Winamp skins collection.',
      location: 'Underground Music Scene',
      age: null,
      interests: ['Music', 'DJing', 'Bone Rattling', 'MP3 Collections']
    }
  },
  {
    username: 'WitchCoder',
    email: 'witch@graveyard.com',
    password: 'magic404',
    profile: {
      avatar: '🧙‍♀️',
      status: 'Casting spells in HTML and CSS',
      bio: 'Coding witch who enchants websites with ancient HTML magic. My GeoCities page had the best animated GIFs.',
      location: 'Digital Coven',
      age: 300,
      interests: ['Magic', 'Web Development', 'Ancient HTML', 'CSS Spells']
    }
  }
]

const seedDemoUsers = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('🕯️ Connected to MongoDB for seeding...')

    // Check if demo users already exist
    const existingUsers = await User.find({
      username: { $in: demoUsers.map(u => u.username) }
    })

    if (existingUsers.length > 0) {
      console.log('👻 Demo users already exist in the graveyard!')
      console.log('Existing users:', existingUsers.map(u => u.username).join(', '))
      process.exit(0)
    }

    // Hash passwords and create users
    const saltRounds = 12
    const hashedUsers = await Promise.all(
      demoUsers.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, saltRounds)
      }))
    )

    // Insert demo users
    await User.insertMany(hashedUsers)
    
    console.log('🪦 ================================ 🪦')
    console.log('   Demo users successfully added to the digital graveyard!')
    console.log('👻 ================================ 👻')
    console.log('')
    console.log('🔐 Demo Login Credentials:')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    demoUsers.forEach(user => {
      console.log(`👤 Username: ${user.username}`)
      console.log(`📧 Email: ${user.email}`)
      console.log(`🔑 Password: ${user.password}`)
      console.log(`${user.profile.avatar} Status: ${user.profile.status}`)
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    })
    console.log('')
    console.log('🌐 Visit http://localhost:3001 to test the login!')
    console.log('👻 The digital spirits await your return...')
    
  } catch (error) {
    console.error('💀 Error seeding demo users:', error)
  } finally {
    await mongoose.disconnect()
    process.exit(0)
  }
}

seedDemoUsers()