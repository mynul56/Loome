
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

app.use(express.json());


// Import routes
const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');
const ordersRouter = require('./routes/orders');
const contactRouter = require('./routes/contact');
const authRouter = require('./routes/auth');
const adminAuthRouter = require('./routes/adminAuth');
const adminProductsRouter = require('./routes/adminProducts');
const adminMessagesRouter = require('./routes/adminMessages');

app.get('/', (req, res) => {
  res.send('Loomé backend is running!');
});

// API routes
app.use('/api/products', productsRouter);
app.use('/api/users', usersRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/contact', contactRouter);
app.use('/api/auth', authRouter);
app.use('/api/admin/auth', adminAuthRouter);
app.use('/api/admin/products', adminProductsRouter);
app.use('/api/admin/messages', adminMessagesRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
