const express = require("express");
const multer = require("multer");
const { supabase } = require("../services/supabase");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/upload/product-image",
  upload.single("file"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "Missing file" });
      }

      const filename = `${Date.now()}-${req.file.originalname}`;
      const { error } = await supabase.storage
        .from("product-images")
        .upload(filename, req.file.buffer, {
          contentType: req.file.mimetype,
          upsert: true,
        });

      if (error) {
        return res.status(400).json({ error: error.message });
      }

      return res.json({ path: filename });
    } catch (err) {
      return res.status(500).json({ error: "Upload failed" });
    }
  },
);

router.post("/upload/home-video", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Missing file" });
    }

    const filename = `home/${Date.now()}-${req.file.originalname}`;
    const { error } = await supabase.storage
      .from("home-video")
      .upload(filename, req.file.buffer, {
        contentType: req.file.mimetype,
        upsert: true,
      });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.json({ path: filename });
  } catch (err) {
    return res.status(500).json({ error: "Upload failed" });
  }
});

router.get("/signed/product-image", async (req, res) => {
  try {
    const { path } = req.query;

    if (!path) {
      return res.status(400).json({ error: "Missing path" });
    }

    const { data, error } = await supabase.storage
      .from("product-images")
      .createSignedUrl(path, 60 * 60);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.json({ url: data.signedUrl });
  } catch (err) {
    return res.status(500).json({ error: "Signed URL failed" });
  }
});

router.get("/signed/home-video", async (req, res) => {
  try {
    const { path } = req.query;

    if (!path) {
      return res.status(400).json({ error: "Missing path" });
    }

    const { data, error } = await supabase.storage
      .from("home-video")
      .createSignedUrl(path, 60 * 60);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.json({ url: data.signedUrl });
  } catch (err) {
    return res.status(500).json({ error: "Signed URL failed" });
  }
});

module.exports = router;
