import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { useAuth } from '../context/AuthContext'

const OrkutEnhanced = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const logoRef = useRef(null)
  const containerRef = useRef(null)
  const scrapsRef = useRef(null)

  const [scraps, setScraps] = useState([
    {
      user: "ZombieUser2004",
      message: "miss the old days when we could customize everything... now I'm just a digital ghost 👻",
      time: "13 years ago",
      avatar: "🧟‍♂️",
      likes: 13
    },
    {
      user: "DeadProfile", 
      message: "anyone else still checking their scraps from beyond? the nostalgia is killing me... again 💀",
      time: "10 years ago",
      avatar: "💀",
      likes: 25
    },
    {
      user: "GhostOfSocialMedia",
      message: "remember when we had testimonials? those were the days... *haunting sigh*",
      time: "8 years ago",
      avatar: "👻",
      likes: 42
    }
  ])

  const [newScrap, setNewScrap] = useState('')
  const [communities, setCommunities] = useState([
    { name: "Digital Ghosts United", members: 666, icon: "👻", joined: true },
    { name: "Retro Web Nostalgia", members: 1337, icon: "🌐", joined: false },
    { name: "HTML Wizards", members: 404, icon: "🧙‍♂️", joined: true },
    { name: "MySpace Refugees", members: 2003, icon: "💔", joined: false },
    { name: "GeoCities Survivors", members: 1999, icon: "🏠", joined: true }
  ])

  const [testimonials, setTestimonials] = useState([
    {
      from: "VampireQueen",
      message: "An eternal friend with impeccable taste in digital aesthetics. Their profile is a work of art! 🧛‍♀️",
      rating: 5,
      relationship: "Friend"
    },
    {
      from: "SkeletonDJ",
      message: "Great music taste and always shares the best retro memes. A true digital archaeologist! 💀",
      rating: 5,
      relationship: "Friend"
    }
  ])

  const [newTestimonial, setNewTestimonial] = useState('')
  const [activeTab, setActiveTab] = useState('scraps')

  useEffect(() => {
    // Animate page entrance
    gsap.fromTo(containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 2 }
    )

    // Floating ghost logo animation
    gsap.to(logoRef.current, {
      y: -20,
      duration: 3,
      yoyo: true,
      repeat: -1,
      ease: "power2.inOut"
    })

    // Animate scraps
    gsap.fromTo(scrapsRef.current?.children,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1, stagger: 0.2, delay: 1 }
    )
  }, [])

  const addScrap = () => {
    if (newScrap.trim()) {
      const scrap = {
        user: user?.username || 'Anonymous Ghost',
        message: newScrap,
        time: 'Just now',
        avatar: user?.profile?.avatar || '👤',
        likes: 0
      }
      setScraps([scrap, ...scraps])
      setNewScrap('')
    }
  }

  const likeScrap = (index) => {
    setScraps(prev => prev.map((scrap, i) => 
      i === index ? { ...scrap, likes: scrap.likes + 1 } : scrap
    ))
  }

  const joinCommunity = (index) => {
    setCommunities(prev => prev.map((community, i) => 
      i === index ? { 
        ...community, 
        joined: !community.joined,
        members: community.joined ? community.members - 1 : community.members + 1
      } : community
    ))
  }

  const addTestimonial = () => {
    if (newTestimonial.trim()) {
      const testimonial = {
        from: user?.username || 'Anonymous',
        message: newTestimonial,
        rating: 5,
        relationship: "Friend"
      }
      setTestimonials([testimonial, ...testimonials])
      setNewTestimonial('')
    }
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-black">
      {/* Header */}
      <div className="bg-neon-purple p-4 border-b-4 border-purple-600 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div 
              ref={logoRef}
              className="text-4xl font-bold text-white opacity-70 animate-float"
            >
              👻 orkut
            </div>
            <span className="text-purple-200 text-sm">(Zombie Edition)</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-purple-200">Welcome, {user?.username}!</span>
            <button 
              onClick={() => navigate('/graveyard')}
              className="bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded transition-colors"
            >
              Back to Graveyard
            </button>
            <button
              onClick={logout}
              className="bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
            >
              👻 Logout
            </button>
          </div>
        </div>
        
        {/* Gothic ornaments */}
        <div className="absolute top-0 left-0 text-purple-300 opacity-30 text-6xl">⚜️</div>
        <div className="absolute top-0 right-0 text-purple-300 opacity-30 text-6xl">⚜️</div>
      </div>

      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <div className="bg-purple-800/50 rounded-lg p-6 border-2 border-purple-600 shadow-lg mb-6">
              <div className="text-center mb-6">
                <div className="w-32 h-32 bg-purple-700 rounded-full mx-auto mb-4 flex items-center justify-center text-6xl">
                  {user?.profile?.avatar || '💀'}
                </div>
                <h2 className="text-2xl font-bold text-neon-purple">{user?.username}</h2>
                <p className="text-purple-300">{user?.profile?.status || 'Eternally Online'}</p>
              </div>
              
              <div className="space-y-4">
                <div className="bg-purple-900/50 p-3 rounded">
                  <h3 className="text-purple-200 font-semibold mb-2">Profile Info</h3>
                  <p className="text-sm text-purple-300">Age: Timeless</p>
                  <p className="text-sm text-purple-300">Location: Digital Afterlife</p>
                  <p className="text-sm text-purple-300">Relationship: It's Complicated (with death)</p>
                  <p className="text-sm text-purple-300">Karma Points: {Math.floor(Math.random() * 1000) + 500}</p>
                </div>
                
                <div className="bg-purple-900/50 p-3 rounded">
                  <h3 className="text-purple-200 font-semibold mb-2">Stats</h3>
                  <div className="text-xs text-purple-400">
                    <div className="flex justify-between">
                      <span>Profile Views:</span>
                      <span>{Math.floor(Math.random() * 10000) + 1000}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Friends:</span>
                      <span>{Math.floor(Math.random() * 500) + 100}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Scraps:</span>
                      <span>{scraps.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Communities */}
            <div className="bg-purple-800/50 rounded-lg p-4 border-2 border-purple-600 shadow-lg">
              <h3 className="text-neon-purple font-bold mb-4">🏘️ Communities</h3>
              <div className="space-y-2">
                {communities.map((community, index) => (
                  <div key={index} className="bg-purple-900/50 p-3 rounded flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{community.icon}</span>
                      <div>
                        <div className="text-sm font-semibold text-purple-200">{community.name}</div>
                        <div className="text-xs text-purple-400">{community.members} members</div>
                      </div>
                    </div>
                    <button
                      onClick={() => joinCommunity(index)}
                      className={`px-2 py-1 text-xs rounded ${
                        community.joined 
                          ? 'bg-red-600 hover:bg-red-700 text-white' 
                          : 'bg-green-600 hover:bg-green-700 text-white'
                      }`}
                    >
                      {community.joined ? 'Leave' : 'Join'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tab Navigation */}
            <div className="bg-purple-800/50 rounded-t-lg border-2 border-b-0 border-purple-600">
              <div className="flex">
                {['scraps', 'testimonials', 'photos'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 font-semibold capitalize ${
                      activeTab === tab
                        ? 'bg-purple-600 text-white'
                        : 'text-purple-300 hover:bg-purple-700/50'
                    }`}
                  >
                    {tab === 'scraps' && '📜'} 
                    {tab === 'testimonials' && '💌'} 
                    {tab === 'photos' && '📸'} 
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-purple-800/50 rounded-b-lg p-6 border-2 border-t-0 border-purple-600 shadow-lg">
              {/* Scraps Tab */}
              {activeTab === 'scraps' && (
                <div>
                  <h2 className="text-2xl font-bold text-neon-purple mb-6 flex items-center">
                    📜 Scraps from the Beyond
                  </h2>
                  
                  {/* Write new scrap */}
                  <div className="mb-6 p-4 bg-purple-900/30 rounded-lg border border-purple-600">
                    <h3 className="text-purple-200 mb-3">Leave a Scrap (if you dare...)</h3>
                    <textarea 
                      value={newScrap}
                      onChange={(e) => setNewScrap(e.target.value)}
                      className="w-full bg-purple-800 text-purple-200 p-3 rounded border border-purple-600 focus:border-neon-purple outline-none resize-none"
                      rows="3"
                      placeholder="Write your message to the digital afterlife..."
                    />
                    <button 
                      onClick={addScrap}
                      className="mt-2 bg-neon-purple hover:bg-purple-600 text-white px-4 py-2 rounded transition-colors"
                    >
                      Send to the Void
                    </button>
                  </div>
                  
                  <div ref={scrapsRef} className="space-y-4">
                    {scraps.map((scrap, index) => (
                      <div 
                        key={index}
                        className="bg-purple-900/70 p-4 rounded-lg border border-purple-500 hover:border-neon-purple transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl">{scrap.avatar}</span>
                            <span className="font-semibold text-neon-purple">{scrap.user}</span>
                          </div>
                          <span className="text-xs text-purple-400">{scrap.time}</span>
                        </div>
                        <p className="text-purple-200 text-sm mb-3">{scrap.message}</p>
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => likeScrap(index)}
                            className="flex items-center space-x-1 text-purple-300 hover:text-neon-purple transition-colors"
                          >
                            <span>👍</span>
                            <span className="text-xs">{scrap.likes}</span>
                          </button>
                          <button className="text-purple-300 hover:text-neon-purple transition-colors text-xs">
                            Reply
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Testimonials Tab */}
              {activeTab === 'testimonials' && (
                <div>
                  <h2 className="text-2xl font-bold text-neon-purple mb-6">💌 Testimonials</h2>
                  
                  {/* Write testimonial */}
                  <div className="mb-6 p-4 bg-purple-900/30 rounded-lg border border-purple-600">
                    <h3 className="text-purple-200 mb-3">Write a Testimonial</h3>
                    <textarea 
                      value={newTestimonial}
                      onChange={(e) => setNewTestimonial(e.target.value)}
                      className="w-full bg-purple-800 text-purple-200 p-3 rounded border border-purple-600 focus:border-neon-purple outline-none resize-none"
                      rows="3"
                      placeholder="Share your thoughts about this user..."
                    />
                    <button 
                      onClick={addTestimonial}
                      className="mt-2 bg-neon-purple hover:bg-purple-600 text-white px-4 py-2 rounded transition-colors"
                    >
                      Submit Testimonial
                    </button>
                  </div>

                  <div className="space-y-4">
                    {testimonials.map((testimonial, index) => (
                      <div key={index} className="bg-purple-900/70 p-4 rounded-lg border border-purple-500">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-neon-purple">{testimonial.from}</span>
                          <div className="flex items-center space-x-1">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <span key={i} className="text-yellow-400">⭐</span>
                            ))}
                          </div>
                        </div>
                        <p className="text-purple-200 text-sm mb-2">{testimonial.message}</p>
                        <span className="text-xs text-purple-400">Relationship: {testimonial.relationship}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Photos Tab */}
              {activeTab === 'photos' && (
                <div>
                  <h2 className="text-2xl font-bold text-neon-purple mb-6">📸 Photo Albums</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className="bg-purple-900/50 p-4 rounded-lg border border-purple-600 text-center">
                        <div className="w-full h-24 bg-purple-700 rounded mb-2 flex items-center justify-center text-3xl">
                          {['📸', '🖼️', '🎨', '🌙', '👻', '💀', '🦇', '🕷️', '🔮'][i]}
                        </div>
                        <p className="text-xs text-purple-300">Album {i + 1}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="text-center mt-8 text-purple-400 text-sm">
          <p>👻 In memory of all the scraps, testimonials, and friendships lost in the digital graveyard 👻</p>
        </div>
      </div>
    </div>
  )
}

export default OrkutEnhanced