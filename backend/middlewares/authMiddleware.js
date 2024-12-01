const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.verifyToken = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) return res.status(403).json({ message: 'Access denied. No token provided.' });

  const token = authHeader.split(' ')[1]; // Extract the token after "Bearer"
  if (!token) return res.status(403).json({ message: 'Access denied. Token missing.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token using the secret key
    req.user = decoded; // Attach the decoded payload to the request
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
