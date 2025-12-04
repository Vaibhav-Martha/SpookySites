import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { api } from '../services/api'

const OrkutOriginalDesign = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  
  const [scraps, setScraps] = useState([])
  const [newScrap, setNewScrap] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [searching, setSearching] = useState(false)
  const [profileStats, setProfileStats] = useState({
    views: 0,
    friends: 0,
    karma: 0
  })
  const [photos, setPhotos] = useState([])
  const [uploadingPhoto, setUploadingPhoto] = useState(false)
  const [friends, setFriends] = useState([])
  const [editingAge, setEditingAge] = useState(false)
  const [userAge, setUserAge] = useState(25)
  const [activeTab, setActiveTab] = useState('scraps')
  const [testimonials] = useState([
    {
      from: 'Amanda K.',
      message: 'One of the most genuine and kind people I know. Always there when you need a friend. Highly recommended!',
      rating: 'trustworthy, cool, sexy'
    },
    {
      from: 'David S.',
      message: 'Great friend and always fun to hang out with. Has an amazing sense of humor and is very reliable.',
      rating: 'trustworthy, cool, fun'
    }
  ])

  // Load scraps and profile data when component mounts
  useEffect(() => {
    loadScraps()
    loadProfileStats()
    loadPhotos()
    loadFriends()
  }, [])

  const loadScraps = async () => {
    try {
      setLoading(true)
      const posts = await api.getPosts('orkut')
      const scrapPosts = posts.filter(post => post.type === 'scrap')
      setScraps(scrapPosts)
    } catch (err) {
      setError('Failed to load scraps')
      console.error('Error loading scraps:', err)
    } finally {
      setLoading(false)
    }
  }

  const addScrap = async () => {
    if (newScrap.trim()) {
      try {
        const scrapData = {
          type: 'scrap',
          content: newScrap,
          recipient: user._id // Posting to own profile for now
        }
        
        const newScrapPost = await api.createPost('orkut', scrapData)
        setScraps(prev => [newScrapPost, ...prev])
        setNewScrap('')
      } catch (err) {
        setError('Failed to post scrap')
        console.error('Error posting scrap:', err)
      }
    }
  }

  const handleDeleteScrap = async (scrapId) => {
    try {
      await api.deletePost(scrapId)
      setScraps(prev => prev.filter(scrap => scrap._id !== scrapId))
    } catch (err) {
      setError('Failed to delete scrap')
      console.error('Error deleting scrap:', err)
    }
  }

  const handleReplyToScrap = async (scrapId) => {
    const reply = prompt('Write your reply:')
    if (reply && reply.trim()) {
      try {
        await api.replyToPost(scrapId, reply.trim())
        loadScraps() // Reload to show the reply
      } catch (err) {
        setError('Failed to post reply')
        console.error('Error posting reply:', err)
      }
    }
  }

  const handleReportSpam = (scrapId) => {
    alert('Scrap reported as spam. The digital spirits will investigate! 👻')
  }

  const loadProfileStats = async () => {
    try {
      const profile = await api.getProfile()
      setProfileStats({
        views: profile.stats?.views || Math.floor(Math.random() * 500) + 100,
        friends: profile.stats?.friends || Math.floor(Math.random() * 50) + 10,
        karma: profile.stats?.karma || Math.floor(Math.random() * 100) + 20
      })
    } catch (err) {
      console.error('Error loading profile stats:', err)
    }
  }

  const loadPhotos = async () => {
    try {
      const userPhotos = await api.getPhotos()
      setPhotos(userPhotos)
    } catch (err) {
      console.error('Error loading photos:', err)
    }
  }

  const handlePhotoUpload = async (event) => {
    const file = event.target.files[0]
    if (file) {
      try {
        setUploadingPhoto(true)
        const uploadedPhoto = await api.uploadPhoto(file, 'Orkut profile photo')
        setPhotos(prev => [uploadedPhoto, ...prev])
        alert('📸 Photo uploaded successfully!')
      } catch (err) {
        setError('Failed to upload photo')
        console.error('Error uploading photo:', err)
      } finally {
        setUploadingPhoto(false)
      }
    }
  }

  const loadFriends = async () => {
    try {
      // For now, use demo friends. In a real app, this would load from API
      const demoFriends = [
        { id: 1, username: 'Emma', avatar: '👩' },
        { id: 2, username: 'Jake', avatar: '👨' },
        { id: 3, username: 'Sofia', avatar: '👧' },
        { id: 4, username: 'Alex', avatar: '👦' },
        { id: 5, username: 'Maya', avatar: '👩‍🦰' },
        { id: 6, username: 'Ryan', avatar: '👨‍🦱' },
        { id: 7, username: 'Zoe', avatar: '👩‍🦳' },
        { id: 8, username: 'Noah', avatar: '👨‍🦲' },
        { id: 9, username: 'Lily', avatar: '👩‍🦱' }
      ]
      setFriends(demoFriends)
    } catch (err) {
      console.error('Error loading friends:', err)
    }
  }

  const handleAddFriend = async (userId) => {
    try {
      // In a real app, this would make an API call to send friend request
      alert('👥 Friend request sent! They will be notified in the digital afterlife.')
    } catch (err) {
      console.error('Error sending friend request:', err)
    }
  }

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      try {
        setSearching(true)
        const results = await api.searchUsers(searchQuery.trim())
        setSearchResults(results)
      } catch (err) {
        setError('Failed to search users')
        console.error('Error searching users:', err)
      } finally {
        setSearching(false)
      }
    }
  }



  const handleSendMessage = () => {
    alert('💌 Message sent to their Orkut inbox! Check back for ghostly replies.')
  }

  const handleWriteTestimonial = () => {
    const testimonial = prompt('Write a testimonial for this user:')
    if (testimonial) {
      alert('📝 Testimonial submitted! It will appear after review by the digital spirits.')
    }
  }





  const handleViewAllScraps = () => {
    alert('📜 Loading all scraps from the digital archives... This feature shows your complete scrap history!')
  }

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}>
      {/* Authentic Orkut Header */}
      <div className="bg-gradient-to-r from-pink-400 to-purple-500 text-white">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="text-2xl font-bold">orkut</div>
              <nav className="flex space-x-4 text-sm">
                <a href="#" className="hover:underline">home</a>
                <a href="#" className="hover:underline">profile</a>
                <a href="#" className="hover:underline">scraps</a>
                <a href="#" className="hover:underline">friends</a>
                <a href="#" className="hover:underline">communities</a>
                <a href="#" className="hover:underline">search</a>
              </nav>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="search people..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="px-2 py-1 text-xs text-gray-800 rounded border"
                />
                <button 
                  onClick={handleSearch}
                  disabled={searching}
                  className="px-2 py-1 bg-white text-purple-600 rounded text-xs hover:bg-gray-100"
                >
                  {searching ? '...' : 'search'}
                </button>
              </div>
              <span>hi, {user?.username}!</span>
              <button onClick={() => navigate('/graveyard')} className="hover:underline">graveyard</button>
              <button onClick={logout} className="hover:underline">logout</button>
            </div>
          </div>
        </div>
      </div>

      {/* Sub Navigation */}
      <div className="bg-purple-600 text-white text-xs">
        <div className="px-4 py-2">
          <div className="flex space-x-4">
            <a href="#" className="hover:underline">my profile</a>
            <a href="#" className="hover:underline">edit profile</a>
            <a href="#" className="hover:underline">account settings</a>
            <a href="#" className="hover:underline">privacy</a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-4">
            {/* Left Sidebar */}
            <div className="w-64 flex-shrink-0">
              {/* Profile Card */}
              <div className="bg-white border border-gray-300 rounded mb-4">
                <div className="bg-gradient-to-r from-pink-400 to-purple-500 text-white p-3 rounded-t">
                  <h3 className="font-bold">{user?.username}</h3>
                </div>
                <div className="p-4">
                  <div className="text-center mb-4">
                    <div className="w-24 h-24 bg-gray-200 border-2 border-gray-300 rounded mx-auto mb-2 flex items-center justify-center text-3xl">
                      {user?.profile?.avatar || '👤'}
                    </div>
                    <div className="text-sm text-gray-700">
                      <p className="font-semibold">{user?.username}</p>
                      <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                        {editingAge ? (
                          <>
                            <input
                              type="number"
                              value={userAge}
                              onChange={(e) => setUserAge(e.target.value)}
                              className="w-12 px-1 py-0.5 border rounded text-center"
                              min="13"
                              max="100"
                            />
                            <button
                              onClick={() => setEditingAge(false)}
                              className="text-green-600 hover:underline"
                            >
                              ✓
                            </button>
                          </>
                        ) : (
                          <>
                            <span>{userAge} years old</span>
                            <button
                              onClick={() => setEditingAge(true)}
                              className="text-pink-600 hover:underline"
                            >
                              ✏️
                            </button>
                          </>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">member since 2004</p>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-600 space-y-1">
                    <div className="flex justify-between">
                      <span>profile views:</span>
                      <span className="font-semibold">{profileStats.views}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>friends:</span>
                      <span className="font-semibold">{profileStats.friends}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>karma:</span>
                      <span className="font-semibold text-green-600">{profileStats.karma}</span>
                    </div>
                  </div>

                  <div className="mt-4 space-y-1">
                    <button 
                      onClick={handleAddFriend}
                      className="w-full bg-pink-500 text-white text-xs py-1 rounded hover:bg-pink-600 transition-colors"
                    >
                      add as friend
                    </button>
                    <button 
                      onClick={handleSendMessage}
                      className="w-full bg-purple-500 text-white text-xs py-1 rounded hover:bg-purple-600 transition-colors"
                    >
                      send message
                    </button>
                    <button 
                      onClick={handleWriteTestimonial}
                      className="w-full bg-blue-500 text-white text-xs py-1 rounded hover:bg-blue-600 transition-colors"
                    >
                      write testimonial
                    </button>
                  </div>
                </div>
              </div>

              {/* Personal Info */}
              <div className="bg-white border border-gray-300 rounded mb-4">
                <div className="bg-gray-100 border-b border-gray-300 p-2">
                  <h4 className="font-semibold text-sm text-gray-700">personal</h4>
                </div>
                <div className="p-3 text-xs text-gray-600">
                  <div className="space-y-1">
                    <div><strong>relationship:</strong> single</div>
                    <div><strong>age:</strong> {Math.floor(Math.random() * 20) + 20}</div>
                    <div><strong>location:</strong> san francisco, ca</div>
                    <div><strong>hometown:</strong> new york, ny</div>
                    <div><strong>occupation:</strong> student</div>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div className="bg-white border border-gray-300 rounded">
                <div className="bg-gray-100 border-b border-gray-300 p-2">
                  <h4 className="font-semibold text-sm text-gray-700">social</h4>
                </div>
                <div className="p-3 text-xs text-gray-600">
                  <div className="space-y-1">
                    <div><strong>smoking:</strong> no</div>
                    <div><strong>drinking:</strong> socially</div>
                    <div><strong>children:</strong> someday</div>
                    <div><strong>ethnicity:</strong> not specified</div>
                    <div><strong>religion:</strong> not specified</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1">
              {/* Tab Navigation */}
              <div className="bg-white border border-gray-300 rounded-t">
                <div className="flex border-b border-gray-300">
                  <div 
                    onClick={() => setActiveTab('scraps')}
                    className={`px-4 py-2 border-r border-gray-300 text-sm cursor-pointer transition-colors ${
                      activeTab === 'scraps' 
                        ? 'bg-pink-100 font-semibold text-pink-700' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    scraps ({scraps.length})
                  </div>
                  <div 
                    onClick={() => setActiveTab('photos')}
                    className={`px-4 py-2 border-r border-gray-300 text-sm cursor-pointer transition-colors ${
                      activeTab === 'photos' 
                        ? 'bg-pink-100 font-semibold text-pink-700' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    photos (12)
                  </div>
                  <div 
                    onClick={() => setActiveTab('testimonials')}
                    className={`px-4 py-2 border-r border-gray-300 text-sm cursor-pointer transition-colors ${
                      activeTab === 'testimonials' 
                        ? 'bg-pink-100 font-semibold text-pink-700' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    testimonials ({testimonials.length})
                  </div>
                  <div 
                    onClick={() => setActiveTab('videos')}
                    className={`px-4 py-2 border-r border-gray-300 text-sm cursor-pointer transition-colors ${
                      activeTab === 'videos' 
                        ? 'bg-pink-100 font-semibold text-pink-700' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    videos (3)
                  </div>
                  <div 
                    onClick={() => setActiveTab('search')}
                    className={`px-4 py-2 text-sm cursor-pointer transition-colors ${
                      activeTab === 'search' 
                        ? 'bg-pink-100 font-semibold text-pink-700' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    search results ({searchResults.length})
                  </div>
                </div>
              </div>

              {/* Tab Content */}
              <div className="bg-white border-l border-r border-b border-gray-300 rounded-b p-4">
                {activeTab === 'scraps' && (
                <div>
                {/* Write Scrap */}
                <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded">
                  <h4 className="font-semibold text-sm text-gray-700 mb-3">write scrap</h4>
                  <textarea
                    value={newScrap}
                    onChange={(e) => setNewScrap(e.target.value)}
                    className="w-full border border-gray-300 rounded p-2 text-sm resize-none text-gray-800 bg-white"
                    rows="3"
                    placeholder="write your scrap here..."
                  />
                  <div className="mt-2 flex justify-end">
                    <button
                      onClick={addScrap}
                      className="bg-pink-500 text-white px-4 py-1 text-sm rounded hover:bg-pink-600"
                    >
                      send scrap
                    </button>
                  </div>
                </div>

                {/* Scraps List */}
                <div className="space-y-4">
                  {loading ? (
                    <div className="text-center py-8 text-gray-500">Loading scraps...</div>
                  ) : error ? (
                    <div className="text-center py-8 text-red-500">{error}</div>
                  ) : scraps.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">No scraps yet. Be the first to write one!</div>
                  ) : (
                    scraps.map((scrap) => (
                      <div key={scrap._id} className="border border-gray-200 rounded p-4 bg-gray-50">
                        <div className="flex justify-between items-start mb-2">
                          <div className="font-semibold text-sm text-pink-600">
                            {scrap.author?.username || 'Anonymous'}
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(scrap.createdAt).toLocaleString()}
                          </div>
                        </div>
                        <div className="text-sm text-gray-700 leading-relaxed">
                          {scrap.content}
                        </div>
                        <div className="mt-3 flex space-x-4 text-xs">
                          <button 
                            onClick={() => handleReplyToScrap(scrap._id)}
                            className="text-pink-600 hover:underline transition-colors"
                          >
                            reply
                          </button>
                          <button 
                            onClick={() => handleDeleteScrap(scrap._id)}
                            className="text-gray-500 hover:underline transition-colors"
                          >
                            delete
                          </button>
                          <button 
                            onClick={() => handleReportSpam(scrap._id)}
                            className="text-gray-500 hover:underline transition-colors"
                          >
                            report spam
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="mt-6 text-center">
                  <button 
                    onClick={handleViewAllScraps}
                    className="text-pink-600 text-sm hover:underline transition-colors"
                  >
                    view all scraps ({scraps.length + 15})
                  </button>
                </div>
                </div>
                )}

                {activeTab === 'photos' && (
                  <div className="py-4">
                    {/* Photo Upload */}
                    <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded">
                      <h4 className="font-semibold text-sm text-gray-700 mb-3">upload new photo</h4>
                      <div className="flex items-center space-x-3">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          disabled={uploadingPhoto}
                          className="text-sm"
                        />
                        {uploadingPhoto && (
                          <span className="text-xs text-gray-500">Uploading...</span>
                        )}
                      </div>
                    </div>

                    {/* Photos Grid */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {photos.length > 0 ? (
                        photos.map((photo, i) => (
                          <div key={photo._id || i} className="aspect-square bg-gray-200 rounded border-2 border-gray-300 overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
                            <img 
                              src={photo.url || `/uploads/${photo.filename}`} 
                              alt={photo.caption || 'Photo'}
                              className="w-full h-full object-cover"
                              onClick={() => window.open(photo.url || `/uploads/${photo.filename}`, '_blank')}
                              onError={(e) => {
                                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMiAxNkM5Ljc5IDEzLjc5IDkuNzkgMTAuMjEgMTIgOEMxNC4yMSAxMC4yMSAxNC4yMSAxMy43OSAxMiAxNloiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+'
                              }}
                            />
                          </div>
                        ))
                      ) : (
                        [...Array(6)].map((_, i) => (
                          <div key={i} className="aspect-square bg-gray-200 rounded border-2 border-gray-300 flex items-center justify-center">
                            <span className="text-2xl">📸</span>
                          </div>
                        ))
                      )}
                    </div>
                    <p className="text-gray-600 text-sm text-center">
                      {photos.length > 0 ? `${photos.length} photos uploaded` : 'No photos yet. Upload your first photo!'}
                    </p>
                  </div>
                )}

                {activeTab === 'testimonials' && (
                  <div className="space-y-4">
                    {testimonials.map((testimonial, index) => (
                      <div key={index} className="border border-gray-200 rounded p-4 bg-gray-50">
                        <div className="font-semibold text-pink-600 mb-2">{testimonial.from}</div>
                        <div className="text-gray-700 text-sm leading-relaxed mb-2">
                          {testimonial.message}
                        </div>
                        <div className="text-xs text-gray-500">
                          <strong>Rating:</strong> {testimonial.rating}
                        </div>
                      </div>
                    ))}
                    <div className="text-center mt-6">
                      <button 
                        onClick={handleWriteTestimonial}
                        className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition-colors"
                      >
                        Write a Testimonial
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'videos' && (
                  <div className="text-center py-8">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="aspect-video bg-gray-200 rounded border-2 border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors">
                          <div className="text-center">
                            <div className="text-3xl mb-2">🎥</div>
                            <div className="text-sm text-gray-600">Video {i + 1}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-gray-600 text-sm">Click any video to play</p>
                  </div>
                )}

                {activeTab === 'search' && (
                  <div className="py-4">
                    {searchResults.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        {searchQuery ? 'No users found. Try a different search term.' : 'Use the search bar above to find other users!'}
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <h4 className="font-semibold text-sm text-gray-700 mb-3">
                          Search results for "{searchQuery}" ({searchResults.length} found)
                        </h4>
                        {searchResults.map((user) => (
                          <div key={user._id} className="border border-gray-200 rounded p-4 bg-gray-50 flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gray-200 border border-gray-300 rounded flex items-center justify-center">
                              {user.profile?.avatar ? (
                                <img src={user.profile.avatar} alt={user.username} className="w-full h-full rounded object-cover" />
                              ) : (
                                <span className="text-lg">👤</span>
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold text-sm text-pink-600">{user.username}</div>
                              <div className="text-xs text-gray-500">
                                {user.profile?.location || 'Location not specified'}
                              </div>
                              <div className="text-xs text-gray-600 mt-1">
                                {user.profile?.bio || 'No bio available'}
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => {
                                  alert(`👋 Opening ${user.username}'s profile...`)
                                  // In a real app, this would navigate to their profile
                                  // navigate(`/orkut/profile/${user._id}`)
                                }}
                                className="px-3 py-1 bg-pink-500 text-white text-xs rounded hover:bg-pink-600"
                              >
                                visit profile
                              </button>
                              <button 
                                onClick={() => handleAddFriend(user._id)}
                                className="px-3 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600"
                              >
                                add friend
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="w-64 flex-shrink-0">
              {/* Friends */}
              <div className="bg-white border border-gray-300 rounded mb-4">
                <div className="bg-gray-100 border-b border-gray-300 p-2">
                  <h4 className="font-semibold text-sm text-gray-700">friends</h4>
                </div>
                <div className="p-3">
                  <div className="grid grid-cols-3 gap-2">
                    {friends.slice(0, 9).map((friend) => (
                      <div key={friend.id} className="text-center">
                        <div className="w-12 h-12 bg-gray-200 border border-gray-300 rounded mx-auto mb-1 flex items-center justify-center text-sm">
                          {friend.avatar}
                        </div>
                        <div 
                          onClick={() => alert(`👋 Visiting ${friend.username}'s profile! Loading their digital memories...`)}
                          className="text-xs text-pink-600 hover:underline cursor-pointer transition-colors"
                        >
                          {friend.username}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-center mt-3">
                    <button 
                      onClick={() => alert(`👥 You have ${friends.length} friends in the digital afterlife!`)}
                      className="text-pink-600 text-xs hover:underline"
                    >
                      view all friends ({friends.length})
                    </button>
                  </div>
                </div>
              </div>

              {/* Communities */}
              <div className="bg-white border border-gray-300 rounded mb-4">
                <div className="bg-gray-100 border-b border-gray-300 p-2">
                  <h4 className="font-semibold text-sm text-gray-700">communities</h4>
                </div>
                <div className="p-3 text-xs">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-pink-200 rounded"></div>
                      <button 
                        onClick={() => alert('🎓 Joining College Students community! Connect with fellow students in the digital realm.')}
                        className="text-pink-600 hover:underline transition-colors"
                      >
                        college students
                      </button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-blue-200 rounded"></div>
                      <button 
                        onClick={() => alert('🎵 Joining Music Lovers community! Share your favorite haunting melodies.')}
                        className="text-pink-600 hover:underline transition-colors"
                      >
                        music lovers
                      </button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-green-200 rounded"></div>
                      <button 
                        onClick={() => alert('📸 Joining Photography community! Capture the beauty of the digital afterlife.')}
                        className="text-pink-600 hover:underline transition-colors"
                      >
                        photography
                      </button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-yellow-200 rounded"></div>
                      <button 
                        onClick={() => alert('✈️ Joining Travel community! Explore virtual destinations across the web.')}
                        className="text-pink-600 hover:underline transition-colors"
                      >
                        travel
                      </button>
                    </div>
                  </div>
                  <div className="text-center mt-3">
                    <a href="#" className="text-pink-600 hover:underline">view all communities</a>
                  </div>
                </div>
              </div>

              {/* Testimonials Preview */}
              <div className="bg-white border border-gray-300 rounded">
                <div className="bg-gray-100 border-b border-gray-300 p-2">
                  <h4 className="font-semibold text-sm text-gray-700">testimonials</h4>
                </div>
                <div className="p-3 text-xs">
                  {testimonials.slice(0, 2).map((testimonial, index) => (
                    <div key={index} className="mb-3 pb-3 border-b border-gray-200 last:border-b-0">
                      <div className="font-semibold text-pink-600 mb-1">{testimonial.from}</div>
                      <div className="text-gray-600 text-xs leading-relaxed">
                        {testimonial.message.substring(0, 80)}...
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{testimonial.rating}</div>
                    </div>
                  ))}
                  <div className="text-center mt-3">
                    <a href="#" className="text-pink-600 hover:underline">view all testimonials</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-300 p-4">
        <div className="text-center text-xs text-gray-500">
          <div className="flex justify-center space-x-4 mb-2">
            <a href="#" className="hover:underline">about</a>
            <a href="#" className="hover:underline">blog</a>
            <a href="#" className="hover:underline">terms</a>
            <a href="#" className="hover:underline">privacy</a>
            <a href="#" className="hover:underline">safety</a>
            <a href="#" className="hover:underline">help</a>
          </div>
          <p>© 2024 Google Inc.</p>
        </div>
      </div>
    </div>
  )
}

export default OrkutOriginalDesign