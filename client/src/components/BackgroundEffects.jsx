import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const BackgroundEffects = () => {
  const fogRef = useRef(null)
  const batsRef = useRef(null)
  const lightningRef = useRef(null)

  useEffect(() => {
    // Fog animation
    if (fogRef.current) {
      gsap.to(fogRef.current, {
        x: '100vw',
        duration: 20,
        repeat: -1,
        ease: 'none'
      })
    }

    // Bats flying animation
    const bats = batsRef.current?.children
    if (bats) {
      Array.from(bats).forEach((bat, index) => {
        gsap.set(bat, {
          x: -100,
          y: Math.random() * window.innerHeight * 0.6
        })
        
        gsap.to(bat, {
          x: window.innerWidth + 100,
          y: `+=${Math.random() * 200 - 100}`,
          duration: 8 + Math.random() * 4,
          delay: index * 2,
          repeat: -1,
          ease: 'none'
        })
      })
    }

    // Lightning effect
    const createLightning = () => {
      if (lightningRef.current) {
        gsap.set(lightningRef.current, { opacity: 0 })
        gsap.to(lightningRef.current, {
          opacity: 0.8,
          duration: 0.1,
          yoyo: true,
          repeat: 3,
          onComplete: () => {
            setTimeout(createLightning, 5000 + Math.random() * 10000)
          }
        })
      }
    }

    setTimeout(createLightning, 3000)
  }, [])

  return (
    <>
      {/* Fog Layer */}
      <div 
        ref={fogRef}
        className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-600/30 to-transparent -translate-x-full"
        style={{
          background: 'linear-gradient(to top, rgba(128,128,128,0.3) 0%, transparent 100%)',
          filter: 'blur(2px)'
        }}
      />

      {/* Bats */}
      <div ref={batsRef} className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute text-2xl"
            style={{ color: '#333' }}
          >
            🦇
          </div>
        ))}
      </div>

      {/* Lightning Flash */}
      <div
        ref={lightningRef}
        className="absolute inset-0 bg-white pointer-events-none opacity-0"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-midnight/80 via-graveyard-gray/60 to-black" />
      
      {/* Stars */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 60}%`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>
    </>
  )
}

export default BackgroundEffects