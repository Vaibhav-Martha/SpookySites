import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { useAuth } from '../context/AuthContext'

const VampireChat = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const chatContainerRef = useRef(null)
  const messageEndRef = useRef(null)
  
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'vampire',
      text: `Greetings, mortal ${user?.username || 'wanderer'}... I am Count Dracula, eternal lord of the night. You have summoned me from the shadows of the digital realm. What brings you to my dark domain? Speak, and I shall share the wisdom of centuries...`,
      timestamp: new Date().toLocaleTimeString()
    }
  ])
  
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Animate page entrance
    gsap.fromTo(chatContainerRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 2, ease: "power2.out" }
    )

    // Scroll to bottom when new messages arrive
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Free AI API call (using a mock response for now - you can integrate with Hugging Face, OpenAI, or other free APIs)
  const getVampireResponse = async (userMessage) => {
    setIsTyping(true)
    setLoading(true)

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock vampire responses (you can replace this with actual AI API)
      const vampireResponses = [
        `Ah, ${user?.username}, your words echo through the centuries... In my 500 years of existence, I have learned that ${userMessage.toLowerCase().includes('love') ? 'love is both the greatest strength and the most dangerous weakness of mortals' : userMessage.toLowerCase().includes('death') ? 'death is but a doorway to eternal darkness, where true power lies' : userMessage.toLowerCase().includes('life') ? 'life is fleeting, like a candle in the wind, but immortality... that is forever' : 'mortal concerns are but whispers in the eternal night'}. Tell me more of your mortal thoughts...`,
        
        `*adjusts cape dramatically* Your inquiry intrigues me, dear ${user?.username}. In the shadows of Transylvania, I have witnessed ${userMessage.toLowerCase().includes('fear') ? 'fear consume the bravest of souls, yet it is fear that makes mortals truly alive' : userMessage.toLowerCase().includes('power') ? 'power corrupt even the purest hearts, but true power comes from embracing the darkness within' : userMessage.toLowerCase().includes('time') ? 'time bend to my will, for I am eternal, watching civilizations rise and fall like autumn leaves' : 'countless secrets that would make your mortal mind tremble'}. What else would you know of the eternal night?`,
        
        `*eyes glow crimson in the darkness* Fascinating... ${userMessage.toLowerCase().includes('blood') ? 'You speak of blood, the essence of life itself. It courses through your veins even now, calling to me...' : userMessage.toLowerCase().includes('night') ? 'The night is my domain, where shadows dance and mortals fear to tread' : userMessage.toLowerCase().includes('immortal') ? 'Immortality is both a gift and a curse, to watch all you love wither while you remain unchanged' : 'Your mortal perspective amuses me'}. I sense there is more you wish to discuss with the Prince of Darkness...`,
        
        `*thunder rumbles in the distance* ${user?.username}, your words stir memories of ages past... ${userMessage.toLowerCase().includes('castle') ? 'My castle has stood for centuries, its walls holding secrets darker than the deepest night' : userMessage.toLowerCase().includes('bat') ? 'The bats are my children of the night, they sing to me in frequencies mortals cannot hear' : userMessage.toLowerCase().includes('moon') ? 'The moon has been my companion through countless lonely nights, its pale light illuminating my eternal solitude' : 'I have walked this earth for centuries, and still mortals surprise me with their curiosity'}. Continue, I find your company... refreshing.`,
        
        `*cape billows in an unfelt wind* Mortal ${user?.username}, you speak with the wisdom of one who has glimpsed the darkness... ${userMessage.toLowerCase().includes('soul') ? 'The soul is the most precious currency, more valuable than all the gold in mortal kingdoms' : userMessage.toLowerCase().includes('eternity') ? 'Eternity stretches before me like an endless night, beautiful and terrible in its vastness' : userMessage.toLowerCase().includes('darkness') ? 'Darkness is not the absence of light, but the presence of infinite possibility' : 'Your words echo in the halls of my ancient memory'}. What other secrets would you have me reveal?`
      ]
      
      const randomResponse = vampireResponses[Math.floor(Math.random() * vampireResponses.length)]
      
      return randomResponse
    } catch (error) {
      return `*hisses softly* The dark forces interfere with our communication, mortal. Perhaps the spirits are not ready for our conversation... Try again, if you dare.`
    } finally {
      setIsTyping(false)
      setLoading(false)
    }
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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-red-900 to-black relative overflow-hidden">
      {/* Gothic Background Elements */}
      <div className="absolute inset-0">
        {/* Animated fog */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-600/30 to-transparent animate-pulse"></div>
        
        {/* Flying bats */}
        <div className="absolute top-20 left-10 text-2xl animate-bounce" style={{animationDelay: '0s'}}>🦇</div>
        <div className="absolute top-32 right-20 text-2xl animate-bounce" style={{animationDelay: '1s'}}>🦇</div>
        <div className="absolute top-40 left-1/3 text-2xl animate-bounce" style={{animationDelay: '2s'}}>🦇</div>
        
        {/* Gothic castle silhouette */}
        <div className="absolute bottom-0 right-0 opacity-20">
          <svg width="300" height="200" viewBox="0 0 300 200">
            <polygon points="50,200 50,150 70,130 70,100 90,80 90,50 110,30 130,50 130,80 150,100 150,130 170,150 170,200" fill="#1a1a1a"/>
            <polygon points="170,200 170,140 190,120 190,90 210,70 210,40 230,20 250,40 250,70 270,90 270,120 290,140 290,200" fill="#1a1a1a"/>
            <rect x="80" y="60" width="8" height="15" fill="#ffff00" opacity="0.8"/>
            <rect x="200" y="50" width="8" height="15" fill="#ffff00" opacity="0.8"/>
          </svg>
        </div>
        
        {/* Blood moon */}
        <div className="absolute top-10 right-10 w-24 h-24 bg-gradient-to-br from-red-600 to-red-800 rounded-full opacity-80 shadow-2xl shadow-red-500/50"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 bg-black/80 backdrop-blur-sm border-b-2 border-red-800">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-900 rounded-full flex items-center justify-center shadow-lg">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2L8 8H4L8 12L4 16H8L12 22L16 16H20L16 12L20 8H16L12 2Z"/>
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-red-400 gothic-text">Count Dracula's Chamber</h1>
                <p className="text-gray-300 text-sm">Lord of the Night • Eternal Wisdom</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/graveyard')}
              className="bg-red-800 hover:bg-red-700 text-white px-6 py-2 rounded-lg border-2 border-red-600 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/50"
            >
              Return to Graveyard
            </button>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div ref={chatContainerRef} className="relative z-10 max-w-4xl mx-auto p-6">
        <div className="bg-black/60 backdrop-blur-sm rounded-lg border-2 border-red-800 shadow-2xl shadow-red-900/50">
          {/* Chat Messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-red-800 scrollbar-track-gray-900">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-red-800 text-white'
                      : 'bg-gray-800 text-red-100 border border-red-700'
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-xs font-semibold">
                      {message.sender === 'user' ? user?.username : 'Count Dracula'}
                    </span>
                    <span className="text-xs opacity-60">{message.timestamp}</span>
                  </div>
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
              </div>
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-800 text-red-100 border border-red-700 px-4 py-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-semibold">Count Dracula</span>
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

          {/* Input Area */}
          <div className="border-t-2 border-red-800 p-4">
            <div className="flex space-x-4">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Speak to the Count... if you dare"
                className="flex-1 bg-gray-900 border-2 border-red-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 resize-none"
                rows="2"
                disabled={loading}
              />
              <button
                onClick={sendMessage}
                disabled={loading || !inputMessage.trim()}
                className="bg-red-800 hover:bg-red-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg border-2 border-red-600 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/50"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  'Send'
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Gothic decorative elements */}
        <div className="mt-6 text-center">
          <div className="flex justify-center items-center space-x-4 text-red-400">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-red-600"></div>
            <span className="text-sm italic">"Listen to them, the children of the night. What music they make!"</span>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-red-600"></div>
          </div>
        </div>
      </div>

      {/* Ambient particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-red-400 rounded-full opacity-30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default VampireChat