const jwt = require('jsonwebtoken');

// Verify JWT token middleware
exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Check if user is POS role
exports.isPOS = (req, res, next) => {
  if (req.user.role !== 'POS') {
    return res.status(403).json({ error: 'Access denied. POS role required.' });
  }
  next();
};

// Check if user is CLIENT role
exports.isClient = (req, res, next) => {
  if (req.user.role !== 'CLIENT') {
    return res.status(403).json({ error: 'Access denied. CLIENT role required.' });
  }
  next();
};