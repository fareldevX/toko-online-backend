import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js"; // pastikan file-nya di dalam /api/models/

dotenv.config();

const app = express();

if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI not found in environment variables");
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected..."))
  .catch((e) => console.error("❌ MongoDB connection error:", e));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "🚀 Server Running..." });
});

app.get("/api/product", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

app.post("/api/product", async (req, res) => {
  try {
    const p = new Product(req.body);
    await p.save();
    res.status(201).json(p);
  } catch (e) {
    console.error("Error adding product:", e);
    res.status(500).json({ message: "Failed to add product" });
  }
});

// Vercel tidak butuh app.listen()
export default app;
