import { io } from 'socket.io-client'

class SocketService {
  constructor() {
    this.socket = null
    this.isConnected = false
  }

  connect() {
    if (!this.socket) {
      this.socket = io('http://localhost:5001')
      
      this.socket.on('connect', () => {
        console.log('👻 Connected to chat server')
        this.isConnected = true
      })
      
      this.socket.on('disconnect', () => {
        console.log('💀 Disconnected from chat server')
        this.isConnected = false
      })
    }
    return this.socket
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
      this.isConnected = false
    }
  }

  joinRoom(room) {
    if (this.socket) {
      this.socket.emit('join-room', room)
    }
  }

  sendMessage(room, message, username, avatar) {
    if (this.socket) {
      this.socket.emit('send-message', {
        room,
        message,
        username,
        avatar,
        id: Date.now()
      })
    }
  }

  onMessage(callback) {
    if (this.socket) {
      this.socket.on('receive-message', callback)
    }
  }

  startTyping(room, username) {
    if (this.socket) {
      this.socket.emit('typing', { room, username })
    }
  }

  stopTyping(room, username) {
    if (this.socket) {
      this.socket.emit('stop-typing', { room, username })
    }
  }

  onTyping(callback) {
    if (this.socket) {
      this.socket.on('user-typing', callback)
    }
  }

  onStopTyping(callback) {
    if (this.socket) {
      this.socket.on('user-stop-typing', callback)
    }
  }

  removeAllListeners() {
    if (this.socket) {
      this.socket.removeAllListeners()
    }
  }
}

export default new SocketService()