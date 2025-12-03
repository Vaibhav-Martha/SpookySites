import axios from 'axios'
import Cookies from 'js-cookie'

// Configure axios defaults
const API_BASE_URL = 'http://localhost:5001'
axios.defaults.baseURL = API_BASE_URL

// Add auth token to requests
axios.interceptors.request.use((config) => {
  const token = Cookies.get('graveyard_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// API service functions
export const api = {
  // Posts
  async getPosts(platform, userId = null) {
    const url = userId ? `/api/posts/${platform}/${userId}` : `/api/posts/${platform}`
    const response = await axios.get(url)
    return response.data
  },

  async createPost(platform, postData, images = null) {
    const formData = new FormData()
    
    // Add text data
    Object.keys(postData).forEach(key => {
      if (postData[key] !== null && postData[key] !== undefined) {
        formData.append(key, postData[key])
      }
    })
    
    // Add images if provided
    if (images && images.length > 0) {
      images.forEach(image => {
        formData.append('images', image)
      })
    }
    
    const response = await axios.post(`/api/posts/${platform}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  },

  async likePost(postId) {
    const response = await axios.post(`/api/posts/${postId}/like`)
    return response.data
  },

  async replyToPost(postId, content) {
    const response = await axios.post(`/api/posts/${postId}/reply`, { content })
    return response.data
  },

  async deletePost(postId) {
    const response = await axios.delete(`/api/posts/${postId}`)
    return response.data
  },

  // Profile
  async getProfile(userId = null) {
    const url = userId ? `/api/profile/${userId}` : '/api/profile'
    const response = await axios.get(url)
    return response.data
  },

  async updateProfile(platform, data) {
    const response = await axios.put(`/api/profile/${platform}`, data)
    return response.data
  },

  async uploadPhoto(photo, caption = '', album = 'Profile Photos') {
    const formData = new FormData()
    formData.append('photo', photo)
    formData.append('caption', caption)
    formData.append('album', album)
    
    const response = await axios.post('/api/profile/photo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  },

  async getPhotos(userId = null) {
    const url = userId ? `/api/profile/${userId}/photos` : '/api/profile/photos'
    const response = await axios.get(url)
    return response.data
  },

  async searchUsers(query) {
    const response = await axios.get(`/api/profile/search/${query}`)
    return response.data
  }
}

export default api