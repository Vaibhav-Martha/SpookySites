import React from 'react'

function TestApp() {
  return (
    <div style={{ padding: '20px', backgroundColor: 'black', color: 'white', minHeight: '100vh' }}>
      <h1>🪦 Test Page - Graveyard App 🪦</h1>
      <p>If you can see this, React is working!</p>
      <p>Current time: {new Date().toLocaleString()}</p>
      <button onClick={() => alert('Button works!')}>Test Button</button>
    </div>
  )
}

export default TestApp