const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Simple hardcoded admin login for Secretariat leads
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Default admin credentials (Can be changed in production)
  if (username === 'admin' && password === 'sanskriti2026') {
    const token = jwt.sign(
      { username: 'admin', role: 'Secretariat' },
      process.env.JWT_SECRET || 'sanskriti_iuu_secret_key_2026',
      { expiresIn: '24h' }
    );
    return res.json({ token, message: 'Authentication successful' });
  }

  return res.status(401).json({ message: 'Invalid admin credentials' });
});

module.exports = router;