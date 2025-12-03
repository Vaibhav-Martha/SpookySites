import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Orkut = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Authentic Orkut Header */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-2">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center space-x-6">
            <div className="text-white text-2xl font-bold">orkut</div>
            <nav className="flex space-x-4 text-white text-sm">
              <a href="#" className="hover:underline">home</a>
              <a href="#" className="hover:underline">profile</a>
              <a href="#" className="hover:underline">scrapbook</a>
              <a href="#" className="hover:underline">friends</a>
              <a href="#" className="hover:underline">communities</a>
            </nav>
          </div>
          <div className="flex items-center space-x-4 text-white text-sm">
            <button onClick={() => navigate('/graveyard')} className="hover:underline">graveyard</button>
            <button onClick={logout} className="hover:underline">logout</button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {/* Profile Card */}
            <div className="bg-white border border-gray-300 rounded">
              <div className="bg-gradient-to-r from-pink-100 to-purple-100 p-3 border-b">
                <h3 className="font-bold text-gray-800">john doe</h3>
              </div>
              <div className="p-4 text-center">
                <div className="w-24 h-24 bg-gray-200 rounded mx-auto mb-3 flex items-center justify-center">
                  <span className="text-gray-500 text-xs">no photo</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">single</p>
                <div className="text-xs text-gray-500 space-y-1">
                  <p>male, 25</p>
                  <p>san francisco, CA</p>
                  <p>member since: jan 2004</p>
                </div>
              </div>
            </div>

            {/* Friends */}
            <div className="bg-white border border-gray-300 rounded">
              <div className="bg-gradient-to-r from-blue-100 to-cyan-100 p-3 border-b">
                <h3 className="font-bold text-gray-800">friends (8)</h3>
              </div>
              <div className="p-3">
                <div className="grid grid-cols-4 gap-2">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="text-center">
                      <div className="w-12 h-12 bg-gray-200 rounded mb-1 flex items-center justify-center">
                        <span className="text-sm">👤</span>
                      </div>
                      <p className="text-xs text-gray-600">friend{i+1}</p>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-3">
                  <a href="#" className="text-blue-600 text-sm hover:underline">view all friends</a>
                </div>
              </div>
            </div>

            {/* Communities */}
            <div className="bg-white border border-gray-300 rounded">
              <div className="bg-gradient-to-r from-green-100 to-teal-100 p-3 border-b">
                <h3 className="font-bold text-gray-800">communities (12)</h3>
              </div>
              <div className="p-3 space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-200 rounded"></div>
                  <span className="text-sm text-blue-600 hover:underline cursor-pointer">I Love Orkut</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-200 rounded"></div>
                  <span className="text-sm text-blue-600 hover:underline cursor-pointer">Nostalgia</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-200 rounded"></div>
                  <span className="text-sm text-blue-600 hover:underline cursor-pointer">Early 2000s</span>
                </div>
                <div className="text-center mt-3">
                  <a href="#" className="text-blue-600 text-sm hover:underline">view all communities</a>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4">
            {/* Scrapbook */}
            <div className="bg-white border border-gray-300 rounded">
              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-3 border-b">
                <h3 className="font-bold text-gray-800">scrapbook</h3>
              </div>
              <div className="p-4">
                {/* Write Scrap */}
                <div className="mb-4 p-3 bg-gray-50 rounded border">
                  <textarea 
                    className="w-full p-2 border border-gray-300 rounded text-sm resize-none"
                    rows="3"
                    placeholder="write something..."
                  />
                  <div className="flex justify-between items-center mt-2">
                    <div className="text-xs text-gray-500">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-1" />
                        make this scrap public
                      </label>
                    </div>
                    <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-1 rounded text-sm">
                      post scrap
                    </button>
                  </div>
                </div>

                {/* Scraps List */}
                <div className="space-y-3">
                  <div className="border-b border-gray-200 pb-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                        <span className="text-xs">👤</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-semibold text-sm text-blue-600">friend1</span>
                          <span className="text-xs text-gray-500">wrote</span>
                          <span className="text-xs text-gray-500">2 hours ago</span>
                        </div>
                        <p className="text-sm text-gray-700">Hey! How are you doing? Miss the old orkut days!</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-b border-gray-200 pb-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                        <span className="text-xs">👤</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-semibold text-sm text-blue-600">friend2</span>
                          <span className="text-xs text-gray-500">wrote</span>
                          <span className="text-xs text-gray-500">1 day ago</span>
                        </div>
                        <p className="text-sm text-gray-700">Remember when we used to spend hours customizing our profiles? Good times!</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-b border-gray-200 pb-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                        <span className="text-xs">👤</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-semibold text-sm text-blue-600">friend3</span>
                          <span className="text-xs text-gray-500">wrote</span>
                          <span className="text-xs text-gray-500">3 days ago</span>
                        </div>
                        <p className="text-sm text-gray-700">Orkut was the best social network ever! Nothing compares to it.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-4">
                  <a href="#" className="text-blue-600 text-sm hover:underline">view all scraps</a>
                </div>
              </div>
            </div>

            {/* Testimonials */}
            <div className="bg-white border border-gray-300 rounded">
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-3 border-b">
                <h3 className="font-bold text-gray-800">testimonials (3)</h3>
              </div>
              <div className="p-4 space-y-3">
                <div className="border-b border-gray-200 pb-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                      <span className="text-xs">👤</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-semibold text-sm text-blue-600">bestfriend</span>
                        <span className="text-xs text-gray-500">wrote</span>
                      </div>
                      <p className="text-sm text-gray-700 italic">"{user?.username} is an amazing friend! Always there when you need them. One of the coolest people on Orkut!"</p>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <a href="#" className="text-blue-600 text-sm hover:underline">view all testimonials</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-100 border-t border-gray-300 p-4 mt-8">
        <div className="max-w-6xl mx-auto text-center text-xs text-gray-600">
          <p>© 2024 orkut.com - about orkut - terms - privacy - help</p>
        </div>
      </div>
    </div>
  )
}

export default Orkut