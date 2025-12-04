// Mock authentication service for demo purposes
import Cookies from 'js-cookie'

// Store for created users (in real app, this would be a database)
let CREATED_USERS = []

export const mockAuth = {
  async login(username, password) {
    console.log('🔍 MockAuth: Attempting login with:', username, password)
    console.log('👻 Available users:', CREATED_USERS.map(u => u.username))
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const user = CREATED_USERS.find(u => 
      (u.username === username || u.email === username) && u.password === password
    )
    
    console.log('🎯 Found user:', user ? user.username : 'None')
    
    if (user) {
      const token = btoa(JSON.stringify({ userId: user.id, username: user.username }))
      Cookies.set('graveyard_token', token, { expires: 7 })
      
      return {
        success: true,
        message: 'Welcome back to the digital graveyard! 🦇',
        token,
        user: {
          _id: user.id,
          username: user.username,
          email: user.email,
          profile: user.profile
        }
      }
    } else {
      return {
        success: false,
        message: 'Invalid credentials - this spirit is not recognized 👻'
      }
    }
  },

  async signup(username, email, password) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Check if user already exists
    const existingUser = CREATED_USERS.find(u => u.username === username || u.email === email)
    if (existingUser) {
      return {
        success: false,
        message: 'This digital spirit already haunts our realm 👻'
      }
    }
    
    // Create new user (in real app, this would save to database)
    const newUser = {
      id: Date.now().toString(),
      username,
      email,
      password,
      profile: {
        avatar: '👻',
        status: 'Newly haunting the digital realm...',
        bio: '',
        location: 'Digital Afterlife'
      }
    }
    
    // Add to created users array
    CREATED_USERS.push(newUser)
    
    const token = btoa(JSON.stringify({ userId: newUser.id, username: newUser.username }))
    Cookies.set('graveyard_token', token, { expires: 7 })
    
    return {
      success: true,
      message: 'Welcome to the digital graveyard! Your soul has been registered 🦇',
      token,
      user: {
        _id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        profile: newUser.profile
      }
    }
  },

  async verifyToken(token) {
    try {
      const decoded = JSON.parse(atob(token))
      const user = CREATED_USERS.find(u => u.id === decoded.userId)
      
      if (user) {
        return {
          _id: user.id,
          username: user.username,
          email: user.email,
          profile: user.profile
        }
      }
      return null
    } catch {
      return null
    }
  }
}