import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { useAuth } from '../context/AuthContext'

const MySpaceEnhanced = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const containerRef = useRef(null)
  const spiderRef = useRef(null)
  const musicPlayerRef = useRef(null)
  
  // State for customization
  const [currentTheme, setCurrentTheme] = useState('classic-blue')
  const [profileSong, setProfileSong] = useState('My Immortal - Evanescence')
  const [customStatus, setCustomStatus] = useState("Living my best digital afterlife 💀")
  const [aboutMe, setAboutMe] = useState("Welcome to my haunted corner of the internet! I'm a digital ghost wandering through the forgotten realms of social media. Love customizing profiles, collecting vintage GIFs, and connecting with fellow spirits of the web.")
  const [interests, setInterests] = useState("Gothic music, Web 1.0 nostalgia, HTML/CSS wizardry, Vintage memes, Digital archaeology")
  
  // Widget states
  const [widgets, setWidgets] = useState({
    musicPlayer: true,
    friendsOnline: true,
    moodRing: true,
    guestbook: true,
    photoSlideshow: true,
    customHTML: false
  })

  // Friends list
  const [friends, setFriends] = useState([
    { name: 'Tom', avatar: '👨‍💻', status: 'Online', isTop8: true },
    { name: 'Sarah_Gothic', avatar: '🖤', status: 'Away', isTop8: true },
    { name: 'MikeTheVampire', avatar: '🧛‍♂️', status: 'Online', isTop8: true },
    { name: 'PixelWitch', avatar: '🧙‍♀️', status: 'Offline', isTop8: true },
    { name: 'RetroGamer', avatar: '🎮', status: 'Online', isTop8: true },
    { name: 'CyberGhost', avatar: '👻', status: 'Invisible', isTop8: true },
    { name: 'NeonDreamer', avatar: '💫', status: 'Online', isTop8: true },
    { name: 'DigitalNomad', avatar: '🌐', status: 'Away', isTop8: true }
  ])

  // Guestbook entries
  const [guestbook, setGuestbook] = useState([
    { name: 'Sarah_Gothic', message: 'Love your profile! The dark theme is perfect 🖤', time: '2 hours ago' },
    { name: 'MikeTheVampire', message: 'Great song choice! Evanescence is eternal 🧛‍♂️', time: '5 hours ago' },
    { name: 'PixelWitch', message: 'Your HTML skills are magical! Teach me your ways ✨', time: '1 day ago' }
  ])

  const [newGuestbookEntry, setNewGuestbookEntry] = useState('')

  // Themes
  const themes = {
    'classic-blue': {
      name: 'Classic MySpace Blue',
      bg: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
      accent: '#60a5fa',
      text: '#ffffff'
    },
    'gothic-dark': {
      name: 'Gothic Darkness',
      bg: 'linear-gradient(135deg, #1f1f1f 0%, #4c1d95 100%)',
      accent: '#8b5cf6',
      text: '#e5e7eb'
    },
    'neon-cyber': {
      name: 'Neon Cyberpunk',
      bg: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
      accent: '#00ffff',
      text: '#00ff00'
    },
    'sunset-vibes': {
      name: 'Sunset Vibes',
      bg: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 50%, #8b5cf6 100%)',
      accent: '#fbbf24',
      text: '#ffffff'
    },
    'matrix-green': {
      name: 'Matrix Code',
      bg: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
      accent: '#00ff00',
      text: '#00ff00'
    }
  }

  useEffect(() => {
    // Animate page entrance
    gsap.fromTo(containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 }
    )

    // Music player animation
    if (widgets.musicPlayer && musicPlayerRef.current) {
      gsap.to(musicPlayerRef.current.querySelector('.music-bars'), {
        scaleY: 1.5,
        duration: 0.5,
        yoyo: true,
        repeat: -1,
        ease: "power2.inOut"
      })
    }
  }, [widgets.musicPlayer])

  const addGuestbookEntry = () => {
    if (newGuestbookEntry.trim()) {
      const newEntry = {
        name: user?.username || 'Anonymous',
        message: newGuestbookEntry,
        time: 'Just now'
      }
      setGuestbook([newEntry, ...guestbook])
      setNewGuestbookEntry('')
    }
  }

  const toggleWidget = (widgetName) => {
    setWidgets(prev => ({
      ...prev,
      [widgetName]: !prev[widgetName]
    }))
  }

  return (
    <div 
      ref={containerRef}
      className="min-h-screen text-white"
      style={{ background: themes[currentTheme].bg }}
    >
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <h1 className="text-3xl font-bold" style={{ color: themes[currentTheme].accent }}>
                MySpace
              </h1>
              <nav className="hidden md:flex space-x-4 text-sm">
                <a href="#" className="hover:underline opacity-80 hover:opacity-100">Home</a>
                <a href="#" className="hover:underline opacity-80 hover:opacity-100">Browse</a>
                <a href="#" className="hover:underline opacity-80 hover:opacity-100">Music</a>
                <a href="#" className="hover:underline opacity-80 hover:opacity-100">Videos</a>
                <a href="#" className="hover:underline opacity-80 hover:opacity-100">Groups</a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm">Welcome, {user?.username}!</span>
              <button 
                onClick={() => navigate('/graveyard')}
                className="px-3 py-1 bg-white/20 rounded hover:bg-white/30 transition-colors text-sm"
              >
                Graveyard
              </button>
              <button
                onClick={logout}
                className="px-3 py-1 bg-red-600/80 rounded hover:bg-red-600 transition-colors text-sm"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Profile & Customization */}
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="text-center mb-4">
                <div className="w-24 h-24 mx-auto mb-3 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-3xl">
                  {user?.profile?.avatar || '👤'}
                </div>
                <h2 className="text-xl font-bold" style={{ color: themes[currentTheme].accent }}>
                  {user?.username}
                </h2>
                <p className="text-sm opacity-80">{customStatus}</p>
              </div>
              
              <div className="space-y-2 text-sm">
                <div><strong>Last Login:</strong> Just now</div>
                <div><strong>Profile Views:</strong> {Math.floor(Math.random() * 10000) + 1000}</div>
                <div><strong>Mood:</strong> 😈 Mysteriously spooky</div>
              </div>
            </div>

            {/* Theme Selector */}
            <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <h3 className="font-bold mb-3" style={{ color: themes[currentTheme].accent }}>
                🎨 Profile Theme
              </h3>
              <select 
                value={currentTheme}
                onChange={(e) => setCurrentTheme(e.target.value)}
                className="w-full bg-black/50 border border-white/30 rounded px-3 py-2 text-white"
              >
                {Object.entries(themes).map(([key, theme]) => (
                  <option key={key} value={key}>{theme.name}</option>
                ))}
              </select>
            </div>

            {/* Widget Manager */}
            <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <h3 className="font-bold mb-3" style={{ color: themes[currentTheme].accent }}>
                🔧 Widget Manager
              </h3>
              <div className="space-y-2">
                {Object.entries(widgets).map(([key, enabled]) => (
                  <label key={key} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={enabled}
                      onChange={() => toggleWidget(key)}
                      className="rounded"
                    />
                    <span className="text-sm capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Music Player Widget */}
            {widgets.musicPlayer && (
              <div ref={musicPlayerRef} className="bg-black/30 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <h3 className="font-bold mb-3" style={{ color: themes[currentTheme].accent }}>
                  🎵 Now Playing
                </h3>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded flex items-center justify-center">
                    <span className="music-bars">🎵</span>
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      value={profileSong}
                      onChange={(e) => setProfileSong(e.target.value)}
                      className="w-full bg-transparent border-b border-white/30 pb-1 focus:outline-none focus:border-white/60"
                      placeholder="Enter your profile song..."
                    />
                    <div className="flex items-center space-x-2 mt-2">
                      <button className="text-2xl hover:scale-110 transition-transform">⏮️</button>
                      <button className="text-2xl hover:scale-110 transition-transform">⏯️</button>
                      <button className="text-2xl hover:scale-110 transition-transform">⏭️</button>
                      <div className="flex-1 bg-white/20 h-1 rounded">
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-full w-1/3 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* About Me Section */}
            <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h3 className="font-bold mb-4" style={{ color: themes[currentTheme].accent }}>
                📝 About Me
              </h3>
              <textarea
                value={aboutMe}
                onChange={(e) => setAboutMe(e.target.value)}
                className="w-full bg-black/30 border border-white/30 rounded p-3 text-white resize-none focus:outline-none focus:border-white/60"
                rows="4"
                placeholder="Tell the world about yourself..."
              />
              
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Interests:</h4>
                <input
                  type="text"
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                  className="w-full bg-black/30 border border-white/30 rounded p-2 text-white focus:outline-none focus:border-white/60"
                  placeholder="Your interests..."
                />
              </div>
            </div>

            {/* Guestbook Widget */}
            {widgets.guestbook && (
              <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h3 className="font-bold mb-4" style={{ color: themes[currentTheme].accent }}>
                  📖 Guestbook
                </h3>
                
                {/* Add new entry */}
                <div className="mb-4">
                  <textarea
                    value={newGuestbookEntry}
                    onChange={(e) => setNewGuestbookEntry(e.target.value)}
                    className="w-full bg-black/30 border border-white/30 rounded p-3 text-white resize-none focus:outline-none focus:border-white/60"
                    rows="2"
                    placeholder="Sign the guestbook..."
                  />
                  <button
                    onClick={addGuestbookEntry}
                    className="mt-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded hover:from-purple-600 hover:to-pink-600 transition-colors"
                  >
                    Sign Guestbook
                  </button>
                </div>

                {/* Guestbook entries */}
                <div className="space-y-3">
                  {guestbook.map((entry, index) => (
                    <div key={index} className="bg-black/20 rounded p-3 border-l-4 border-purple-500">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-semibold text-purple-300">{entry.name}</span>
                        <span className="text-xs opacity-60">{entry.time}</span>
                      </div>
                      <p className="text-sm">{entry.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar - Friends & Widgets */}
          <div className="space-y-6">
            {/* Friends Online */}
            {widgets.friendsOnline && (
              <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <h3 className="font-bold mb-3" style={{ color: themes[currentTheme].accent }}>
                  👥 Friends Online ({friends.filter(f => f.status === 'Online').length})
                </h3>
                <div className="space-y-2">
                  {friends.filter(f => f.status === 'Online').slice(0, 5).map((friend, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="text-lg">{friend.avatar}</span>
                      <span className="text-sm">{friend.name}</span>
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Top 8 Friends */}
            <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <h3 className="font-bold mb-3" style={{ color: themes[currentTheme].accent }}>
                ⭐ Top 8 Friends
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {friends.filter(f => f.isTop8).slice(0, 8).map((friend, index) => (
                  <div key={index} className="text-center p-2 bg-black/20 rounded">
                    <div className="text-2xl mb-1">{friend.avatar}</div>
                    <div className="text-xs">{friend.name}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mood Ring Widget */}
            {widgets.moodRing && (
              <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <h3 className="font-bold mb-3" style={{ color: themes[currentTheme].accent }}>
                  💫 Mood Ring
                </h3>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 animate-pulse"></div>
                  <p className="text-sm">Mysteriously Spooky</p>
                  <p className="text-xs opacity-60">Your digital aura is glowing!</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MySpaceEnhanced