import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const MySpace = () => {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const containerRef = useRef(null)

  useEffect(() => {
    // Add MySpace-specific fonts
    const link = document.createElement('link')
    link.href = 'https://fonts.googleapis.com/css2?family=Arial:wght@400;700&family=Verdana:wght@400;700&display=swap'
    document.head.appendChild(link)
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen bg-white" style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Authentic MySpace Header */}
      <div className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="text-2xl font-bold">MySpace</div>
              <nav className="hidden md:flex space-x-4 text-sm">
                <a href="#" className="hover:underline">Home</a>
                <a href="#" className="hover:underline">Browse</a>
                <a href="#" className="hover:underline">Search</a>
                <a href="#" className="hover:underline">Invite</a>
                <a href="#" className="hover:underline">Film</a>
                <a href="#" className="hover:underline">Mail</a>
                <a href="#" className="hover:underline">Blog</a>
                <a href="#" className="hover:underline">Favorites</a>
                <a href="#" className="hover:underline">Forum</a>
                <a href="#" className="hover:underline">Groups</a>
                <a href="#" className="hover:underline">Events</a>
                <a href="#" className="hover:underline">Videos</a>
                <a href="#" className="hover:underline">Music</a>
                <a href="#" className="hover:underline">Comedy</a>
                <a href="#" className="hover:underline">Classifieds</a>
              </nav>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <button onClick={() => navigate('/graveyard')} className="hover:underline">Graveyard</button>
              <button onClick={logout} className="hover:underline">SignOut</button>
            </div>
          </div>
        </div>
      </div>

      {/* Sub Navigation */}
      <div className="bg-blue-500 text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 py-1">
          <div className="flex space-x-4">
            <a href="#" className="hover:underline">My Profile</a>
            <a href="#" className="hover:underline">My Mail</a>
            <a href="#" className="hover:underline">My Blog</a>
            <a href="#" className="hover:underline">My Groups</a>
            <a href="#" className="hover:underline">My Friends</a>
            <a href="#" className="hover:underline">My Photos</a>
            <a href="#" className="hover:underline">My Videos</a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Column */}
          <div className="space-y-4">
            {/* Profile Info */}
            <div className="bg-white border border-gray-400">
              <div className="bg-orange-400 text-white p-2 text-sm font-bold">
                "Tom"
              </div>
              <div className="p-4">
                <div className="text-center mb-4">
                  <div className="w-32 h-32 bg-gray-200 border border-gray-400 mx-auto mb-2 flex items-center justify-center">
                    <span className="text-gray-500 text-xs">Default Photo</span>
                  </div>
                  <div className="text-sm">
                    <p className="font-bold">Tom Anderson</p>
                    <p>Male</p>
                    <p>35 years old</p>
                    <p>Los Angeles, California</p>
                    <p>United States</p>
                  </div>
                </div>
                
                <div className="text-xs space-y-1">
                  <p><strong>Last Login:</strong> 12/3/2024</p>
                  <p><strong>Member Since:</strong> 8/15/2003</p>
                  <p><strong>Profile Views:</strong> 1,234,567</p>
                </div>

                <div className="mt-4 space-y-2">
                  <button className="w-full bg-blue-600 text-white text-xs py-1 hover:bg-blue-700">
                    Add to Friends
                  </button>
                  <button className="w-full bg-blue-600 text-white text-xs py-1 hover:bg-blue-700">
                    Add to Favorites
                  </button>
                  <button className="w-full bg-blue-600 text-white text-xs py-1 hover:bg-blue-700">
                    Send Message
                  </button>
                  <button className="w-full bg-blue-600 text-white text-xs py-1 hover:bg-blue-700">
                    Forward to Friend
                  </button>
                  <button className="w-full bg-blue-600 text-white text-xs py-1 hover:bg-blue-700">
                    Add to Group
                  </button>
                  <button className="w-full bg-blue-600 text-white text-xs py-1 hover:bg-blue-700">
                    Block User
                  </button>
                  <button className="w-full bg-blue-600 text-white text-xs py-1 hover:bg-blue-700">
                    Rank User
                  </button>
                </div>
              </div>
            </div>

            {/* Contact Box */}
            <div className="bg-white border border-gray-400">
              <div className="bg-orange-400 text-white p-2 text-sm font-bold">
                Contacting Tom
              </div>
              <div className="p-3 text-xs space-y-1">
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-1">
                    <div className="w-4 h-4 bg-gray-300"></div>
                    <span>Send Message</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-4 h-4 bg-gray-300"></div>
                    <span>Forward to Friend</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-4 h-4 bg-gray-300"></div>
                    <span>Add to Friends</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-4 h-4 bg-gray-300"></div>
                    <span>Add to Favorites</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-4 h-4 bg-gray-300"></div>
                    <span>Instant Message</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-4 h-4 bg-gray-300"></div>
                    <span>Add to Group</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interests */}
            <div className="bg-white border border-gray-400">
              <div className="bg-orange-400 text-white p-2 text-sm font-bold">
                Tom's Interests
              </div>
              <div className="p-3 text-xs">
                <div className="mb-2">
                  <strong>General:</strong> The Internet, music, comedy, film, friendship, coke, my dog, snow skiing, hiking, traveling, swimming, dancing, tennis, movies, reading, painting, billiards...
                </div>
                <div className="mb-2">
                  <strong>Music:</strong> Alternative, Classical, Country, Dance, Electronica, Hip Hop, Jazz, Pop, Punk, Rap, Rock, Techno...
                </div>
                <div className="mb-2">
                  <strong>Movies:</strong> Action, Comedy, Documentary, Drama, Horror, Independent, Romance, Thriller...
                </div>
                <div>
                  <strong>Television:</strong> The Daily Show, Arrested Development, Curb Your Enthusiasm, The Simpsons...
                </div>
              </div>
            </div>
          </div>

          {/* Middle Column */}
          <div className="lg:col-span-2 space-y-4">
            {/* About Me */}
            <div className="bg-white border border-gray-400">
              <div className="bg-orange-400 text-white p-2 text-sm font-bold">
                Tom's Blurbs
              </div>
              <div className="p-4">
                <div className="mb-4">
                  <h4 className="font-bold text-sm mb-2">About me:</h4>
                  <div className="text-sm leading-relaxed">
                    <p className="mb-2">
                      Thanks for visiting MySpace! MySpace is an online community that lets you meet your friends' friends. 
                      Create a private community on MySpace and you can share photos, journals and interests with your growing network of mutual friends!
                    </p>
                    <p className="mb-2">
                      See who knows who, or how you are connected. Find out if you really are six people away from Kevin Bacon.
                    </p>
                    <p>
                      MySpace is for everyone:
                      - Friends who want to talk Online
                      - Single people who want to meet other Singles
                      - Matchmakers who want to connect their friends with other friends
                      - Families who want to keep in touch--map your Family Tree
                      - Business people and co-workers interested in networking
                      - Classmates and study partners
                      - Anyone looking for long lost friends!
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-sm mb-2">Who I'd like to meet:</h4>
                  <p className="text-sm">
                    MySpace users. There are a lot of great people here to meet, and I'd like to be friends with all of them. 
                    I want to get to know everyone, and I want everyone to have a good time on MySpace.
                  </p>
                </div>
              </div>
            </div>

            {/* Top 8 Friends */}
            <div className="bg-white border border-gray-400">
              <div className="bg-orange-400 text-white p-2 text-sm font-bold">
                Tom's Friend Space (Top 8)
              </div>
              <div className="p-4">
                <p className="text-xs mb-3">Tom has <strong>99,999,999</strong> friends.</p>
                <div className="grid grid-cols-4 gap-4">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="text-center">
                      <div className="w-16 h-16 bg-gray-200 border border-gray-400 mx-auto mb-1 flex items-center justify-center">
                        <span className="text-xs text-gray-500">Friend {i + 1}</span>
                      </div>
                      <p className="text-xs text-blue-600 hover:underline cursor-pointer">Friend{i + 1}</p>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-3">
                  <a href="#" className="text-blue-600 text-xs hover:underline">View All of Tom's Friends</a>
                </div>
              </div>
            </div>

            {/* Comments */}
            <div className="bg-white border border-gray-400">
              <div className="bg-orange-400 text-white p-2 text-sm font-bold">
                Tom's Friend Comments
              </div>
              <div className="p-4">
                <div className="mb-4">
                  <p className="text-xs mb-2">Displaying <strong>5</strong> of <strong>12,345</strong> comments 
                    (<a href="#" className="text-blue-600 hover:underline">View/Edit All Comments</a>)
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="border-b border-gray-300 pb-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gray-200 border border-gray-400 flex-shrink-0"></div>
                      <div className="flex-1">
                        <div className="text-xs mb-1">
                          <span className="font-bold">Posted by </span>
                          <a href="#" className="text-blue-600 hover:underline">Sarah</a>
                          <span> on Dec 3, 2024 at 2:30 PM</span>
                        </div>
                        <p className="text-sm">Hey Tom! Thanks for accepting my friend request. MySpace is so cool!</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-b border-gray-300 pb-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gray-200 border border-gray-400 flex-shrink-0"></div>
                      <div className="flex-1">
                        <div className="text-xs mb-1">
                          <span className="font-bold">Posted by </span>
                          <a href="#" className="text-blue-600 hover:underline">Mike</a>
                          <span> on Dec 2, 2024 at 8:15 PM</span>
                        </div>
                        <p className="text-sm">Dude, MySpace is the future of social networking! Love what you've built here.</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-b border-gray-300 pb-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gray-200 border border-gray-400 flex-shrink-0"></div>
                      <div className="flex-1">
                        <div className="text-xs mb-1">
                          <span className="font-bold">Posted by </span>
                          <a href="#" className="text-blue-600 hover:underline">Jessica</a>
                          <span> on Dec 1, 2024 at 4:22 PM</span>
                        </div>
                        <p className="text-sm">OMG Tom! I love being able to customize my profile with HTML and CSS. This is amazing!</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <a href="#" className="text-blue-600 text-xs hover:underline">View/Edit All Comments</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-100 border-t border-gray-300 p-4 mt-8">
        <div className="max-w-7xl mx-auto text-center text-xs text-gray-600">
          <div className="flex justify-center space-x-4 mb-2">
            <a href="#" className="hover:underline">About</a>
            <a href="#" className="hover:underline">FAQ</a>
            <a href="#" className="hover:underline">Terms</a>
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Safety Tips</a>
            <a href="#" className="hover:underline">Contact MySpace</a>
            <a href="#" className="hover:underline">Promote!</a>
            <a href="#" className="hover:underline">Advertise</a>
            <a href="#" className="hover:underline">MySpace International</a>
          </div>
          <p>© 2003-2024 MySpace.com. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  )
}

export default MySpace