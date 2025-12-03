import React, { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'

const Grave = ({ name, epitaph, route, color, delay = 0, image = null }) => {
  const graveRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Initial animation
    gsap.fromTo(graveRef.current,
      { opacity: 0, y: 100, rotationX: -90 },
      { 
        opacity: 1, 
        y: 0, 
        rotationX: 0, 
        duration: 1.5, 
        delay,
        ease: "back.out(1.7)" 
      }
    )
  }, [delay])

  const handleClick = () => {
    navigate(route)
  }

  return (
    <div
      ref={graveRef}
      className="cursor-pointer"
      onClick={handleClick}
    >
      {/* Use image as grave if provided, otherwise use custom tombstone */}
      {image ? (
        <div className="relative group" style={{cursor: 'url(/cursor.png), pointer'}}>
          <img 
            src={image} 
            alt={`${name} grave`}
            className="w-96 h-auto object-contain drop-shadow-2xl transition-transform duration-300 hover:scale-105"
          />
          
          {/* Name below the grave */}
          <div className="text-center mt-4">
            <h3 className="text-2xl font-bold text-white font-serif tracking-wider">
              {name}
            </h3>
          </div>
          
          {/* Ghost hover tooltip with first person */}
          <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-black/95 text-gray-200 px-6 py-4 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-pre-line border border-gray-700 shadow-2xl backdrop-blur-sm z-10 min-w-max">
            <div className="flex items-start gap-2">
              <span className="text-2xl">👻</span>
              <div>
                <div className="font-semibold text-white mb-1">I am {name}...</div>
                {epitaph}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative">
          {/* Main tombstone body */}
          <div className={`
            w-72 h-96 bg-gray-600 rounded-t-full relative
            border-4 border-gray-500 shadow-2xl
            bg-gradient-to-b from-gray-500 to-gray-700
          `}>
            {/* Tombstone text */}
            <div className="absolute inset-6 flex flex-col items-center justify-center text-center">
              <h3 className={`text-3xl font-bold text-${color} mb-4 font-gothic`}>
                {name}
              </h3>
              <div className="text-sm text-gray-200 whitespace-pre-line leading-relaxed">
                {epitaph}
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-gray-400 text-xl">
              ⚰️
            </div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-gray-400 text-xl">
              🕊️
            </div>
          </div>
          
          {/* Base */}
          <div className="w-76 h-10 bg-gray-700 -mt-2 mx-auto rounded-sm border-2 border-gray-600"></div>
          
          {/* Ground mound */}
          <div className="w-80 h-6 bg-green-900 -mt-1 mx-auto rounded-full opacity-60"></div>
          
          {/* Flowers */}
          <div className="absolute -bottom-2 left-4 text-lg">🌹</div>
          <div className="absolute -bottom-1 right-6 text-lg">🥀</div>
        </div>
      )}
    </div>
  )
}

export default Grave