const express = require('express');
const router = express.Router();

// Sample users data
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' }
];

// Get all users
router.get('/', (req, res) => {
  res.json(users);
});

// Get user by ID
router.get('/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

module.exports = router;
