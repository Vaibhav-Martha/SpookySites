// Mock data service for posts, scraps, photos, etc.

// In-memory storage (in real app, this would be a database)
let SCRAPS = []
let PHOTOS = []
let PROFILE_STATS = {}

export const mockData = {
  // Scraps functionality
  async getScraps(platform = 'orkut') {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return SCRAPS.filter(scrap => scrap.platform === platform)
  },

  async createScrap(platform, content, authorId, authorUsername) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const newScrap = {
      _id: Date.now().toString(),
      platform,
      type: 'scrap',
      content,
      author: {
        _id: authorId,
        username: authorUsername
      },
      createdAt: new Date().toISOString(),
      likes: [],
      replies: []
    }
    
    SCRAPS.unshift(newScrap) // Add to beginning of array
    return newScrap
  },

  async deleteScrap(scrapId) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))
    
    SCRAPS = SCRAPS.filter(scrap => scrap._id !== scrapId)
    return { success: true }
  },

  async replyToScrap(scrapId, content, authorId, authorUsername) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const scrap = SCRAPS.find(s => s._id === scrapId)
    if (scrap) {
      const reply = {
        _id: Date.now().toString(),
        author: {
          _id: authorId,
          username: authorUsername
        },
        content,
        createdAt: new Date().toISOString()
      }
      scrap.replies.push(reply)
      return reply
    }
    throw new Error('Scrap not found')
  },

  // Profile stats
  async getProfileStats(userId) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))
    
    if (!PROFILE_STATS[userId]) {
      PROFILE_STATS[userId] = {
        views: Math.floor(Math.random() * 500) + 100,
        friends: Math.floor(Math.random() * 50) + 10,
        karma: Math.floor(Math.random() * 100) + 20
      }
    }
    
    return PROFILE_STATS[userId]
  },

  // Photos functionality
  async getPhotos(userId) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))
    
    return PHOTOS.filter(photo => photo.userId === userId)
  },

  async uploadPhoto(userId, file, caption = '') {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // In a real app, this would upload to a server
    // For demo, we'll create a fake photo object
    const newPhoto = {
      _id: Date.now().toString(),
      userId,
      filename: `photo_${Date.now()}.jpg`,
      caption,
      uploadDate: new Date().toISOString(),
      url: URL.createObjectURL(file) // Create a local URL for the uploaded file
    }
    
    PHOTOS.unshift(newPhoto)
    return newPhoto
  },

  // Search functionality
  async searchUsers(query) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // For demo, return some fake search results
    const fakeResults = [
      {
        _id: 'search1',
        username: `${query}_fan`,
        profile: {
          avatar: '👤',
          bio: `I love ${query}!`,
          location: 'Digital Realm'
        }
      },
      {
        _id: 'search2',
        username: `spooky_${query}`,
        profile: {
          avatar: '👻',
          bio: `Haunting the ${query} community`,
          location: 'Graveyard'
        }
      }
    ]
    
    return fakeResults
  }
}