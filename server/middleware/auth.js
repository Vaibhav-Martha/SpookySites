const jwt = require('jsonwebtoken')

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1] // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ 
      error: 'Access denied - No token provided',
      message: 'The digital spirits require authentication to enter the graveyard 👻'
    })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    return res.status(403).json({ 
      error: 'Invalid token',
      message: 'Your digital soul has been corrupted. Please sign in again 💀'
    })
  }
}

module.exports = { authenticateToken }