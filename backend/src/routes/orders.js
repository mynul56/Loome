const express = require("express");
const { supabase } = require("../services/supabase");

const router = express.Router();

const normalizeOrder = (order) => ({
  id: order.id,
  userId: order.user_id,
  productId: order.product_id,
  quantity: order.quantity,
  createdAt: order.created_at,
});

// Get all orders
router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase.from("orders").select("*");
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    return res.json((data || []).map(normalizeOrder));
  } catch (err) {
    return res.status(500).json({ error: "Server error." });
  }
});

// Get order by ID
router.get("/:id", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("id", req.params.id)
      .maybeSingle();

    if (error) {
      return res.status(500).json({ error: error.message });
    }
    if (!data) {
      return res.status(404).json({ error: "Order not found" });
    }

    return res.json(normalizeOrder(data));
  } catch (err) {
    return res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
