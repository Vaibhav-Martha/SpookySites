import React from 'react'

const MySpaceWidgetPanel = ({ currentTheme, setCurrentTheme, activeWidgets, setActiveWidgets }) => {
  const themes = [
    { id: 'bloody-wallpaper', name: 'Bloody Wallpaper', color: 'bg-red-800' },
    { id: 'haunted-corridor', name: 'Haunted Corridor', color: 'bg-purple-800' },
    { id: 'spider-web-blackout', name: 'Spider Web Blackout', color: 'bg-black' },
    { id: 'cursed-neon-grid', name: 'Cursed Neon Grid', color: 'bg-green-800' },
    { id: 'pumpkin-inferno', name: 'Pumpkin Inferno', color: 'bg-orange-800' },
    { id: 'foggy-cemetery-night', name: 'Foggy Cemetery Night', color: 'bg-gray-800' }
  ]

  const widgets = [
    { id: 'nowPlaying', name: 'Flickering "Now Playing"', icon: '🎵' },
    { id: 'friendBox', name: 'Draggable Friend Box', icon: '👥' },
    { id: 'pixelHeart', name: 'Beating Pixel Heart', icon: '❤️' },
    { id: 'crawlingSpider', name: 'Crawling Spider', icon: '🕷️' },
    { id: 'hellfireBorder', name: 'Hellfire Border Mode', icon: '🔥' },
    { id: 'ghostPopups', name: 'Ghost Pop-up Warnings', icon: '👻' }
  ]

  const toggleWidget = (widgetId) => {
    setActiveWidgets(prev => ({
      ...prev,
      [widgetId]: !prev[widgetId]
    }))
  }

  return (
    <div className="bg-black/70 rounded-lg p-4 border-2 border-green-500 shadow-lg">
      <h3 className="text-green-400 font-bold mb-4 text-center">🎨 Spooky Customization Panel</h3>
      
      {/* Background Themes */}
      <div className="mb-6">
        <h4 className="text-green-300 font-semibold mb-3">Background Themes:</h4>
        <div className="space-y-2">
          {themes.map(theme => (
            <button
              key={theme.id}
              onClick={() => setCurrentTheme(theme.id)}
              className={`
                w-full text-left p-2 rounded border transition-all duration-200
                ${currentTheme === theme.id 
                  ? 'border-green-400 bg-green-900/50 text-green-200' 
                  : 'border-gray-600 bg-gray-800/50 text-gray-300 hover:border-green-500'
                }
              `}
            >
              <div className="flex items-center space-x-2">
                <div className={`w-4 h-4 rounded ${theme.color} border border-gray-500`}></div>
                <span className="text-sm">{theme.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Widget Manager */}
      <div>
        <h4 className="text-green-300 font-semibold mb-3">Widget Manager:</h4>
        <div className="space-y-2">
          {widgets.map(widget => (
            <label
              key={widget.id}
              className="flex items-center space-x-3 p-2 rounded hover:bg-gray-800/50 cursor-pointer transition-colors"
            >
              <input
                type="checkbox"
                checked={activeWidgets[widget.id]}
                onChange={() => toggleWidget(widget.id)}
                className="w-4 h-4 text-green-500 bg-gray-800 border-gray-600 rounded focus:ring-green-500"
              />
              <span className="text-lg">{widget.icon}</span>
              <span className="text-sm text-gray-300">{widget.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mt-4 p-3 bg-gray-900/50 rounded border border-gray-600">
        <p className="text-xs text-gray-400 text-center">
          💀 Customize your haunted profile just like the old MySpace days! 💀
        </p>
      </div>
    </div>
  )
}

export default MySpaceWidgetPanel