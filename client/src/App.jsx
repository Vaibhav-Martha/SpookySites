import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Auth from './pages/Auth'
import GraveyardHome from './pages/GraveyardHome'
import Orkut from './pages/OrkutOriginalDesign'
import MySpace from './pages/MySpaceWorking'
import GeoCities from './pages/GeoCitiesOriginalDesign'
import VampireChat from './pages/VampireChatRoyal'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Navigate to="/auth" replace />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/graveyard" element={
              <ProtectedRoute>
                <GraveyardHome />
              </ProtectedRoute>
            } />
            <Route path="/orkut" element={
              <ProtectedRoute>
                <Orkut />
              </ProtectedRoute>
            } />
            <Route path="/myspace" element={
              <ProtectedRoute>
                <MySpace />
              </ProtectedRoute>
            } />
            <Route path="/geocities" element={
              <ProtectedRoute>
                <GeoCities />
              </ProtectedRoute>
            } />
            <Route path="/vampire-chat" element={
              <ProtectedRoute>
                <VampireChat />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App