import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const MySpaceOriginalDesign = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  
  const [profileSong, setProfileSong] = useState('My Chemical Romance - Welcome to the Black Parade')
  const [aboutMe, setAboutMe] = useState(`Hey! Thanks for checking out my MySpace! I'm just a regular person who loves music, friends, and having a good time. I'm always looking to meet new people so don't be shy - send me a message or add me as a friend!

I love going to concerts, hanging out with friends, and discovering new bands. Music is my life and I'm always listening to something. Check out my profile song and let me know what you think!

Hit me up if you want to chat! ♥`)

  const [whoIdLikeToMeet, setWhoIdLikeToMeet] = useState(`I'd like to meet cool people who share my interests in music and having fun. If you're into the same bands as me or just want to make a new friend, send me a message! I'm always down to chat about music, life, or whatever.

No drama please - just looking for genuine people to connect with!`)

  const [friends] = useState([
    { name: 'Tom', photo: '👨‍💻', id: 1 },
    { name: 'Sarah', photo: '👩‍🎤', id: 2 },
    { name: 'Mike', photo: '🎸', id: 3 },
    { name: 'Jessica', photo: '💄', id: 4 },
    { name: 'Chris', photo: '🎭', id: 5 },
    { name: 'Amanda', photo: '🌟', id: 6 },
    { name: 'Ryan', photo: '🎵', id: 7 },
    { name: 'Katie', photo: '💫', id: 8 }
  ])

  const [comments, setComments] = useState([
    {
      from: 'Sarah',
      photo: '👩‍🎤',
      message: 'Hey girl! Had such an amazing time at the concert last night! We need to hang out again soon ♥',
      time: '2 hours ago'
    },
    {
      from: 'Mike',
      photo: '🎸',
      message: 'Dude your profile song is sick! MCR is the best. We should jam sometime!',
      time: '5 hours ago'
    },
    {
      from: 'Jessica',
      photo: '💄',
      message: 'Love your new pics! You look amazing! Miss you babe, call me! xoxo',
      time: '1 day ago'
    }
  ])

  const [newComment, setNewComment] = useState('')

  const addComment = () => {
    if (newComment.trim()) {
      const comment = {
        from: user?.username || 'Friend',
        photo: user?.profile?.avatar || '👤',
        message: newComment,
        time: 'Just now'
      }
      setComments([comment, ...comments])
      setNewComment('')
    }
  }

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Verdana, Arial, sans-serif' }}>
      {/* Authentic MySpace Header */}
      <div className="bg-blue-600 text-white">
        <div className="max-w-none px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="text-2xl font-bold">MySpace.com</div>
              <nav className="flex space-x-4 text-sm">
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
              <span>Hello, {user?.username}!</span>
              <button onClick={() => navigate('/graveyard')} className="hover:underline">Graveyard</button>
              <button onClick={logout} className="hover:underline">SignOut</button>
            </div>
          </div>
        </div>
      </div>

      {/* Sub Navigation */}
      <div className="bg-blue-500 text-white text-xs">
        <div className="max-w-none px-4 py-1">
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
      <div className="max-w-none p-4 bg-white">
        <div className="flex gap-4">
          {/* Left Column */}
          <div className="w-80 flex-shrink-0">
            {/* Profile Info */}
            <table className="w-full border border-gray-400 bg-white mb-4" cellPadding="0" cellSpacing="0">
              <tr>
                <td className="bg-orange-400 text-white p-2 text-sm font-bold">
                  "{user?.username}"
                </td>
              </tr>
              <tr>
                <td className="p-4">
                  <div className="text-center mb-4">
                    <div className="w-32 h-32 bg-gray-200 border border-gray-400 mx-auto mb-2 flex items-center justify-center text-4xl">
                      {user?.profile?.avatar || '👤'}
                    </div>
                    <div className="text-sm text-black">
                      <p className="font-bold">{user?.username}</p>
                      <p>Online Now!</p>
                      <p>Last Login: 12/3/2024</p>
                    </div>
                  </div>
                  
                  <div className="text-xs space-y-1 text-black">
                    <p><strong>Member Since:</strong> 8/15/2003</p>
                    <p><strong>Profile Views:</strong> {Math.floor(Math.random() * 100000) + 10000}</p>
                  </div>

                  <div className="mt-4 space-y-1">
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
                </td>
              </tr>
            </table>

            {/* Contact Box */}
            <table className="w-full border border-gray-400 bg-white mb-4" cellPadding="0" cellSpacing="0">
              <tr>
                <td className="bg-orange-400 text-white p-2 text-sm font-bold">
                  Contacting {user?.username}
                </td>
              </tr>
              <tr>
                <td className="p-3 text-xs text-black">
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
                </td>
              </tr>
            </table>

            {/* Interests */}
            <table className="w-full border border-gray-400 bg-white mb-4" cellPadding="0" cellSpacing="0">
              <tr>
                <td className="bg-orange-400 text-white p-2 text-sm font-bold">
                  {user?.username}'s Interests
                </td>
              </tr>
              <tr>
                <td className="p-3 text-xs text-black">
                  <div className="mb-2">
                    <strong>General:</strong> Music, friends, concerts, movies, photography, art, reading, writing, traveling, coffee, late night conversations...
                  </div>
                  <div className="mb-2">
                    <strong>Music:</strong> Alternative, Rock, Indie, Pop Punk, Emo, Post-Hardcore, Electronic, Hip Hop, Classical...
                  </div>
                  <div className="mb-2">
                    <strong>Movies:</strong> Horror, Comedy, Drama, Independent films, Documentaries, Action, Romance...
                  </div>
                  <div>
                    <strong>Television:</strong> Lost, The Office, Friends, Arrested Development, South Park, Family Guy...
                  </div>
                </td>
              </tr>
            </table>
          </div>

          {/* Right Column */}
          <div className="flex-1">
            {/* Music Player */}
            <table className="w-full border border-gray-400 bg-white mb-4" cellPadding="0" cellSpacing="0">
              <tr>
                <td className="bg-orange-400 text-white p-2 text-sm font-bold">
                  {user?.username}'s Profile Song
                </td>
              </tr>
              <tr>
                <td className="p-4 text-black">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-300 border border-gray-400 flex items-center justify-center">
                      <span className="text-2xl">🎵</span>
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        value={profileSong}
                        onChange={(e) => setProfileSong(e.target.value)}
                        className="w-full border border-gray-300 p-1 text-sm"
                      />
                      <div className="flex items-center space-x-2 mt-2">
                        <button className="text-sm bg-gray-200 px-2 py-1 border">⏮️</button>
                        <button className="text-sm bg-gray-200 px-2 py-1 border">⏯️</button>
                        <button className="text-sm bg-gray-200 px-2 py-1 border">⏭️</button>
                        <div className="flex-1 bg-gray-200 h-2 border">
                          <div className="bg-blue-500 h-full w-1/3"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </table>

            {/* About Me */}
            <table className="w-full border border-gray-400 bg-white mb-4" cellPadding="0" cellSpacing="0">
              <tr>
                <td className="bg-orange-400 text-white p-2 text-sm font-bold">
                  {user?.username}'s Blurbs
                </td>
              </tr>
              <tr>
                <td className="p-4 text-black">
                  <div className="mb-4">
                    <h4 className="font-bold text-sm mb-2">About me:</h4>
                    <textarea
                      value={aboutMe}
                      onChange={(e) => setAboutMe(e.target.value)}
                      className="w-full border border-gray-300 p-2 text-sm h-32 resize-none"
                    />
                  </div>

                  <div>
                    <h4 className="font-bold text-sm mb-2">Who I'd like to meet:</h4>
                    <textarea
                      value={whoIdLikeToMeet}
                      onChange={(e) => setWhoIdLikeToMeet(e.target.value)}
                      className="w-full border border-gray-300 p-2 text-sm h-24 resize-none"
                    />
                  </div>
                </td>
              </tr>
            </table>

            {/* Top 8 Friends */}
            <table className="w-full border border-gray-400 bg-white mb-4" cellPadding="0" cellSpacing="0">
              <tr>
                <td className="bg-orange-400 text-white p-2 text-sm font-bold">
                  {user?.username}'s Friend Space (Top 8)
                </td>
              </tr>
              <tr>
                <td className="p-4 text-black">
                  <p className="text-xs mb-3">{user?.username} has <strong>{Math.floor(Math.random() * 1000) + 100}</strong> friends.</p>
                  <div className="grid grid-cols-4 gap-4">
                    {friends.map((friend, index) => (
                      <div key={friend.id} className="text-center">
                        <div className="w-16 h-16 bg-gray-200 border border-gray-400 mx-auto mb-1 flex items-center justify-center text-2xl">
                          {friend.photo}
                        </div>
                        <p className="text-xs text-blue-600 hover:underline cursor-pointer">{friend.name}</p>
                      </div>
                    ))}
                  </div>
                  <div className="text-center mt-3">
                    <a href="#" className="text-blue-600 text-xs hover:underline">View All of {user?.username}'s Friends</a>
                  </div>
                </td>
              </tr>
            </table>

            {/* Comments */}
            <table className="w-full border border-gray-400 bg-white mb-4" cellPadding="0" cellSpacing="0">
              <tr>
                <td className="bg-orange-400 text-white p-2 text-sm font-bold">
                  {user?.username}'s Friend Comments
                </td>
              </tr>
              <tr>
                <td className="p-4 text-black">
                  <div className="mb-4">
                    <p className="text-xs mb-2">Displaying <strong>{comments.length}</strong> of <strong>{comments.length}</strong> comments 
                      (<a href="#" className="text-blue-600 hover:underline">View/Edit All Comments</a>)
                    </p>
                  </div>

                  {/* Add comment */}
                  <div className="mb-4 p-3 bg-gray-100 border">
                    <h4 className="font-bold text-sm mb-2">Leave a Comment:</h4>
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="w-full border border-gray-300 p-2 text-sm resize-none"
                      rows="3"
                      placeholder="Write a comment..."
                    />
                    <button
                      onClick={addComment}
                      className="mt-2 bg-blue-600 text-white px-4 py-1 text-sm hover:bg-blue-700"
                    >
                      Post Comment
                    </button>
                  </div>

                  <div className="space-y-4">
                    {comments.map((comment, index) => (
                      <div key={index} className="border-b border-gray-300 pb-3">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-gray-200 border border-gray-400 flex-shrink-0 flex items-center justify-center">
                            {comment.photo}
                          </div>
                          <div className="flex-1">
                            <div className="text-xs mb-1">
                              <span className="font-bold">Posted by </span>
                              <a href="#" className="text-blue-600 hover:underline">{comment.from}</a>
                              <span> on {comment.time}</span>
                            </div>
                            <p className="text-sm">{comment.message}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 text-center">
                    <a href="#" className="text-blue-600 text-xs hover:underline">View/Edit All Comments</a>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-100 border-t border-gray-300 p-4">
        <div className="text-center text-xs text-gray-600">
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

export default MySpaceOriginalDesign