import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import GeoCitiesGifSelector from '../components/GeoCitiesGifSelector'

const GeoCities = () => {
  const navigate = useNavigate()
  const containerRef = useRef(null)
  const [activeGifPack, setActiveGifPack] = useState('pack1')

  const gifPacks = {
    pack1: {
      name: '90s Horror Chaos',
      gifs: [
        { type: 'construction', emoji: '🚧', text: 'UNDER CONSTRUCTION' },
        { type: 'skull', emoji: '💀', animation: 'animate-spin' },
        { type: 'bat', emoji: '🦇', animation: 'animate-bounce' },
        { type: 'button', emoji: '🔴', text: 'CLICK ME!' }
      ],
      theme: 'chaos'
    },
    pack2: {
      name: 'Haunted Web 1.0',
      gifs: [
        { type: 'blood', emoji: '🩸', text: 'DRIPPING BLOOD' },
        { type: 'fire', emoji: '🔥', animation: 'animate-pulse' },
        { type: 'pumpkin', emoji: '🎃', animation: 'animate-spin' },
        { type: 'glitch', emoji: '📺', text: 'CRT GLITCH' }
      ],
      theme: 'haunted'
    },
    pack3: {
      name: 'Retro Halloween Aesthetic',
      gifs: [
        { type: 'ghost', emoji: '👻', animation: 'animate-bounce' },
        { type: 'witch', emoji: '🧙‍♀️', animation: 'animate-float' },
        { type: 'sparkle', emoji: '✨', animation: 'animate-pulse' },
        { type: 'cemetery', emoji: '⚰️', text: 'CEMETERY SIGN' }
      ],
      theme: 'retro'
    }
  }

  useEffect(() => {
    // Page entrance with retro effect
    gsap.fromTo(containerRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1.5, ease: "back.out(1.7)" }
    )

    // Animate GIFs based on active pack
    const currentPack = gifPacks[activeGifPack]
    if (currentPack) {
      // Add some random GIF animations
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
    }
  }, [activeGifPack])

  const currentPack = gifPacks[activeGifPack]

  return (
    <div 
      ref={containerRef}
      className={`
        min-h-screen relative overflow-hidden
        ${currentPack.theme === 'chaos' ? 'bg-gradient-to-br from-red-900 via-yellow-800 to-purple-900' : ''}
        ${currentPack.theme === 'haunted' ? 'bg-gradient-to-b from-gray-900 via-red-900 to-black' : ''}
        ${currentPack.theme === 'retro' ? 'bg-gradient-to-br from-orange-900 via-purple-800 to-pink-900' : ''}
      `}
    >
      {/* Retro GeoCities Header */}
      <div className="bg-yellow-400 p-2 border-b-4 border-red-500 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-black animate-flicker">
              🌐 GeoCities
            </div>
            <div className="bg-red-500 text-white px-2 py-1 text-xs font-bold animate-bounce">
              CURSED EDITION
            </div>
          </div>
          <button 
            onClick={() => navigate('/graveyard')}
            className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 text-sm font-bold border-2 border-black"
          >
            BACK TO GRAVEYARD
          </button>
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
          {/* GIF Pack Selector */}
          <div className="lg:col-span-1">
            <GeoCitiesGifSelector 
              activeGifPack={activeGifPack}
              setActiveGifPack={setActiveGifPack}
              gifPacks={gifPacks}
            />
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {/* Welcome Banner */}
            <div className="bg-yellow-300 border-4 border-red-500 p-4 mb-4 relative">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-red-600 animate-flicker mb-2">
                  🚧 WELCOME TO MY HAUNTED HOMEPAGE! 🚧
                </h1>
                <div className="flex justify-center items-center space-x-4 mb-2">
                  <div className="animate-bounce">🎃</div>
                  <div className="bg-red-600 text-white px-2 py-1 text-sm font-bold animate-pulse">
                    UNDER ETERNAL CONSTRUCTION
                  </div>
                  <div className="animate-bounce">🎃</div>
                </div>
                <p className="text-black font-bold">
                  You are visitor number: <span className="bg-black text-green-400 px-2">666,666</span>
                </p>
              </div>
              
              {/* Corner decorations */}
              <div className="absolute top-0 left-0 text-2xl animate-spin">⚡</div>
              <div className="absolute top-0 right-0 text-2xl animate-spin" style={{animationDirection: 'reverse'}}>⚡</div>
            </div>

            {/* Content Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* About Me */}
              <div className="bg-black border-4 border-green-400 p-4">
                <h2 className="text-green-400 text-2xl font-bold mb-3 animate-pulse">
                  👻 ABOUT ME 👻
                </h2>
                <div className="text-green-300 space-y-2">
                  <p>Name: Digital Ghost</p>
                  <p>Age: Timeless</p>
                  <p>Hobbies: Haunting websites, collecting GIFs</p>
                  <p>Favorite Color: <span className="bg-red-600 text-white px-1">BLOOD RED</span></p>
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
                <h2 className="text-yellow-400 text-2xl font-bold mb-3 animate-flicker">
                  ⚡ MY INTERESTS ⚡
                </h2>
                <ul className="text-yellow-300 space-y-1">
                  <li>🔥 Collecting cursed GIFs</li>
                  <li>👻 Haunting old websites</li>
                  <li>💀 Digital archaeology</li>
                  <li>🕸️ Web 1.0 nostalgia</li>
                  <li>🎃 Retro horror aesthetics</li>
                </ul>
              </div>

              {/* Guestbook */}
              <div className="bg-red-900 border-4 border-white p-4">
                <h2 className="text-white text-2xl font-bold mb-3">
                  📝 SIGN MY GUESTBOOK! 📝
                </h2>
                <div className="space-y-2 mb-4">
                  <div className="bg-black text-green-400 p-2 text-sm">
                    <strong>SpookyUser1999:</strong> Cool site! Love the GIFs! 👻
                  </div>
                  <div className="bg-black text-green-400 p-2 text-sm">
                    <strong>RetroGhost:</strong> This brings back memories... *haunting sigh*
                  </div>
                </div>
                <textarea 
                  className="w-full bg-black text-green-400 p-2 border-2 border-green-500 text-sm"
                  rows="3"
                  placeholder="Leave a spooky message..."
                />
                <button className="mt-2 bg-green-600 text-black px-4 py-1 font-bold hover:bg-green-500">
                  SIGN IT!
                </button>
              </div>

              {/* Links */}
              <div className="bg-blue-900 border-4 border-cyan-400 p-4">
                <h2 className="text-cyan-400 text-2xl font-bold mb-3 animate-pulse">
                  🔗 HAUNTED LINKS 🔗
                </h2>
                <div className="space-y-2">
                  <div className="bg-black p-2">
                    <a href="#" className="text-cyan-300 underline hover:text-white">
                      👻 Ghost's Homepage
                    </a>
                  </div>
                  <div className="bg-black p-2">
                    <a href="#" className="text-cyan-300 underline hover:text-white">
                      🕷️ Spider's Web Ring
                    </a>
                  </div>
                  <div className="bg-black p-2">
                    <a href="#" className="text-cyan-300 underline hover:text-white">
                      💀 Digital Cemetery
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 bg-yellow-400 border-4 border-red-500 p-4 text-center">
              <div className="flex justify-center items-center space-x-4 mb-2">
                <div className="animate-spin">⚡</div>
                <p className="text-black font-bold">
                  This site is best viewed in Netscape Navigator 4.0!
                </p>
                <div className="animate-spin" style={{animationDirection: 'reverse'}}>⚡</div>
              </div>
              <p className="text-red-600 font-bold text-sm">
                Last updated: Never (still under construction since 1999)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GeoCities