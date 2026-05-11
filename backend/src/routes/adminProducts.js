const express = require("express");
const { randomUUID } = require("crypto");
const adminAuth = require("../middleware/adminAuth");
const { supabase } = require("../services/supabase");

const router = express.Router();

// Create product
router.post("/", adminAuth, async (req, res) => {
  try {
    const payload = {
      id: randomUUID(),
      name: req.body.name,
      price: req.body.price,
      description: req.body.description || null,
      image: req.body.image || null,
    };

    const { data, error } = await supabase
      .from("products")
      .insert([payload])
      .select("*")
      .maybeSingle();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(201).json(data);
  } catch (err) {
    return res.status(400).json({ error: "Server error." });
  }
});

// Update product
router.put("/:id", adminAuth, async (req, res) => {
  try {
    const updatePayload = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      image: req.body.image,
    };

    const { data, error } = await supabase
      .from("products")
      .update(updatePayload)
      .eq("id", req.params.id)
      .select("*")
      .maybeSingle();

    if (error) {
      return res.status(400).json({ error: error.message });
    }
    if (!data) {
      return res.status(404).json({ error: "Product not found" });
    }

    return res.json(data);
  } catch (err) {
    return res.status(400).json({ error: "Server error." });
  }
});

// Delete product
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .delete()
      .eq("id", req.params.id)
      .select("*")
      .maybeSingle();

    if (error) {
      return res.status(400).json({ error: error.message });
    }
    if (!data) {
      return res.status(404).json({ error: "Product not found" });
    }

    return res.json({ message: "Product deleted" });
  } catch (err) {
    return res.status(400).json({ error: "Server error." });
  }
});

module.exports = router;
