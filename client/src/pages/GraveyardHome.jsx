import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { useAuth } from '../context/AuthContext'
import Grave from '../components/Grave'
import BackgroundEffects from '../components/BackgroundEffects'

const GraveyardHome = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const titleRef = useRef(null)
  const graveyardRef = useRef(null)

  useEffect(() => {
    // Animate title entrance
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 2, ease: "power2.out" }
    )

    // Animate graveyard entrance
    gsap.fromTo(graveyardRef.current?.children,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.3, delay: 1 }
    )
  }, [])

  const graves = [
    {
      name: 'Orkut',
      epitaph: 'Here lies Orkut\n2004-2014\n"Scraps and testimonials\nforever in our hearts"',
      route: '/orkut',
      color: 'neon-purple',
      image: '/orcut.png'
    },
    {
      name: 'MySpace',
      epitaph: 'Here lies MySpace\n2003-2019\n"Top 8 friends\nand custom HTML\nR.I.P."',
      route: '/myspace',
      color: 'blue-400',
      image: '/myspace.png'
    },
    {
      name: 'GeoCities',
      epitaph: 'Here lies GeoCities\n1994-2009\n"Under Construction\nforever and always"',
      route: '/geocities',
      color: 'yellow-400',
      image: '/geocities.png'
    }
  ]



  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <BackgroundEffects />
      
      {/* Terrifying Horror Atmosphere */}
      <div className="absolute inset-0">
        {/* Big Moon Background */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-20 z-0">
          <img 
            src="/moon.png" 
            alt="Big Moon" 
            className="w-full h-full object-contain"
          />
        </div>
        
        {/* Multiple fog layers for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-900/80 to-gray-800/60"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/30 to-black/80"></div>
        
        {/* Menacing storm clouds */}
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-gray-800/40 to-transparent"></div>
        <div className="absolute top-8 left-1/4 w-96 h-32 bg-gray-700/30 rounded-full blur-3xl"></div>
        <div className="absolute top-16 right-1/3 w-80 h-24 bg-gray-600/25 rounded-full blur-2xl"></div>
        
        {/* Twisted dead trees */}
        <div className="absolute left-4 top-12 w-24 h-48 bg-gradient-to-t from-gray-900 to-gray-700 opacity-80" style={{clipPath: 'polygon(40% 0%, 60% 0%, 70% 100%, 30% 100%)'}}></div>
        <div className="absolute left-8 top-8 w-4 h-16 bg-gray-800 opacity-60 rotate-45 origin-bottom"></div>
        <div className="absolute left-2 top-24 w-3 h-12 bg-gray-800 opacity-50 -rotate-45 origin-bottom"></div>
        
        <div className="absolute right-8 top-20 w-32 h-56 bg-gradient-to-t from-gray-900 to-gray-600 opacity-70" style={{clipPath: 'polygon(35% 0%, 65% 0%, 75% 100%, 25% 100%)'}}></div>
        <div className="absolute right-12 top-16 w-5 h-20 bg-gray-700 opacity-50 rotate-30 origin-bottom"></div>
        <div className="absolute right-4 top-36 w-4 h-16 bg-gray-700 opacity-40 -rotate-30 origin-bottom"></div>
        
        {/* Creeping ground mist */}
        <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        {/* Ominous shadows and cracks */}
        <div className="absolute left-1/6 bottom-32 w-64 h-12 bg-black/60 rounded-full blur-xl transform -skew-x-12"></div>
        <div className="absolute right-1/4 bottom-28 w-48 h-8 bg-black/50 rounded-full blur-lg transform skew-x-12"></div>
        <div className="absolute center bottom-24 w-80 h-16 bg-black/40 rounded-full blur-2xl"></div>
        
        {/* Dominant Vampire - Bigger and Positioned on Left */}
        <div 
          className="absolute top-8 left-8 w-80 h-80 cursor-pointer hover:scale-105 transition-transform duration-500 z-40"
          onClick={() => navigate('/vampire-chat')}
        >
          <div className="relative">
            <img 
              src="/vampire.png" 
              alt="Count Dracula"
              className="w-80 h-80 object-contain drop-shadow-2xl transition-all duration-500 filter brightness-110 contrast-125"
              style={{filter: 'drop-shadow(0 0 20px rgba(0, 0, 0, 0.8)) drop-shadow(0 0 40px rgba(139, 0, 0, 0.4))'}}
            />
            
            {/* Hover tooltip */}
            <div className="absolute -bottom-18 left-1/2 transform -translate-x-1/2 bg-black/95 text-gray-200 px-6 py-3 rounded-lg text-base opacity-0 hover:opacity-100 transition-opacity duration-300 whitespace-nowrap border border-gray-600 shadow-2xl backdrop-blur-sm">
              🦇 Enter the Count's Domain 🦇
            </div>
          </div>
        </div>

      </div>
      
      <div className="relative z-10 h-screen flex flex-col overflow-hidden">
        {/* User Info and Logout */}
        <div className="absolute top-4 right-4 z-20">
          <button
            onClick={logout}
            className="bg-red-800 hover:bg-red-700 text-white px-3 py-1 rounded border border-red-600 transition-colors text-sm opacity-90 hover:opacity-100"
          >
            Logout
          </button>
        </div>

        {/* Compact Header Section */}
        <div className="flex-shrink-0 text-center pt-6 pb-4">
          <h1 
            ref={titleRef}
            className="text-4xl md:text-6xl lg:text-7xl font-horror text-gray-100 mb-3 drop-shadow-2xl tracking-widest font-bold relative z-10"
            style={{
              textShadow: '3px 3px 6px rgba(0, 0, 0, 0.9), 0 0 30px rgba(139, 0, 0, 0.5), 0 0 50px rgba(139, 0, 0, 0.3)',
              fontFamily: '"Creepster", "Nosifer", "Chiller", "Blackletter", cursive',
              letterSpacing: '0.15em',
              textTransform: 'uppercase'
            }}
          >
            THE GRAVEYARD
          </h1>
          
          <p className="text-base md:text-lg text-gray-300 mb-2 max-w-4xl mx-auto leading-relaxed opacity-90 px-4 font-serif">
            In the depths of digital darkness lie the cursed remains of once-mighty kingdoms...
          </p>
          <p className="text-sm md:text-base text-gray-400 max-w-3xl mx-auto leading-relaxed opacity-80 px-4 font-serif">
            Their servers silent, their users vanished into the void. 
            <span className="text-gray-200 font-semibold italic"> Dare you disturb their eternal rest?</span>
          </p>
        </div>
        
        {/* Main Graveyard Section - Takes remaining space */}
        <div className="flex-grow flex items-end justify-center pb-8">
          <div className="w-full max-w-8xl mx-auto px-1">
            <div 
              ref={graveyardRef}
              className="flex justify-center items-end gap-2 md:gap-4 lg:gap-6 xl:gap-8"
            >
              {graves.map((grave, index) => (
                <Grave
                  key={grave.name}
                  name={grave.name}
                  epitaph={grave.epitaph}
                  route={grave.route}
                  color={grave.color}
                  delay={index * 0.3}
                  image={grave.image}
                />
              ))}
            </div>
          </div>
        </div>

      </div>


    </div>
  )
}

export default GraveyardHome