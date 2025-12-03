import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { useAuth } from '../context/AuthContext'

const GeoCitiesEnhanced = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const containerRef = useRef(null)
  const [activeGifPack, setActiveGifPack] = useState('pack1')
  const [visitorCount, setVisitorCount] = useState(Math.floor(Math.random() * 100000) + 50000)
  const [isUnderConstruction, setIsUnderConstruction] = useState(true)
  const [customHTML, setCustomHTML] = useState('<marquee>Welcome to my awesome homepage!</marquee>')
  const [backgroundColor, setBackgroundColor] = useState('#000080')
  const [textColor, setTextColor] = useState('#FFFF00')
  
  const [guestbook, setGuestbook] = useState([
    { name: 'RetroSurfer99', message: 'Awesome site! Love the spinning skull GIF! 💀', timestamp: '1999-12-31 23:59' },
    { name: 'WebMaster2000', message: 'Cool HTML effects! How did you make the text blink?', timestamp: '2000-01-01 00:30' },
    { name: 'PixelArtist', message: 'Your under construction GIF is the best I\'ve seen!', timestamp: '2000-01-02 15:45' }
  ])
  
  const [newGuestEntry, setNewGuestEntry] = useState({ name: '', message: '' })
  const [webRings, setWebRings] = useState([
    { name: 'Retro Web Ring', members: 42, joined: false },
    { name: 'HTML Wizards Circle', members: 128, joined: true },
    { name: 'GIF Collectors United', members: 256, joined: false },
    { name: 'Nostalgic Coders', members: 512, joined: true }
  ])

  const gifPacks = {
    pack1: {
      name: '90s Horror Chaos',
      gifs: [
        { type: 'construction', emoji: '🚧', text: 'UNDER CONSTRUCTION', animation: 'animate-bounce' },
        { type: 'skull', emoji: '💀', animation: 'animate-spin' },
        { type: 'bat', emoji: '🦇', animation: 'animate-bounce' },
        { type: 'button', emoji: '🔴', text: 'CLICK ME!', animation: 'animate-pulse' }
      ],
      theme: 'chaos',
      bgColor: '#000080',
      textColor: '#FFFF00'
    },
    pack2: {
      name: 'Haunted Web 1.0',
      gifs: [
        { type: 'blood', emoji: '🩸', text: 'DRIPPING BLOOD', animation: 'animate-pulse' },
        { type: 'fire', emoji: '🔥', animation: 'animate-pulse' },
        { type: 'pumpkin', emoji: '🎃', animation: 'animate-spin' },
        { type: 'glitch', emoji: '📺', text: 'CRT GLITCH', animation: 'animate-bounce' }
      ],
      theme: 'haunted',
      bgColor: '#800080',
      textColor: '#00FF00'
    },
    pack3: {
      name: 'Retro Halloween Aesthetic',
      gifs: [
        { type: 'ghost', emoji: '👻', animation: 'animate-bounce' },
        { type: 'witch', emoji: '🧙‍♀️', animation: 'animate-float' },
        { type: 'sparkle', emoji: '✨', animation: 'animate-pulse' },
        { type: 'cemetery', emoji: '⚰️', text: 'CEMETERY SIGN', animation: 'animate-bounce' }
      ],
      theme: 'retro',
      bgColor: '#FF4500',
      textColor: '#FFFFFF'
    }
  }

  useEffect(() => {
    // Page entrance with retro effect
    gsap.fromTo(containerRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1.5, ease: "back.out(1.7)" }
    )

    // Update colors based on active pack
    const currentPack = gifPacks[activeGifPack]
    setBackgroundColor(currentPack.bgColor)
    setTextColor(currentPack.textColor)

    // Animate GIFs
    const gifElements = document.querySelectorAll('.gif-element')
    gifElements.forEach((element, index) => {
      gsap.to(element, {
        rotation: 360,
        duration: 2 + Math.random() * 3,
        repeat: -1,
        ease: "none",
        delay: index * 0.2
      })
    })

    // Increment visitor count occasionally
    const interval = setInterval(() => {
      setVisitorCount(prev => prev + Math.floor(Math.random() * 3))
    }, 5000)

    return () => clearInterval(interval)
  }, [activeGifPack])

  const addGuestbookEntry = () => {
    if (newGuestEntry.name.trim() && newGuestEntry.message.trim()) {
      const entry = {
        name: newGuestEntry.name,
        message: newGuestEntry.message,
        timestamp: new Date().toLocaleString()
      }
      setGuestbook([entry, ...guestbook])
      setNewGuestEntry({ name: '', message: '' })
    }
  }

  const joinWebRing = (index) => {
    setWebRings(prev => prev.map((ring, i) => 
      i === index ? { 
        ...ring, 
        joined: !ring.joined,
        members: ring.joined ? ring.members - 1 : ring.members + 1
      } : ring
    ))
  }

  const currentPack = gifPacks[activeGifPack]

  return (
    <div 
      ref={containerRef}
      className="min-h-screen relative overflow-hidden"
      style={{ 
        background: `linear-gradient(45deg, ${backgroundColor}, ${backgroundColor}dd, ${backgroundColor}aa)`,
        color: textColor,
        fontFamily: 'Courier New, monospace'
      }}
    >
      {/* Retro GeoCities Header */}
      <div className="bg-yellow-400 p-2 border-b-4 border-red-500 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-black animate-pulse">
              🌐 GeoCities
            </div>
            <div className="bg-red-500 text-white px-2 py-1 text-xs font-bold animate-bounce">
              CURSED EDITION
            </div>
            {isUnderConstruction && (
              <div className="bg-yellow-600 text-black px-2 py-1 text-xs font-bold animate-bounce">
                🚧 UNDER CONSTRUCTION 🚧
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-black text-sm">Visitor #{visitorCount}</span>
            <button 
              onClick={() => navigate('/graveyard')}
              className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 text-sm font-bold border-2 border-black"
            >
              BACK TO GRAVEYARD
            </button>
            <button
              onClick={logout}
              className="bg-black text-white px-3 py-1 text-sm font-bold border-2 border-red-500"
            >
              👻 LOGOUT
            </button>
          </div>
        </div>
        
        {/* Retro decorations */}
        <div className="absolute top-0 left-1/4 animate-bounce text-red-600">⭐</div>
        <div className="absolute top-0 right-1/4 animate-bounce text-blue-600" style={{animationDelay: '0.5s'}}>⭐</div>
      </div>

      {/* Animated GIF borders and decorations */}
      <div className="absolute inset-0 pointer-events-none">
        {currentPack.gifs.map((gif, index) => (
          <div
            key={index}
            className={`absolute gif-element text-4xl ${gif.animation || ''}`}
            style={{
              left: `${Math.random() * 90}%`,
              top: `${Math.random() * 80 + 10}%`,
              animationDelay: `${Math.random() * 2}s`
            }}
          >
            {gif.emoji}
          </div>
        ))}
      </div>

      <div className="container mx-auto p-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* GIF Pack Selector & Controls */}
          <div className="lg:col-span-1">
            <div className="bg-black border-4 border-green-400 p-4 sticky top-4 mb-4">
              <h3 className="text-green-400 text-xl font-bold mb-4 text-center animate-pulse">
                🎨 SITE CONTROLS 🎨
              </h3>
              
              {/* GIF Pack Selector */}
              <div className="mb-4">
                <h4 className="text-green-300 font-bold mb-2">GIF PACK:</h4>
                {Object.entries(gifPacks).map(([packId, pack]) => (
                  <button
                    key={packId}
                    onClick={() => setActiveGifPack(packId)}
                    className={`w-full p-2 mb-2 text-left border-2 ${
                      activeGifPack === packId 
                        ? 'bg-green-600 text-black border-green-400' 
                        : 'bg-gray-800 text-green-400 border-gray-600 hover:bg-gray-700'
                    }`}
                  >
                    <div className="font-bold text-sm">{pack.name}</div>
                    <div className="flex space-x-1 mt-1">
                      {pack.gifs.slice(0, 4).map((gif, index) => (
                        <span key={index} className="text-xs">{gif.emoji}</span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>

              {/* Site Options */}
              <div className="mb-4">
                <h4 className="text-green-300 font-bold mb-2">SITE OPTIONS:</h4>
                <label className="flex items-center space-x-2 mb-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isUnderConstruction}
                    onChange={(e) => setIsUnderConstruction(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm">Under Construction</span>
                </label>
              </div>

              {/* Custom HTML */}
              <div>
                <h4 className="text-green-300 font-bold mb-2">CUSTOM HTML:</h4>
                <textarea
                  value={customHTML}
                  onChange={(e) => setCustomHTML(e.target.value)}
                  className="w-full bg-black text-green-400 p-2 border border-green-500 text-xs"
                  rows="3"
                  placeholder="<marquee>Your HTML here!</marquee>"
                />
              </div>
            </div>

            {/* Web Rings */}
            <div className="bg-purple-900 border-4 border-yellow-400 p-4">
              <h3 className="text-yellow-400 text-lg font-bold mb-3 animate-pulse">
                🔗 WEB RINGS 🔗
              </h3>
              {webRings.map((ring, index) => (
                <div key={index} className="mb-3 p-2 bg-black/50 border border-yellow-300">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-yellow-300 text-sm font-bold">{ring.name}</span>
                    <span className="text-xs text-yellow-400">{ring.members} sites</span>
                  </div>
                  <button
                    onClick={() => joinWebRing(index)}
                    className={`w-full text-xs py-1 px-2 border ${
                      ring.joined 
                        ? 'bg-red-600 text-white border-red-400' 
                        : 'bg-green-600 text-white border-green-400'
                    }`}
                  >
                    {ring.joined ? 'LEAVE RING' : 'JOIN RING'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {/* Welcome Banner */}
            <div className="bg-yellow-300 border-4 border-red-500 p-4 mb-4 relative">
              <div className="text-center">
                <div 
                  className="text-4xl font-bold text-red-600 mb-2"
                  dangerouslySetInnerHTML={{ __html: customHTML }}
                />
                <div className="flex justify-center items-center space-x-4 mb-2">
                  <div className="animate-bounce">🎃</div>
                  <div className="bg-red-600 text-white px-2 py-1 text-sm font-bold animate-pulse">
                    {isUnderConstruction ? 'UNDER ETERNAL CONSTRUCTION' : 'SITE COMPLETE!'}
                  </div>
                  <div className="animate-bounce">🎃</div>
                </div>
                <p className="text-black font-bold">
                  You are visitor number: <span className="bg-black text-green-400 px-2 animate-pulse">{visitorCount.toLocaleString()}</span>
                </p>
                <p className="text-black text-sm mt-2">
                  Last updated: {new Date().toLocaleDateString()} | Best viewed in Netscape Navigator 4.0!
                </p>
              </div>
            </div>

            {/* Content Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* About Me */}
              <div className="bg-black border-4 border-green-400 p-4">
                <h2 className="text-green-400 text-2xl font-bold mb-3 animate-pulse">
                  👻 ABOUT {user?.username?.toUpperCase()} 👻
                </h2>
                <div className="text-green-300 space-y-2 text-sm">
                  <p><strong>Name:</strong> {user?.username}</p>
                  <p><strong>Status:</strong> Digital Ghost</p>
                  <p><strong>Hobbies:</strong> Collecting vintage GIFs, HTML wizardry</p>
                  <p><strong>Favorite Era:</strong> <span className="bg-red-600 text-white px-1">THE 90s</span></p>
                  <p><strong>Email:</strong> {user?.email}</p>
                  <p><strong>ICQ:</strong> 123-456-789</p>
                </div>
                
                {/* Animated elements */}
                <div className="mt-4 flex justify-around">
                  <div className="animate-bounce">🕷️</div>
                  <div className="animate-pulse">💀</div>
                  <div className="animate-bounce" style={{animationDelay: '0.5s'}}>🕷️</div>
                </div>
              </div>

              {/* My Interests */}
              <div className="bg-purple-900 border-4 border-yellow-400 p-4">
                <h2 className="text-yellow-400 text-2xl font-bold mb-3 animate-pulse">
                  ⚡ MY INTERESTS ⚡
                </h2>
                <ul className="text-yellow-300 space-y-1 text-sm">
                  <li>🔥 Collecting cursed GIFs</li>
                  <li>👻 Haunting old websites</li>
                  <li>💀 Digital archaeology</li>
                  <li>🕸️ Web 1.0 nostalgia</li>
                  <li>🎃 Retro horror aesthetics</li>
                  <li>📼 VHS and cassette tapes</li>
                  <li>🎮 Retro gaming</li>
                  <li>🌐 Building homepages</li>
                </ul>
              </div>

              {/* Guestbook */}
              <div className="bg-red-900 border-4 border-white p-4">
                <h2 className="text-white text-2xl font-bold mb-3 animate-pulse">
                  📝 SIGN MY GUESTBOOK! 📝
                </h2>
                
                {/* Add new entry */}
                <div className="mb-4 p-3 bg-black/50 border-2 border-white">
                  <input
                    type="text"
                    value={newGuestEntry.name}
                    onChange={(e) => setNewGuestEntry({...newGuestEntry, name: e.target.value})}
                    className="w-full bg-black text-green-400 p-2 border border-green-500 mb-2 text-sm"
                    placeholder="Your name..."
                  />
                  <textarea 
                    value={newGuestEntry.message}
                    onChange={(e) => setNewGuestEntry({...newGuestEntry, message: e.target.value})}
                    className="w-full bg-black text-green-400 p-2 border border-green-500 text-sm"
                    rows="3"
                    placeholder="Leave a spooky message..."
                  />
                  <button 
                    onClick={addGuestbookEntry}
                    className="mt-2 bg-green-600 text-black px-4 py-1 font-bold hover:bg-green-500 border-2 border-black"
                  >
                    SIGN IT!
                  </button>
                </div>

                {/* Guestbook entries */}
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {guestbook.map((entry, index) => (
                    <div key={index} className="bg-black text-green-400 p-2 text-sm border border-green-500">
                      <div className="flex justify-between items-center mb-1">
                        <strong className="text-yellow-400">{entry.name}:</strong>
                        <span className="text-xs text-gray-400">{entry.timestamp}</span>
                      </div>
                      <p>{entry.message}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="bg-blue-900 border-4 border-cyan-400 p-4">
                <h2 className="text-cyan-400 text-2xl font-bold mb-3 animate-pulse">
                  🔗 HAUNTED LINKS 🔗
                </h2>
                <div className="space-y-2">
                  <div className="bg-black p-2 border border-cyan-300">
                    <a href="#" className="text-cyan-300 underline hover:text-white text-sm">
                      👻 Ghost's Homepage
                    </a>
                  </div>
                  <div className="bg-black p-2 border border-cyan-300">
                    <a href="#" className="text-cyan-300 underline hover:text-white text-sm">
                      🕷️ Spider's Web Ring
                    </a>
                  </div>
                  <div className="bg-black p-2 border border-cyan-300">
                    <a href="#" className="text-cyan-300 underline hover:text-white text-sm">
                      💀 Digital Cemetery
                    </a>
                  </div>
                  <div className="bg-black p-2 border border-cyan-300">
                    <a href="#" className="text-cyan-300 underline hover:text-white text-sm">
                      🎮 Retro Games Archive
                    </a>
                  </div>
                </div>

                {/* Hit Counter */}
                <div className="mt-4 text-center">
                  <div className="bg-black border-2 border-cyan-400 p-2 inline-block">
                    <div className="text-cyan-400 text-xs mb-1">HIT COUNTER:</div>
                    <div className="bg-red-600 text-white px-2 py-1 font-mono text-lg">
                      {visitorCount.toString().padStart(6, '0')}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 bg-yellow-400 border-4 border-red-500 p-4 text-center">
              <div className="flex justify-center items-center space-x-4 mb-2">
                <div className="animate-spin">⚡</div>
                <p className="text-black font-bold text-sm">
                  This site is powered by pure 90s nostalgia and HTML magic!
                </p>
                <div className="animate-spin" style={{animationDirection: 'reverse'}}>⚡</div>
              </div>
              <p className="text-red-600 font-bold text-xs">
                © {new Date().getFullYear()} {user?.username}'s Haunted Homepage | 
                Made with ❤️ and lots of &lt;blink&gt; tags
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GeoCitiesEnhanced