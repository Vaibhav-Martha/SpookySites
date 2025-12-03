import React from 'react'

const GeoCitiesGifSelector = ({ activeGifPack, setActiveGifPack, gifPacks }) => {
  return (
    <div className="bg-black border-4 border-green-400 p-4 sticky top-4">
      <h3 className="text-green-400 text-xl font-bold mb-4 text-center animate-flicker">
        🎨 GIF PACK SELECTOR 🎨
      </h3>
      
      <div className="space-y-4">
        {Object.entries(gifPacks).map(([packId, pack]) => (
          <div key={packId} className="border-2 border-gray-600 rounded">
            <button
              onClick={() => setActiveGifPack(packId)}
              className={`
                w-full p-3 text-left transition-all duration-300
                ${activeGifPack === packId 
                  ? 'bg-green-600 text-black border-green-400' 
                  : 'bg-gray-800 text-green-400 hover:bg-gray-700'
                }
              `}
            >
              <div className="font-bold mb-2">{pack.name}</div>
              <div className="flex flex-wrap gap-1">
                {pack.gifs.map((gif, index) => (
                  <span 
                    key={index}
                    className={`text-lg ${gif.animation || ''}`}
                    style={{animationDelay: `${index * 0.2}s`}}
                  >
                    {gif.emoji}
                  </span>
                ))}
              </div>
            </button>
            
            {activeGifPack === packId && (
              <div className="p-3 bg-gray-900 border-t-2 border-green-400">
                <h4 className="text-green-300 font-semibold mb-2">Pack Contents:</h4>
                <div className="space-y-1 text-sm">
                  {pack.gifs.map((gif, index) => (
                    <div key={index} className="flex items-center space-x-2 text-green-200">
                      <span className={gif.animation || ''}>{gif.emoji}</span>
                      <span>{gif.text || gif.type}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-3 bg-red-900 border-2 border-red-500 rounded">
        <h4 className="text-red-300 font-bold mb-2 text-center">⚠️ WARNING ⚠️</h4>
        <p className="text-red-200 text-xs text-center">
          These GIFs may cause severe nostalgia and uncontrollable urge to create more GeoCities pages!
        </p>
      </div>
      
      <div className="mt-4 text-center">
        <div className="animate-bounce text-2xl">🚧</div>
        <p className="text-green-400 text-xs mt-1">
          Classic GeoCities Experience
        </p>
      </div>
    </div>
  )
}

export default GeoCitiesGifSelector