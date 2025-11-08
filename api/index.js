import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import Product from "../models/Product.js";
import Photo from "../models/Photo.js";

dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected..."))
  .catch((e) => console.log(e));

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

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

app.post("/upload", upload.single("image"), async (req, res) => {
  const imageUrl = `http://localhost:3000/uploads/${req.file.filename}`;

  const photo = new Photo({
    name: req.body.name,
    imageUrl: imageUrl,
  });
  await photo.save();

  res.status(201).json(photo);
});

export default app;
