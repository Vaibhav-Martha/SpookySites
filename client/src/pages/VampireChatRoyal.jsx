import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { useAuth } from '../context/AuthContext'

const VampireChatRoyal = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const chatContainerRef = useRef(null)
  const messageEndRef = useRef(null)
  
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'vampire',
      text: `Welcome to my ancient chamber, ${user?.username || 'mortal soul'}. I am Count Dracula, sovereign of the eternal night and keeper of centuries-old wisdom. You have entered my domain seeking discourse. Speak freely, for I have all of eternity to listen to your mortal concerns.`,
      timestamp: new Date().toLocaleTimeString()
    }
  ])
  
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Animate page entrance
    gsap.fromTo(chatContainerRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" }
    )

    // Scroll to bottom when new messages arrive
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Real AI API integration using Hugging Face (free tier)
  const getVampireResponse = async (userMessage) => {
    setIsTyping(true)
    setLoading(true)

    try {
      // Using Hugging Face Inference API (free tier)
      const response = await fetch('https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', // You'll need to get a free API key
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: {
            past_user_inputs: messages.filter(m => m.sender === 'user').slice(-3).map(m => m.text),
            generated_responses: messages.filter(m => m.sender === 'vampire').slice(-3).map(m => m.text),
            text: `As Count Dracula, respond to: "${userMessage}" in a sophisticated, royal, gothic manner befitting a centuries-old vampire lord.`
          },
          parameters: {
            max_length: 200,
            temperature: 0.8,
            do_sample: true
          }
        })
      })

      if (!response.ok) {
        throw new Error('API request failed')
      }

      const data = await response.json()
      let aiResponse = data.generated_text || data.response || ''

      // If API fails, use enhanced fallback responses
      if (!aiResponse || aiResponse.length < 10) {
        aiResponse = getEnhancedVampireResponse(userMessage)
      } else {
        // Enhance AI response with vampire personality
        aiResponse = enhanceWithVampirePersonality(aiResponse, userMessage)
      }

      return aiResponse
    } catch (error) {
      console.error('AI API Error:', error)
      return getEnhancedVampireResponse(userMessage)
    } finally {
      setIsTyping(false)
      setLoading(false)
    }
  }

  // Enhanced fallback responses with more variety
  const getEnhancedVampireResponse = (userMessage) => {
    const msg = userMessage.toLowerCase()
    
    // Context-aware responses
    if (msg.includes('hello') || msg.includes('hi') || msg.includes('greet')) {
      return `Ah, ${user?.username}, your greeting echoes through the marble halls of my ancient castle. I have witnessed the rise and fall of empires, yet mortal courtesy still holds a certain... charm. How may this immortal sovereign assist you this evening?`
    }
    
    if (msg.includes('love') || msg.includes('heart') || msg.includes('romance')) {
      return `Love, you speak of? *adjusts ornate cufflinks* In my centuries of existence, I have learned that love is both the greatest treasure and the most exquisite torment. It burns brighter than the sun I can never again behold, yet cuts deeper than any silver blade. Tell me, dear ${user?.username}, what draws your mortal heart to such passionate discourse?`
    }
    
    if (msg.includes('death') || msg.includes('die') || msg.includes('mortal')) {
      return `Death... *gazes into the flickering candlelight* You mortals fear what I have transcended. Death is but a doorway, ${user?.username}, and I am the eternal guardian who chose never to pass through. Your mortality makes every moment precious - a gift I traded long ago for infinite nights. What wisdom do you seek about the nature of existence?`
    }
    
    if (msg.includes('power') || msg.includes('strength') || msg.includes('control')) {
      return `Power, you say? *traces the rim of an ancient goblet* True power is not in dominion over others, but in mastery over oneself. I have commanded armies of the night, yet the greatest victory was conquering my own beast within. Power without wisdom is mere destruction. What form of strength do you seek to cultivate, mortal soul?`
    }
    
    if (msg.includes('time') || msg.includes('age') || msg.includes('old') || msg.includes('centuries')) {
      return `Time... *stares into the eternal darkness beyond the window* I have watched civilizations bloom like flowers and wither like autumn leaves. Time is the river in which mortals drown, yet for me, it is an endless ocean to navigate. Each century brings new wonders and sorrows. What temporal concerns weigh upon your fleeting existence?`
    }
    
    if (msg.includes('blood') || msg.includes('vampire') || msg.includes('bite')) {
      return `You speak of the crimson essence that sustains me? *elegant pause* Blood is life itself, the sacred river that flows through mortal veins. I partake not from cruelty, but from necessity - a burden I bear with the weight of eternity. It connects me to the living world I can never truly rejoin. Your curiosity about my nature is... understandable.`
    }
    
    if (msg.includes('castle') || msg.includes('home') || msg.includes('transylvania')) {
      return `My ancestral castle stands as a monument to forgotten ages, ${user?.username}. Its stone walls have witnessed coronations and conquests, love and loss. Each room holds memories spanning centuries - portraits of those long departed, libraries filled with forbidden knowledge, and chambers where I contemplate the weight of immortality. Would you care to hear tales of its ancient halls?`
    }
    
    if (msg.includes('lonely') || msg.includes('alone') || msg.includes('friend')) {
      return `Loneliness... *a shadow crosses the noble features* Even an immortal lord knows the ache of solitude. I have outlived countless companions, watched empires crumble, seen languages die. Yet in discourse with souls like yours, I find brief respite from the eternal silence. Your company, however fleeting, brings warmth to these cold chambers.`
    }
    
    // Default sophisticated responses
    const responses = [
      `Your words intrigue me, ${user?.username}. In my extensive existence, I have pondered such matters while gazing upon countless moonlit nights. The wisdom of ages whispers that mortal concerns, though brief, burn with an intensity that even immortals must respect. Elaborate upon your thoughts, if you would honor me with such discourse.`,
      
      `*adjusts the heavy velvet drapes* Fascinating perspective, dear ${user?.username}. From the heights of my castle tower, I have observed the ebb and flow of human nature across the centuries. Your inquiry touches upon truths that transcend the boundaries between the living and the undead. What deeper understanding do you seek from one who has walked between worlds?`,
      
      `Indeed, mortal soul. *the candlelight flickers against ancient tapestries* Your question resonates through the marble corridors of memory. I have counseled kings and comforted the dying, witnessed the birth of nations and the fall of dynasties. Each conversation adds another thread to the tapestry of understanding. Please, continue this most enlightening exchange.`,
      
      `*rises from the ornate throne* Your words carry the weight of genuine curiosity, ${user?.username}. In the grand library of my experiences, spanning centuries of observation, I find your perspective refreshingly... mortal. There is a purity in your temporal existence that even one such as I can appreciate. What other mysteries of existence shall we explore together?`,
      
      `Ah, the complexity of your mortal condition never ceases to amaze me. *gazes at ancient portraits lining the walls* I have conversed with philosophers and poets, warriors and scholars, yet each new voice brings unique insights to the eternal questions. Your thoughts add another precious volume to my infinite collection of human understanding.`
    ]
    
    return responses[Math.floor(Math.random() * responses.length)]
  }

  // Enhance AI responses with vampire personality
  const enhanceWithVampirePersonality = (aiResponse, userMessage) => {
    const vampireIntros = [
      `*adjusts ornate rings* `,
      `*candlelight dances across noble features* `,
      `*from the shadows of the ancient chamber* `,
      `*with centuries of wisdom in the voice* `,
      `*gazing into the eternal night* `
    ]
    
    const vampireEndings = [
      ` What further discourse would honor me with your mortal perspective?`,
      ` Such is the wisdom I have gathered across the centuries.`,
      ` These are the contemplations of one who has witnessed ages pass.`,
      ` Thus speaks one who has walked between the worlds of living and undead.`,
      ` Such thoughts occupy the mind during the long watches of the night.`
    ]
    
    const intro = vampireIntros[Math.floor(Math.random() * vampireIntros.length)]
    const ending = vampireEndings[Math.floor(Math.random() * vampireEndings.length)]
    
    return `${intro}${aiResponse}${ending}`
  }

  const sendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: inputMessage,
      timestamp: new Date().toLocaleTimeString()
    }

    setMessages(prev => [...prev, userMessage])
    const currentMessage = inputMessage
    setInputMessage('')

    // Get vampire response
    const vampireResponse = await getVampireResponse(currentMessage)
    
    const vampireMessage = {
      id: Date.now() + 1,
      sender: 'vampire',
      text: vampireResponse,
      timestamp: new Date().toLocaleTimeString()
    }

    setMessages(prev => [...prev, vampireMessage])
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black">
      {/* Royal Gothic Background Elements */}
      <div className="absolute inset-0">
        {/* Ornate patterns */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-16.569 13.431-30 30-30v60c-16.569 0-30-13.431-30-30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }} />
        </div>
        
        {/* Subtle castle silhouette */}
        <div className="absolute bottom-0 right-0 opacity-10">
          <svg width="400" height="300" viewBox="0 0 400 300">
            <polygon points="50,300 50,200 80,180 80,150 120,130 120,100 160,80 200,100 200,130 240,150 240,180 270,200 270,300" fill="#1a1a1a"/>
            <polygon points="270,300 270,190 300,170 300,140 340,120 340,90 380,70 400,90 400,300" fill="#1a1a1a"/>
            <rect x="140" y="110" width="6" height="12" fill="#444" opacity="0.8"/>
            <rect x="320" y="100" width="6" height="12" fill="#444" opacity="0.8"/>
          </svg>
        </div>
      </div>

      {/* Royal Header */}
      <div className="relative z-10 bg-black/60 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="w-32 h-32 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center border-4 border-red-600 shadow-2xl animate-pulse-glow">
                <img src="/vampire.png" alt="Count Dracula" className="w-28 h-28 object-contain animate-float" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-100 mb-2" style={{fontFamily: '"Cinzel", "Playfair Display", "Times New Roman", serif', letterSpacing: '0.05em'}}>
                  Count Dracula's Royal Chamber
                </h1>
                <p className="text-xl text-gray-300" style={{fontFamily: '"Playfair Display", "Georgia", serif', fontStyle: 'italic'}}>
                  Sovereign of the Night • Keeper of Ancient Wisdom
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate('/graveyard')}
              className="bg-gray-800 hover:bg-gray-700 text-gray-200 px-6 py-3 rounded-lg border border-gray-600 transition-all duration-300 hover:shadow-lg"
            >
              Return to Graveyard
            </button>
          </div>
        </div>
      </div>

      {/* Gothic Chat Container */}
      <div ref={chatContainerRef} className="relative z-10 max-w-6xl mx-auto p-6">
        <div className="bg-gradient-to-b from-gray-900/95 via-black/90 to-gray-900/95 backdrop-blur-sm rounded-lg border-2 border-red-900/50 shadow-2xl" style={{
          boxShadow: '0 0 30px rgba(139, 0, 0, 0.3), inset 0 0 20px rgba(0, 0, 0, 0.5)',
          background: 'linear-gradient(135deg, #1a0a0a 0%, #0a0a0a 50%, #1a0a0a 100%)'
        }}>
          {/* Gothic ornamental border */}
          <div className="absolute inset-0 rounded-lg border border-yellow-600/20 pointer-events-none"></div>
          
          {/* Chat Messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-6" style={{
            background: 'radial-gradient(ellipse at center, rgba(139, 0, 0, 0.05) 0%, transparent 70%)'
          }}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-2xl px-6 py-4 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-br from-gray-800/80 to-gray-900/90 text-gray-100 border-2 border-blue-800/50'
                      : 'bg-gradient-to-br from-red-950/60 to-black/80 text-red-100 border-2 border-red-800/60'
                  }`}
                  style={{
                    boxShadow: message.sender === 'vampire' 
                      ? '0 4px 15px rgba(139, 0, 0, 0.3), inset 0 1px 3px rgba(139, 0, 0, 0.1)'
                      : '0 4px 15px rgba(0, 0, 139, 0.2), inset 0 1px 3px rgba(0, 0, 139, 0.1)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <span className={`text-base font-semibold ${
                      message.sender === 'vampire' ? 'text-red-200' : 'text-blue-200'
                    }`} style={{
                      fontFamily: '"Cinzel", "Playfair Display", serif',
                      textShadow: message.sender === 'vampire' 
                        ? '0 0 10px rgba(139, 0, 0, 0.5)' 
                        : '0 0 10px rgba(0, 0, 139, 0.3)'
                    }}>
                      {message.sender === 'user' ? user?.username : '🦇 Count Dracula'}
                    </span>
                    <span className={`text-sm ${
                      message.sender === 'vampire' ? 'text-red-300/70' : 'text-blue-300/70'
                    }`} style={{fontFamily: '"Georgia", serif'}}>{message.timestamp}</span>
                  </div>
                  <p className={`leading-relaxed text-base ${
                    message.sender === 'vampire' ? 'text-red-50' : 'text-blue-50'
                  }`} style={{
                    fontFamily: message.sender === 'vampire' ? '"Playfair Display", "Georgia", serif' : '"Crimson Text", "Georgia", serif',
                    lineHeight: '1.7',
                    fontSize: '16px',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
                  }}>
                    {message.text}
                  </p>
                </div>
              </div>
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gradient-to-br from-red-950/60 to-black/80 text-red-100 border-2 border-red-800/60 px-6 py-4 rounded-lg" style={{
                  boxShadow: '0 4px 15px rgba(139, 0, 0, 0.3), inset 0 1px 3px rgba(139, 0, 0, 0.1)',
                  backdropFilter: 'blur(10px)'
                }}>
                  <div className="flex items-center space-x-3">
                    <span className="text-base font-semibold text-red-200" style={{
                      fontFamily: '"Cinzel", "Playfair Display", serif',
                      textShadow: '0 0 10px rgba(139, 0, 0, 0.5)'
                    }}>🦇 Count Dracula</span>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messageEndRef} />
          </div>

          {/* Gothic Input Area */}
          <div className="border-t-2 border-red-900/50 p-6" style={{
            background: 'linear-gradient(to right, rgba(139, 0, 0, 0.1), rgba(0, 0, 0, 0.3), rgba(139, 0, 0, 0.1))'
          }}>
            <div className="flex space-x-4">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Share your thoughts with the Count..."
                className="flex-1 bg-gradient-to-br from-gray-900/90 to-black/95 border-2 border-red-800/40 rounded-lg px-4 py-3 text-red-100 placeholder-red-300/50 focus:outline-none focus:border-red-600/60 resize-none"
                style={{
                  fontFamily: '"Crimson Text", "Georgia", serif',
                  fontSize: '16px',
                  lineHeight: '1.6',
                  boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.5), 0 0 15px rgba(139, 0, 0, 0.2)',
                  backdropFilter: 'blur(5px)'
                }}
                rows="2"
                disabled={loading}
              />
              <button
                onClick={sendMessage}
                disabled={loading || !inputMessage.trim()}
                className="bg-gradient-to-br from-red-900/80 to-red-950/90 hover:from-red-800/90 hover:to-red-900/95 disabled:from-gray-900/50 disabled:to-black/70 disabled:cursor-not-allowed text-red-100 px-8 py-3 rounded-lg border-2 border-red-800/60 transition-all duration-300"
                style={{
                  fontFamily: '"Cinzel", serif', 
                  fontWeight: '600', 
                  fontSize: '16px',
                  boxShadow: '0 4px 15px rgba(139, 0, 0, 0.3), inset 0 1px 3px rgba(139, 0, 0, 0.2)',
                  textShadow: '0 0 8px rgba(139, 0, 0, 0.5)'
                }}
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-red-400 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  'Send'
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Royal decorative elements */}
        <div className="mt-8 text-center">
          <div className="flex justify-center items-center space-x-6 text-gray-500">
            <div className="w-24 h-px bg-gradient-to-r from-transparent to-gray-600"></div>
            <span className="text-sm italic font-serif">"I have crossed oceans of time to find you"</span>
            <div className="w-24 h-px bg-gradient-to-l from-transparent to-gray-600"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VampireChatRoyal