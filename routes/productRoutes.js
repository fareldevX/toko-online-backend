import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
});

router.post("/", async (req, res) => {
  const p = new Product(req.body);
  await p.save();

  res.status(201).json(p);
});

export default router;
