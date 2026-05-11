const express = require("express");
const { supabase } = require("../services/supabase");

const router = express.Router();

// Get all users
router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("id, name, email, created_at");

    if (error) {
      return res.status(500).json({ error: error.message });
    }
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ error: "Server error." });
  }
});

// Get user by ID
router.get("/:id", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("id, name, email, created_at")
      .eq("id", req.params.id)
      .maybeSingle();

    if (error) {
      return res.status(500).json({ error: error.message });
    }
    if (!data) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json(data);
  } catch (err) {
    return res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
