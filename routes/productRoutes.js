import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

router.get("/api/product", async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
});

router.post("/api/product", async (req, res) => {
  try {
    const p = new Product(req.body);
    await p.save();

    res.status(201).json(p);
  } catch (e) {
    console.log(e);
  }
});

export default router;
