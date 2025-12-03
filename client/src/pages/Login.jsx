import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import BackgroundEffects from '../components/BackgroundEffects'

const Login = () => {
  const navigate = useNavigate()
  const buttonRef = useRef(null)
  const titleRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    // Animate title entrance
    gsap.fromTo(titleRef.current, 
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 2, ease: "power2.out" }
    )

    // Animate button entrance
    gsap.fromTo(buttonRef.current,
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 1.5, delay: 1, ease: "back.out(1.7)" }
    )
  }, [])

  const handleEnterCemetery = () => {
    // Thunder flash effect
    const flash = document.createElement('div')
    flash.className = 'fixed inset-0 bg-white z-50 pointer-events-none'
    flash.style.opacity = '0'
    document.body.appendChild(flash)

    // Play thunder sound (if available)
    const thunder = new Audio('/sounds/thunder.mp3')
    thunder.play().catch(() => {}) // Ignore if sound fails

    // Flash animation
    gsap.to(flash, {
      opacity: 1,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        // Fade to black transition
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 1,
          onComplete: () => {
            navigate('/graveyard')
            document.body.removeChild(flash)
          }
        })
      }
    })
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-black relative overflow-hidden">
      <BackgroundEffects />
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <h1 
          ref={titleRef}
          className="text-6xl md:text-8xl font-gothic text-blood-red mb-8 text-center gothic-text"
        >
          Graveyard of the
          <br />
          <span className="text-ghost-white">Forgotten Web</span>
        </h1>
        
        <p className="text-xl text-gray-300 mb-12 text-center max-w-2xl">
          Enter the digital cemetery where the ghosts of social media past still roam...
        </p>
        
        <button
          ref={buttonRef}
          onClick={handleEnterCemetery}
          className="spooky-button text-2xl px-12 py-4 relative group"
        >
          <span className="relative z-10">Enter the Cemetery</span>
          <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
        </button>
        
        <div className="mt-8 text-sm text-gray-500 text-center">
          <p>⚠️ Warning: May contain traces of nostalgia and digital spirits ⚠️</p>
        </div>
      </div>
    </div>
  )
}

export default Login