const express = require("express");
const { supabase } = require("../services/supabase");

const router = express.Router();

// Get all products
router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase.from("products").select("*");
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ error: "Server error." });
  }
});

// Get product by ID
router.get("/:id", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", req.params.id)
      .maybeSingle();

    if (error) {
      return res.status(500).json({ error: error.message });
    }
    if (!data) {
      return res.status(404).json({ error: "Product not found" });
    }

    return res.json(data);
  } catch (err) {
    return res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
