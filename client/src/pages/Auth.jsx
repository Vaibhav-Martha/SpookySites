import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { useAuth } from '../context/AuthContext'
import BackgroundEffects from '../components/BackgroundEffects'

const Auth = () => {
  const navigate = useNavigate()
  const { login, signup, isAuthenticated } = useAuth()
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState([])
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const containerRef = useRef(null)
  const formRef = useRef(null)
  const titleRef = useRef(null)

  useEffect(() => {
    // Redirect if already authenticated
    if (isAuthenticated) {
      navigate('/graveyard')
      return
    }

    // Animate entrance
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 2, ease: "power2.out" }
    )

    gsap.fromTo(formRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1.5, delay: 0.5, ease: "back.out(1.7)" }
    )
  }, [isAuthenticated, navigate])

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([])
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrors([])
    setMessage('')

    try {
      let result
      if (isLogin) {
        result = await login(formData.username, formData.password)
      } else {
        result = await signup(formData.username, formData.email, formData.password)
      }

      if (result.success) {
        setMessage(result.message)
        // Thunder flash effect before redirect
        const flash = document.createElement('div')
        flash.className = 'fixed inset-0 bg-purple-600 z-50 pointer-events-none'
        flash.style.opacity = '0'
        document.body.appendChild(flash)

        gsap.to(flash, {
          opacity: 0.8,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
          onComplete: () => {
            navigate('/graveyard')
            document.body.removeChild(flash)
          }
        })
      } else {
        setMessage(result.message)
        if (result.details) {
          setErrors(result.details)
        }
      }
    } catch (error) {
      setMessage('Something went wrong in the digital realm... 💀')
    } finally {
      setLoading(false)
    }
  }

  const toggleMode = () => {
    setIsLogin(!isLogin)
    setFormData({ username: '', email: '', password: '' })
    setErrors([])
    setMessage('')
    
    // Animate form transition
    gsap.to(formRef.current, {
      scale: 0.9,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    })
  }

  const fillDemoCredentials = (username, password) => {
    setFormData({
      ...formData,
      username,
      password
    })
    setErrors([])
    setMessage('')
    
    // Switch to login mode if not already
    if (!isLogin) {
      setIsLogin(true)
    }
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-black relative overflow-hidden">
      <BackgroundEffects />
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <h1 
          ref={titleRef}
          className="text-5xl md:text-7xl font-horror text-blood-red mb-8 text-center gothic-text drop-shadow-2xl"
          style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.8), 0 0 20px rgba(139,0,0,0.5)' }}
        >
          {isLogin ? 'Enter the' : 'Join the'}
          <br />
          <span className="text-ghost-white animate-flicker">Digital Graveyard</span>
        </h1>
        
        <div 
          ref={formRef}
          className="bg-black/80 border-4 border-purple-600 rounded-lg p-8 w-full max-w-md shadow-2xl"
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl font-horror font-bold text-purple-400 mb-2 animate-pulse-glow">
              {isLogin ? '👻 Sign In' : '🪦 Create Account'}
            </h2>
            <p className="text-gray-300 text-sm font-medieval italic">
              {isLogin 
                ? 'Welcome back, digital spirit...' 
                : 'Register your soul in the graveyard...'
              }
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-purple-300 text-sm font-medieval font-semibold mb-2">
                Username {!isLogin && '/ Email'}
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full bg-gray-900 border-2 border-purple-500 rounded px-3 py-2 text-white focus:border-purple-400 focus:outline-none transition-colors"
                placeholder={isLogin ? "Enter your username or email" : "Choose a spooky username"}
                required
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-purple-300 text-sm font-medieval font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-gray-900 border-2 border-purple-500 rounded px-3 py-2 text-white focus:border-purple-400 focus:outline-none transition-colors"
                  placeholder="your.email@graveyard.com"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-purple-300 text-sm font-medieval font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full bg-gray-900 border-2 border-purple-500 rounded px-3 py-2 text-white focus:border-purple-400 focus:outline-none transition-colors"
                placeholder={isLogin ? "Enter your password" : "Create a secure password (min 6 chars)"}
                required
              />
            </div>

            {/* Error Messages */}
            {errors.length > 0 && (
              <div className="bg-red-900/50 border border-red-500 rounded p-3">
                <ul className="text-red-300 text-sm space-y-1">
                  {errors.map((error, index) => (
                    <li key={index}>• {error.msg}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Success/Error Message */}
            {message && (
              <div className={`border rounded p-3 ${
                message.includes('Welcome') || message.includes('registered')
                  ? 'bg-green-900/50 border-green-500 text-green-300'
                  : 'bg-red-900/50 border-red-500 text-red-300'
              }`}>
                <p className="text-sm">{message}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full spooky-button font-horror text-lg py-3 disabled:opacity-50 disabled:cursor-not-allowed animate-pulse-glow"
            >
              {loading ? (
                <span className="flex items-center justify-center font-medieval">
                  <div className="animate-spin mr-2">⚡</div>
                  {isLogin ? 'Entering...' : 'Registering...'}
                </span>
              ) : (
                isLogin ? '🚪 Enter Cemetery' : '📝 Join Graveyard'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={toggleMode}
              className="text-purple-400 hover:text-purple-300 text-sm underline transition-colors font-medieval"
            >
              {isLogin 
                ? "New spirit? Create an account 👻" 
                : "Already haunting? Sign in 🪦"
              }
            </button>
          </div>

          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              ⚠️ Your digital soul will be stored securely ⚠️
            </p>
          </div>




        </div>
      </div>
    </div>
  )
}

export default Auth