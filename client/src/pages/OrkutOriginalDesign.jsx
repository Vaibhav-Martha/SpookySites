import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const OrkutOriginalDesign = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  
  const [scraps, setScraps] = useState([
    {
      from: 'Sarah M.',
      message: 'Hey! How are you doing? Long time no see! We should catch up soon. Miss our college days! 😊',
      date: '12/02/2024 - 14:30',
      id: 1
    },
    {
      from: 'Mike R.',
      message: 'Thanks for the birthday wishes! The party was amazing. You should have been there!',
      date: '12/01/2024 - 09:15',
      id: 2
    },
    {
      from: 'Jessica L.',
      message: 'Love your new profile picture! You look great! 💕',
      date: '11/30/2024 - 18:45',
      id: 3
    }
  ])

  const [newScrap, setNewScrap] = useState('')
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

  const addScrap = () => {
    if (newScrap.trim()) {
      const scrap = {
        from: user?.username || 'You',
        message: newScrap,
        date: new Date().toLocaleString(),
        id: Date.now()
      }
      setScraps([scrap, ...scraps])
      setNewScrap('')
    }
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
                      <p className="text-xs text-gray-500">member since 2004</p>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-600 space-y-1">
                    <div className="flex justify-between">
                      <span>profile views:</span>
                      <span className="font-semibold">{Math.floor(Math.random() * 10000) + 1000}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>friends:</span>
                      <span className="font-semibold">{Math.floor(Math.random() * 500) + 50}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>karma:</span>
                      <span className="font-semibold text-green-600">{Math.floor(Math.random() * 100) + 50}</span>
                    </div>
                  </div>

                  <div className="mt-4 space-y-1">
                    <button className="w-full bg-pink-500 text-white text-xs py-1 rounded hover:bg-pink-600">
                      add as friend
                    </button>
                    <button className="w-full bg-purple-500 text-white text-xs py-1 rounded hover:bg-purple-600">
                      send message
                    </button>
                    <button className="w-full bg-blue-500 text-white text-xs py-1 rounded hover:bg-blue-600">
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
                  <div className="px-4 py-2 bg-pink-100 border-r border-gray-300 text-sm font-semibold text-pink-700">
                    scraps ({scraps.length})
                  </div>
                  <div className="px-4 py-2 border-r border-gray-300 text-sm text-gray-600 hover:bg-gray-50 cursor-pointer">
                    photos (12)
                  </div>
                  <div className="px-4 py-2 border-r border-gray-300 text-sm text-gray-600 hover:bg-gray-50 cursor-pointer">
                    testimonials ({testimonials.length})
                  </div>
                  <div className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 cursor-pointer">
                    videos (3)
                  </div>
                </div>
              </div>

              {/* Scraps Content */}
              <div className="bg-white border-l border-r border-b border-gray-300 rounded-b p-4">
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
                  {scraps.map((scrap) => (
                    <div key={scrap.id} className="border border-gray-200 rounded p-4 bg-gray-50">
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-semibold text-sm text-pink-600">{scrap.from}</div>
                        <div className="text-xs text-gray-500">{scrap.date}</div>
                      </div>
                      <div className="text-sm text-gray-700 leading-relaxed">
                        {scrap.message}
                      </div>
                      <div className="mt-3 flex space-x-4 text-xs">
                        <button className="text-pink-600 hover:underline">reply</button>
                        <button className="text-gray-500 hover:underline">delete</button>
                        <button className="text-gray-500 hover:underline">report spam</button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <button className="text-pink-600 text-sm hover:underline">
                    view all scraps ({scraps.length + 15})
                  </button>
                </div>
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
                    {['Emma', 'Jake', 'Sofia', 'Alex', 'Maya', 'Ryan', 'Zoe', 'Noah', 'Lily'].map((name, i) => (
                      <div key={i} className="text-center">
                        <div className="w-12 h-12 bg-gray-200 border border-gray-300 rounded mx-auto mb-1 flex items-center justify-center text-sm">
                          {['👩', '👨', '👧', '👦', '👩‍🦰', '👨‍🦱', '👩‍🦳', '👨‍🦲', '👩‍🦱'][i]}
                        </div>
                        <div className="text-xs text-pink-600 hover:underline cursor-pointer">
                          {name}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-center mt-3">
                    <a href="#" className="text-pink-600 text-xs hover:underline">view all friends</a>
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
                      <a href="#" className="text-pink-600 hover:underline">college students</a>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-blue-200 rounded"></div>
                      <a href="#" className="text-pink-600 hover:underline">music lovers</a>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-green-200 rounded"></div>
                      <a href="#" className="text-pink-600 hover:underline">photography</a>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-yellow-200 rounded"></div>
                      <a href="#" className="text-pink-600 hover:underline">travel</a>
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