require("dotenv").config();
const mongoose = require("mongoose");
const { supabase } = require("./supabase");
const Admin = require("../models/admin");
const User = require("../models/user");
const Product = require("../models/product");
const Order = require("../models/order");
const Message = require("../models/message");

const CHUNK_SIZE = 500;

const toId = (value) => (value ? value.toString() : null);

const chunk = (rows) => {
  const chunks = [];
  for (let i = 0; i < rows.length; i += CHUNK_SIZE) {
    chunks.push(rows.slice(i, i + CHUNK_SIZE));
  }
  return chunks;
};

const upsertRows = async (table, rows) => {
  if (!rows.length) {
    return;
  }
  const chunks = chunk(rows);
  for (const part of chunks) {
    const { error } = await supabase
      .from(table)
      .upsert(part, { onConflict: "id" });
    if (error) {
      throw new Error(`${table} upsert failed: ${error.message}`);
    }
  }
};

const migrate = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is required for migration.");
  }
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Supabase env vars are missing.");
  }

  await mongoose.connect(process.env.MONGODB_URI);

  const [admins, users, products, orders, messages] = await Promise.all([
    Admin.find().lean(),
    User.find().lean(),
    Product.find().lean(),
    Order.find().lean(),
    Message.find().lean(),
  ]);

  const adminRows = admins.map((admin) => ({
    id: toId(admin._id),
    name: admin.name,
    email: admin.email,
    password: admin.password,
  }));

  const userRows = users.map((user) => ({
    id: toId(user._id),
    name: user.name,
    email: user.email,
    password: user.password,
  }));

  const productRows = products.map((product) => ({
    id: toId(product._id),
    name: product.name,
    price: product.price,
    description: product.description || null,
    image: product.image || null,
  }));

  const orderRows = orders.map((order) => ({
    id: toId(order._id),
    user_id: toId(order.userId),
    product_id: toId(order.productId),
    quantity: order.quantity,
    created_at: order.createdAt || null,
  }));

  const messageRows = messages.map((message) => ({
    id: toId(message._id),
    name: message.name,
    email: message.email,
    message: message.message,
    created_at: message.createdAt || null,
  }));

  await upsertRows("admins", adminRows);
  await upsertRows("users", userRows);
  await upsertRows("products", productRows);
  await upsertRows("orders", orderRows);
  await upsertRows("messages", messageRows);

  await mongoose.disconnect();
};

migrate()
  .then(() => {
    console.log("Migration to Supabase completed.");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Migration failed:", err.message);
    process.exit(1);
  });
