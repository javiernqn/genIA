const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Mock users database
const mockUsers = [
  { id: 1, email: 'juan@test.com', name: 'Juan', age: 19 },
  { id: 2, email: 'maria@test.com', name: 'Maria', age: 23 },
  { id: 3, email: 'carlos@test.com', name: 'Carlos', age: 28 },
  { id: 4, email: 'ana@test.com', name: 'Ana', age: 32 },
  { id: 5, email: 'pedro@test.com', name: 'Pedro', age: 37 }
];

// Simple login without password
router.post('/login', async (req, res) => {
  try {
    const { email } = req.body;
    
    const user = mockUsers.find(u => u.email === email);
    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login exitoso',
      token,
      user: { id: user.id, email: user.email, name: user.name, age: user.age }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' });
  }
});

module.exports = router;