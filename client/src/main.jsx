import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

// Import the full app with error handling
const App = React.lazy(() => import('./App.jsx'))

// Loading component
const Loading = () => (
  <div style={{ 
    padding: '20px', 
    backgroundColor: 'black', 
    color: 'white', 
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Arial, sans-serif'
  }}>
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '4rem', marginBottom: '20px' }}>👻</div>
      <h2>Awakening the Digital Spirits...</h2>
      <p>Loading the Graveyard of the Forgotten Web</p>
    </div>
  </div>
)

// Error boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('App Error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '20px', 
          backgroundColor: 'black', 
          color: 'red', 
          minHeight: '100vh',
          fontFamily: 'Arial, sans-serif'
        }}>
          <h1>💀 Something went wrong in the digital graveyard! 💀</h1>
          <p>Error: {this.state.error?.message}</p>
          <p>Check the console for more details.</p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 20px',
              backgroundColor: '#8B0000',
              color: 'white',
              border: '2px solid #ff0000',
              borderRadius: '5px',
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            👻 Resurrect App
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <React.Suspense fallback={<Loading />}>
        <App />
      </React.Suspense>
    </ErrorBoundary>
  </React.StrictMode>,
)