import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const GeoCitiesOriginalDesign = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  
  const [visitorCount, setVisitorCount] = useState(Math.floor(Math.random() * 100000) + 50000)
  const [guestbook, setGuestbook] = useState([
    { name: 'WebSurfer99', message: 'Cool site! Love the animated GIFs! 😎', date: '12/03/2024' },
    { name: 'HTMLMaster', message: 'Awesome homepage! How did you make the text scroll?', date: '12/02/2024' },
    { name: 'PixelArt2000', message: 'Your under construction gif is the best! 🚧', date: '12/01/2024' }
  ])
  const [newGuestEntry, setNewGuestEntry] = useState({ name: '', message: '' })
  const [backgroundColor, setBackgroundColor] = useState('#000080')
  const [textColor, setTextColor] = useState('#FFFF00')
  const [showConstruction, setShowConstruction] = useState(true)

  useEffect(() => {
    // Increment visitor count occasionally
    const interval = setInterval(() => {
      setVisitorCount(prev => prev + Math.floor(Math.random() * 3))
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  const addGuestbookEntry = () => {
    if (newGuestEntry.name.trim() && newGuestEntry.message.trim()) {
      const entry = {
        name: newGuestEntry.name,
        message: newGuestEntry.message,
        date: new Date().toLocaleDateString()
      }
      setGuestbook([entry, ...guestbook])
      setNewGuestEntry({ name: '', message: '' })
    }
  }

  return (
    <div 
      className="min-h-screen"
      style={{ 
        backgroundColor,
        color: textColor,
        fontFamily: 'Times New Roman, serif',
        backgroundImage: 'url("data:image/gif;base64,R0lGODlhEAAQAPIAAAAAAP///wAAAPj4+Dg4OLi4uAAAAAAAACH5BAAAAAAALAAAAAAQABAAAAMlWLrc/jDKSVe4OOvNu/9gqARDSRBHegyGMahqO4R0bQcjRMdUAAA7")',
        backgroundRepeat: 'repeat'
      }}
    >
      {/* Authentic GeoCities Header */}
      <div style={{ backgroundColor: '#C0C0C0', border: '2px outset #C0C0C0', padding: '4px' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img 
              src="data:image/gif;base64,R0lGODlhEAAQAPIAAAAAAP///wAAAPj4+Dg4OLi4uAAAAAAAACH5BAAAAAAALAAAAAAQABAAAAMlWLrc/jDKSVe4OOvNu/9gqARDSRBHegyGMahqO4R0bQcjRMdUAAA7" 
              alt="GeoCities" 
              className="w-6 h-6"
            />
            <span style={{ color: '#000080', fontWeight: 'bold', fontSize: '16px' }}>
              GeoCities - {user?.username}'s Homepage
            </span>
            {showConstruction && (
              <img 
                src="data:image/gif;base64,R0lGODlhEAAQAPIAAAAAAP///wAAAPj4+Dg4OLi4uAAAAAAAACH5BAAAAAAALAAAAAAQABAAAAMlWLrc/jDKSVe4OOvNu/9gqARDSRBHegyGMahqO4R0bQcjRMdUAAA7" 
                alt="Under Construction" 
                className="w-20 h-4"
              />
            )}
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => navigate('/graveyard')}
              style={{ 
                backgroundColor: '#008000', 
                color: 'white', 
                border: '2px outset #008000',
                padding: '2px 8px',
                fontSize: '12px'
              }}
            >
              GRAVEYARD
            </button>
            <button
              onClick={logout}
              style={{ 
                backgroundColor: '#FF0000', 
                color: 'white', 
                border: '2px outset #FF0000',
                padding: '2px 8px',
                fontSize: '12px'
              }}
            >
              LOGOUT
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4">
        {/* Welcome Banner */}
        <center>
          <table 
            border="3" 
            cellPadding="10" 
            cellSpacing="0" 
            style={{ 
              backgroundColor: '#FFFF00', 
              borderColor: '#FF0000',
              marginBottom: '20px',
              width: '100%'
            }}
          >
            <tr>
              <td align="center">
                <font size="6" color="#FF0000">
                  <b>
                    <blink>*** WELCOME TO {user?.username?.toUpperCase()}'S HOMEPAGE! ***</blink>
                  </b>
                </font>
                <br />
                <marquee behavior="scroll" direction="left" style={{ color: '#0000FF', fontSize: '18px' }}>
                  🌟 Thanks for visiting my awesome site! 🌟 Don't forget to sign my guestbook! 🌟
                </marquee>
                <br />
                <font size="4" color="#008000">
                  <b>You are visitor number: </b>
                  <img 
                    src="data:image/gif;base64,R0lGODlhEAAQAPIAAAAAAP///wAAAPj4+Dg4OLi4uAAAAAAAACH5BAAAAAAALAAAAAAQABAAAAMlWLrc/jDKSVe4OOvNu/9gqARDSRBHegyGMahqO4R0bQcjRMdUAAA7" 
                    alt="counter"
                    style={{ backgroundColor: '#000000', color: '#00FF00', padding: '2px 8px', fontFamily: 'monospace' }}
                  />
                  <span style={{ backgroundColor: '#000000', color: '#00FF00', padding: '2px 8px', fontFamily: 'monospace' }}>
                    {visitorCount.toString().padStart(6, '0')}
                  </span>
                </font>
              </td>
            </tr>
          </table>
        </center>

        {/* Site Controls */}
        <table 
          border="2" 
          cellPadding="5" 
          style={{ 
            backgroundColor: '#C0C0C0', 
            borderColor: '#808080',
            marginBottom: '20px',
            float: 'right',
            width: '200px'
          }}
        >
          <tr>
            <td>
              <font size="3" color="#000080"><b>SITE CONTROLS</b></font>
              <hr />
              <font size="2">
                Background Color:<br />
                <select 
                  value={backgroundColor} 
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  style={{ width: '100%', marginBottom: '5px' }}
                >
                  <option value="#000080">Navy Blue</option>
                  <option value="#800080">Purple</option>
                  <option value="#008000">Green</option>
                  <option value="#FF0000">Red</option>
                  <option value="#000000">Black</option>
                </select>
                
                Text Color:<br />
                <select 
                  value={textColor} 
                  onChange={(e) => setTextColor(e.target.value)}
                  style={{ width: '100%', marginBottom: '5px' }}
                >
                  <option value="#FFFF00">Yellow</option>
                  <option value="#FFFFFF">White</option>
                  <option value="#00FF00">Lime</option>
                  <option value="#FF00FF">Magenta</option>
                  <option value="#00FFFF">Cyan</option>
                </select>

                <input 
                  type="checkbox" 
                  checked={showConstruction}
                  onChange={(e) => setShowConstruction(e.target.checked)}
                />
                Under Construction
              </font>
            </td>
          </tr>
        </table>

        {/* Main Content Table */}
        <table border="0" cellPadding="10" width="70%">
          <tr>
            <td>
              {/* About Me */}
              <table 
                border="3" 
                cellPadding="8" 
                style={{ 
                  backgroundColor: '#800080', 
                  borderColor: '#FFFF00',
                  marginBottom: '20px',
                  width: '100%'
                }}
              >
                <tr>
                  <td>
                    <center>
                      <font size="5" color="#FFFF00">
                        <b>*** ABOUT ME ***</b>
                      </font>
                    </center>
                    <hr color="#FFFF00" />
                    <font size="3" color="#FFFFFF">
                      <b>Name:</b> {user?.username}<br />
                      <b>Age:</b> {Math.floor(Math.random() * 30) + 18}<br />
                      <b>Location:</b> Cyberspace, USA<br />
                      <b>Occupation:</b> Web Designer & HTML Wizard<br />
                      <b>Hobbies:</b> Making cool websites, collecting animated GIFs, chatting on IRC<br />
                      <b>Favorite Browser:</b> Netscape Navigator 4.0<br />
                      <b>Email:</b> {user?.email}<br />
                      <br />
                      <i>Welcome to my corner of the World Wide Web! I love creating awesome 
                      homepages and sharing them with the world. This site is always under 
                      construction because I'm constantly adding new cool stuff!</i>
                    </font>
                  </td>
                </tr>
              </table>

              {/* My Interests */}
              <table 
                border="3" 
                cellPadding="8" 
                style={{ 
                  backgroundColor: '#008000', 
                  borderColor: '#FF0000',
                  marginBottom: '20px',
                  width: '100%'
                }}
              >
                <tr>
                  <td>
                    <center>
                      <font size="4" color="#FFFF00">
                        <b><blink>MY INTERESTS & HOBBIES</blink></b>
                      </font>
                    </center>
                    <hr color="#FFFF00" />
                    <font size="2" color="#FFFFFF">
                      <ul>
                        <li>🎵 Music (Alternative Rock, Grunge, Electronic)</li>
                        <li>💻 Web Design & HTML Programming</li>
                        <li>🎮 Video Games (Doom, Quake, SimCity)</li>
                        <li>📺 TV Shows (X-Files, Friends, Seinfeld)</li>
                        <li>🎬 Movies (Sci-Fi, Horror, Comedy)</li>
                        <li>📚 Reading (Fantasy, Science Fiction)</li>
                        <li>🎨 Digital Art & Graphics</li>
                        <li>🌐 Surfing the Web & Discovering Cool Sites</li>
                      </ul>
                    </font>
                  </td>
                </tr>
              </table>

              {/* Cool Links */}
              <table 
                border="3" 
                cellPadding="8" 
                style={{ 
                  backgroundColor: '#FF0000', 
                  borderColor: '#FFFF00',
                  marginBottom: '20px',
                  width: '100%'
                }}
              >
                <tr>
                  <td>
                    <center>
                      <font size="4" color="#FFFF00">
                        <b>COOL LINKS & WEB RINGS</b>
                      </font>
                    </center>
                    <hr color="#FFFF00" />
                    <font size="2" color="#FFFFFF">
                      <a href="#" style={{ color: '#00FFFF' }}>🌟 My Friend's Homepage</a><br />
                      <a href="#" style={{ color: '#00FFFF' }}>🎵 Awesome Music Site</a><br />
                      <a href="#" style={{ color: '#00FFFF' }}>🎮 Cool Games Archive</a><br />
                      <a href="#" style={{ color: '#00FFFF' }}>📺 TV Show Fan Site</a><br />
                      <a href="#" style={{ color: '#00FFFF' }}>🖼️ Free Graphics & GIFs</a><br />
                      <br />
                      <center>
                        <b>WEB RINGS:</b><br />
                        <a href="#" style={{ color: '#FFFF00' }}>[ Prev ]</a> 
                        <a href="#" style={{ color: '#FFFF00' }}>[ Random ]</a> 
                        <a href="#" style={{ color: '#FFFF00' }}>[ Next ]</a><br />
                        <font size="1">HTML Wizards Web Ring</font>
                      </center>
                    </font>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        {/* Guestbook */}
        <center>
          <table 
            border="3" 
            cellPadding="10" 
            style={{ 
              backgroundColor: '#FFFF00', 
              borderColor: '#FF0000',
              marginTop: '20px',
              width: '90%'
            }}
          >
            <tr>
              <td>
                <center>
                  <font size="5" color="#FF0000">
                    <b><blink>*** SIGN MY GUESTBOOK! ***</blink></b>
                  </font>
                </center>
                <hr color="#FF0000" />
                
                {/* Add Entry Form */}
                <table border="1" cellPadding="5" style={{ backgroundColor: '#C0C0C0', margin: '10px auto' }}>
                  <tr>
                    <td>
                      <font size="2" color="#000000">
                        <b>Name:</b><br />
                        <input 
                          type="text" 
                          value={newGuestEntry.name}
                          onChange={(e) => setNewGuestEntry({...newGuestEntry, name: e.target.value})}
                          style={{ width: '200px' }}
                        /><br /><br />
                        <b>Message:</b><br />
                        <textarea 
                          value={newGuestEntry.message}
                          onChange={(e) => setNewGuestEntry({...newGuestEntry, message: e.target.value})}
                          rows="3" 
                          cols="40"
                        ></textarea><br /><br />
                        <input 
                          type="button" 
                          value="SIGN GUESTBOOK!" 
                          onClick={addGuestbookEntry}
                          style={{ 
                            backgroundColor: '#008000', 
                            color: 'white', 
                            border: '2px outset #008000',
                            padding: '4px 12px'
                          }}
                        />
                      </font>
                    </td>
                  </tr>
                </table>

                {/* Guestbook Entries */}
                <font size="2" color="#000080">
                  {guestbook.map((entry, index) => (
                    <div key={index} style={{ 
                      backgroundColor: '#E0E0E0', 
                      border: '1px solid #808080',
                      margin: '5px',
                      padding: '8px',
                      textAlign: 'left'
                    }}>
                      <b>{entry.name}</b> wrote on {entry.date}:<br />
                      <i>"{entry.message}"</i>
                    </div>
                  ))}
                </font>
              </td>
            </tr>
          </table>
        </center>

        {/* Footer */}
        <center style={{ marginTop: '30px' }}>
          <table border="2" cellPadding="5" style={{ backgroundColor: '#C0C0C0' }}>
            <tr>
              <td>
                <font size="2" color="#000080">
                  <b>This site best viewed with:</b><br />
                  Netscape Navigator 4.0 or Internet Explorer 4.0<br />
                  800x600 resolution or higher<br />
                  <br />
                  <i>Last updated: {new Date().toLocaleDateString()}</i><br />
                  © {new Date().getFullYear()} {user?.username} - All rights reserved<br />
                  <br />
                  <marquee width="300" behavior="alternate">
                    <font color="#FF0000">Thanks for visiting!</font>
                  </marquee>
                </font>
              </td>
            </tr>
          </table>
        </center>

        {/* Animated GIFs scattered around */}
        <div style={{ position: 'fixed', top: '100px', left: '10px', fontSize: '24px' }}>
          🌟
        </div>
        <div style={{ position: 'fixed', top: '200px', right: '10px', fontSize: '24px' }}>
          ✨
        </div>
        <div style={{ position: 'fixed', bottom: '100px', left: '50px', fontSize: '24px' }}>
          🎵
        </div>
        <div style={{ position: 'fixed', bottom: '150px', right: '50px', fontSize: '24px' }}>
          💫
        </div>
      </div>
    </div>
  )
}

export default GeoCitiesOriginalDesign