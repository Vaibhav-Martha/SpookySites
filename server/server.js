const express = require('express')
const cors = require('cors')
const path = require('path')
const mongoose = require('mongoose')
const { createServer } = require('http')
const { Server } = require('socket.io')
require('dotenv').config()

const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3002",
    methods: ["GET", "POST"]
  }
})

const PORT = process.env.PORT || 5000

// Import routes
const authRoutes = require('./routes/auth')
const postRoutes = require('./routes/posts')
const profileRoutes = require('./routes/profile')
const { authenticateToken } = require('./middleware/auth')

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('🕯️ Connected to MongoDB - Digital spirits database online 👻'))
  .catch(err => console.error('💀 MongoDB connection error:', err))

// Create uploads directories
const fs = require('fs')
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads')
}
if (!fs.existsSync('uploads/profiles')) {
  fs.mkdirSync('uploads/profiles')
}

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/profile', profileRoutes)

// Socket.IO for real-time chat
io.on('connection', (socket) => {
  console.log('👻 A digital spirit connected:', socket.id)
  
  socket.on('join-room', (room) => {
    socket.join(room)
    console.log(`Spirit joined room: ${room}`)
  })
  
  socket.on('send-message', (data) => {
    socket.to(data.room).emit('receive-message', {
      ...data,
      timestamp: new Date().toISOString()
    })
  })
  
  socket.on('typing', (data) => {
    socket.to(data.room).emit('user-typing', data)
  })
  
  socket.on('stop-typing', (data) => {
    socket.to(data.room).emit('user-stop-typing', data)
  })
  
  socket.on('disconnect', () => {
    console.log('💀 A digital spirit departed:', socket.id)
  })
})

// Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'Graveyard server is haunting successfully! 👻',
    timestamp: new Date().toISOString(),
    status: 'undead'
  })
})

// Spooky data endpoints (protected routes)
app.get('/api/graveyard/stats', authenticateToken, (req, res) => {
  res.json({
    totalVisitors: 666666,
    ghostsOnline: Math.floor(Math.random() * 13) + 1,
    lastHaunting: new Date().toISOString(),
    activeSouls: ['Orkut Ghost', 'MySpace Phantom', 'GeoCities Specter']
  })
})

app.get('/api/orkut/scraps', authenticateToken, (req, res) => {
  res.json([
    {
      id: 1,
      user: "ZombieUser2004",
      message: "miss the old days when we could customize everything... now I'm just a digital ghost 👻",
      timestamp: "2011-01-01T00:00:00Z",
      avatar: "💀"
    },
    {
      id: 2,
      user: "DeadProfile",
      message: "anyone else still checking their scraps from beyond? the nostalgia is killing me... again 💀",
      timestamp: "2014-06-30T23:59:59Z",
      avatar: "👻"
    }
  ])
})

app.post('/api/orkut/scraps', authenticateToken, (req, res) => {
  const { message } = req.body
  res.json({
    success: true,
    message: 'Scrap sent to the digital void...',
    scrap: {
      id: Date.now(),
      user: "Anonymous Ghost",
      message,
      timestamp: new Date().toISOString(),
      avatar: "🕯️"
    }
  })
})

app.get('/api/myspace/themes', (req, res) => {
  res.json([
    { id: 'bloody-wallpaper', name: 'Bloody Wallpaper', haunted: true },
    { id: 'haunted-corridor', name: 'Haunted Corridor', haunted: true },
    { id: 'spider-web-blackout', name: 'Spider Web Blackout', haunted: true },
    { id: 'cursed-neon-grid', name: 'Cursed Neon Grid', haunted: true },
    { id: 'pumpkin-inferno', name: 'Pumpkin Inferno', haunted: true },
    { id: 'foggy-cemetery-night', name: 'Foggy Cemetery Night', haunted: true }
  ])
})

app.get('/api/geocities/gif-packs', (req, res) => {
  res.json({
    pack1: {
      name: '90s Horror Chaos',
      description: 'Classic chaotic 90s web with a spooky twist',
      gifs: ['construction.gif', 'spinning-skull.gif', 'pixel-bats.gif', 'neon-buttons.gif']
    },
    pack2: {
      name: 'Haunted Web 1.0',
      description: 'Early web horror aesthetics',
      gifs: ['dripping-blood.gif', 'gif-fire.gif', 'rotating-pumpkin.gif', 'crt-glitch.gif']
    },
    pack3: {
      name: 'Retro Halloween Aesthetic',
      description: 'Cute but spooky retro vibes',
      gifs: ['ghost-bounce.gif', 'witch-flying.gif', 'sparkle-animations.gif', 'cemetery-sign.gif']
    }
  })
})

// Guestbook endpoint
app.post('/api/geocities/guestbook', (req, res) => {
  const { name, message } = req.body
  res.json({
    success: true,
    message: 'Your spooky message has been added to the guestbook!',
    entry: {
      id: Date.now(),
      name: name || 'Anonymous Ghost',
      message,
      timestamp: new Date().toISOString(),
      ip: '127.0.0.1' // Classic GeoCities style
    }
  })
})

// 404 handler with spooky message
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Page not found in the digital graveyard... 👻',
    message: 'This URL has been buried with the rest of the forgotten web',
    suggestion: 'Try visiting /api/health to see if the server is still haunting'
  })
})

// Error handler
app.use((err, req, res, next) => {
  console.error('Spooky server error:', err.stack)
  res.status(500).json({
    error: 'Something went wrong in the digital afterlife... 💀',
    message: 'The server ghosts are investigating this haunting'
  })
})

server.listen(PORT, () => {
  console.log(`
  🕯️ ================================ 🕯️
     Graveyard server is haunting on port ${PORT}
     The digital spirits are restless...
     👻 Ready to serve the forgotten web 👻
     💬 Real-time chat enabled with Socket.IO
  🕯️ ================================ 🕯️
  `)
})