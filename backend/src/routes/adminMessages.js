const express = require("express");
const adminAuth = require("../middleware/adminAuth");
const { supabase } = require("../services/supabase");

const router = express.Router();

// Get all messages
router.get("/", adminAuth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return res.status(500).json({ error: error.message });
    }
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ error: "Server error." });
  }
});

// Delete a message
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("messages")
      .delete()
      .eq("id", req.params.id)
      .select("*")
      .maybeSingle();

    if (error) {
      return res.status(500).json({ error: error.message });
    }
    if (!data) {
      return res.status(404).json({ error: "Message not found" });
    }

    return res.json({ message: "Message deleted" });
  } catch (err) {
    return res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
