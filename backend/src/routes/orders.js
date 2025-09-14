const express = require('express');
const router = express.Router();

// Sample orders data
const orders = [
  { id: 1, userId: 1, productId: 2, quantity: 1 }
];

// Get all orders
router.get('/', (req, res) => {
  res.json(orders);
});

// Get order by ID
router.get('/:id', (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json(order);
});

module.exports = router;
