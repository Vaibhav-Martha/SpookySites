import React, { createContext, useContext, useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { mockAuth } from '../services/mockAuth'

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
      // Verify token and get user profile
      verifyToken(savedToken)
    } else {
      setLoading(false)
    }
  }, [])

  const verifyToken = async (token) => {
    try {
      const user = await mockAuth.verifyToken(token)
      if (user) {
        setUser(user)
      } else {
        logout() // Clear invalid token
      }
    } catch (error) {
      console.error('Token verification failed:', error)
      logout() // Clear invalid token
    } finally {
      setLoading(false)
    }
  }

  const login = async (username, password) => {
    try {
      console.log('🧛‍♂️ Attempting login with:', username)
      const result = await mockAuth.login(username, password)
      console.log('🦇 Login result:', result)
      
      if (result.success) {
        setToken(result.token)
        setUser(result.user)
        console.log('✅ Login successful, user set:', result.user)
      }
      
      return result
    } catch (error) {
      console.error('❌ Login error:', error)
      return { success: false, message: 'Login failed' }
    }
  }

  const signup = async (username, email, password) => {
    try {
      const result = await mockAuth.signup(username, email, password)
      
      if (result.success) {
        setToken(result.token)
        setUser(result.user)
      }
      
      return result
    } catch (error) {
      console.error('Signup error:', error)
      return { success: false, message: 'Signup failed' }
    }
  }

  const logout = () => {
    // Remove token from cookie
    Cookies.remove('graveyard_token')
    
    setToken(null)
    setUser(null)
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