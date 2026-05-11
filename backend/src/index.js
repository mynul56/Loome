require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.warn(
    "Supabase env vars are missing; check SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
  );
} else {
  console.log("Supabase configured.");
}

const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim())
  : [];

app.use(
  cors({
    origin: allowedOrigins.length ? allowedOrigins : undefined,
  }),
);
app.use(express.json());

// Import routes
const productsRouter = require("./routes/products");
const usersRouter = require("./routes/users");
const ordersRouter = require("./routes/orders");
const contactRouter = require("./routes/contact");
const authRouter = require("./routes/auth");
const adminAuthRouter = require("./routes/adminAuth");
const adminProductsRouter = require("./routes/adminProducts");
const adminMessagesRouter = require("./routes/adminMessages");
const mediaRouter = require("./routes/media");

app.get("/", (req, res) => {
  res.send("Loomé backend is running!");
});

// API routes
app.use("/api/products", productsRouter);
app.use("/api/users", usersRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/contact", contactRouter);
app.use("/api/auth", authRouter);
app.use("/api/admin/auth", adminAuthRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/messages", adminMessagesRouter);
app.use("/api/media", mediaRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
