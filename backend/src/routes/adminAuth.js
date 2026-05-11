const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { randomUUID } = require("crypto");
const { supabase } = require("../services/supabase");
const router = express.Router();

// Register admin
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }
  try {
    const { data: existingAdmin, error: lookupError } = await supabase
      .from("admins")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (lookupError) {
      return res.status(500).json({ error: lookupError.message });
    }
    if (existingAdmin) {
      return res.status(400).json({ error: "Email already in use." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const payload = {
      id: randomUUID(),
      name,
      email,
      password: hashedPassword,
    };

    const { error } = await supabase.from("admins").insert([payload]);
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(201).json({ message: "Admin registered successfully." });
  } catch (err) {
    return res.status(500).json({ error: "Server error." });
  }
});

// Admin login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }
  try {
    const { data: admin, error } = await supabase
      .from("admins")
      .select("id, name, email, password")
      .eq("email", email)
      .maybeSingle();

    if (error) {
      return res.status(500).json({ error: error.message });
    }
    if (!admin) {
      return res.status(400).json({ error: "Invalid credentials." });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials." });
    }
    const token = jwt.sign(
      { adminId: admin.id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );
    return res.json({
      token,
      admin: { id: admin.id, name: admin.name, email: admin.email },
    });
  } catch (err) {
    return res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
