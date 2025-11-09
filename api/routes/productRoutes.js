import express from "express";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

import Product from "../models/Product.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/api/product", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (e) {
    console.error("Failed to get product!");
    res.status(500).json({ error: e });
  }
});

router.post("/api/product", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded!" });
    }

    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "products" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    const product = new Product({
      ...req.body,
      imageUrl: uploadResult.secure_url,
    });
    await product.save();

    res.status(201).json(product);
  } catch (e) {
    console.error("Failed to add new product!");
    res.status(500).json({ error: e });
  }
});

export default router;
