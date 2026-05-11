const express = require("express");
const { randomUUID } = require("crypto");
const { supabase } = require("../services/supabase");

const router = express.Router();

// Contact form submission
router.post("/", async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }
  try {
    const { error } = await supabase.from("messages").insert([
      {
        id: randomUUID(),
        name,
        email,
        message,
      },
    ]);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.json({ success: true, message: "Contact form submitted." });
  } catch (err) {
    return res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
