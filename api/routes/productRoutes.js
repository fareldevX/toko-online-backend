import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

router.get("/api/product", async (req, res) => {
  try {
    const product = await Product.find().sort({ createdAt: -1 });
    res.json(product);
  } catch (e) {
    console.error("Failed to get product, " + e);
  }
});

export default router;
