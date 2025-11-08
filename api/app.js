import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import Product from "./models/Product.js";

dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected..."))
  .catch((e) => console.log("Failed to Connection MongoDB!, " + e));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ status: "Server is Running!" });
});

app.get("/api/product", async (req, res) => {
  try {
    const product = await Product.find().sort({ createdAt: -1 });
    res.json(product);
  } catch (e) {
    console.error("Failed to get product, " + e);
  }
});

export default app;
