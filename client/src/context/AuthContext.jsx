import React, { createContext, useContext, useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(null)

  useEffect(() => {
    // Check for existing token on app load
    const savedToken = Cookies.get('graveyard_token')
    if (savedToken) {
      setToken(savedToken)
      // Set axios default header
      axios.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`
      // Verify token and get user profile
      verifyToken(savedToken)
    } else {
      setLoading(false)
    }
  }, [])

  const verifyToken = async (token) => {
    try {
      const response = await axios.get('/api/auth/profile')
      setUser(response.data.user)
    } catch (error) {
      console.error('Token verification failed:', error)
      logout() // Clear invalid token
    } finally {
      setLoading(false)
    }
  }

  const login = async (username, password) => {
    try {
      const response = await axios.post('/api/auth/login', {
        username,
        password
      })

      const { token: newToken, user: userData } = response.data
      
      // Save token to cookie (expires in 7 days)
      Cookies.set('graveyard_token', newToken, { expires: 7 })
      
      // Set axios default header
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
      
      setToken(newToken)
      setUser(userData)
      
      return { success: true, message: response.data.message }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed'
      return { success: false, message: errorMessage }
    }
  }

  const signup = async (username, email, password) => {
    try {
      const response = await axios.post('/api/auth/signup', {
        username,
        email,
        password
      })

      const { token: newToken, user: userData } = response.data
      
      // Save token to cookie (expires in 7 days)
      Cookies.set('graveyard_token', newToken, { expires: 7 })
      
      // Set axios default header
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
      
      setToken(newToken)
      setUser(userData)
      
      return { success: true, message: response.data.message }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Signup failed'
      const details = error.response?.data?.details || []
      return { success: false, message: errorMessage, details }
    }
  }

  const logout = () => {
    // Remove token from cookie
    Cookies.remove('graveyard_token')
    
    // Remove axios default header
    delete axios.defaults.headers.common['Authorization']
    
    setToken(null)
    setUser(null)
    
    // Optional: Call logout endpoint
    axios.post('/api/auth/logout').catch(() => {})
  }

  const value = {
    user,
    token,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}