const express = require('express');
const router = express.Router();

// Sample products data
const products = [
  { id: 1, name: 'Classic Shirt', price: 120, description: 'Timeless elegance.' },
  { id: 2, name: 'Luxury Polo', price: 150, description: 'Understated luxury.' }
];

// Get all products
router.get('/', (req, res) => {
  res.json(products);
});

// Get product by ID
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

module.exports = router;
