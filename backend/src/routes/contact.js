const express = require('express');
const router = express.Router();


const Message = require('../models/message');

// Contact form submission
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  try {
    const newMessage = new Message({ name, email, message });
    await newMessage.save();
    res.json({ success: true, message: 'Contact form submitted.' });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router;
