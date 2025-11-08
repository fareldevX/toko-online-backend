import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product.js";

dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected..."))
  .catch((e) => console.log(e));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Server Running..." });
});

app.get("/api/product", async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
});

app.post("/api/product", async (req, res) => {
  try {
    const p = new Product(req.body);
    await p.save();

    res.status(201).json(p);
  } catch (e) {
    console.log(e);
  }
});

export default app;
