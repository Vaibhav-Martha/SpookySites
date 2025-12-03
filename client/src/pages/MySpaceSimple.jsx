import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const MySpaceSimple = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-blue-600 text-white p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">MySpace (Haunted Edition)</h1>
          <div className="space-x-4">
            <button 
              onClick={() => navigate('/graveyard')}
              className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded"
            >
              Back to Graveyard
            </button>
            <button
              onClick={logout}
              className="bg-red-700 hover:bg-red-800 px-4 py-2 rounded"
            >
              👻 Logout
            </button>
          </div>
        </div>

        <div className="bg-white text-black p-6 rounded-lg">
          <h2 className="text-2xl mb-4">Welcome to MySpace, {user?.username}! 🧛</h2>
          <p className="mb-4">This is a simplified version of the MySpace haunted edition.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-100 p-4 rounded">
              <h3 className="font-bold mb-2">Profile Info</h3>
              <p>Username: {user?.username}</p>
              <p>Avatar: {user?.profile?.avatar}</p>
              <p>Status: {user?.profile?.status}</p>
            </div>
            
            <div className="bg-purple-100 p-4 rounded">
              <h3 className="font-bold mb-2">Spooky Features</h3>
              <ul className="list-disc list-inside">
                <li>👻 Haunted Profile Customization</li>
                <li>🧛 Vampire Theme Options</li>
                <li>💀 Spooky Widget Manager</li>
                <li>🕷️ Crawling Spider Effects</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gray-100 rounded">
            <h3 className="font-bold mb-2">🚧 Full MySpace Features Coming Soon:</h3>
            <p>The complete haunted MySpace experience with all customization options is being loaded...</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MySpaceSimple