import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-spin">👻</div>
          <p className="text-purple-400 text-xl">
            Awakening the digital spirits...
          </p>
        </div>
      </div>
    )
  }

  return isAuthenticated ? children : <Navigate to="/auth" replace />
}

export default ProtectedRoute