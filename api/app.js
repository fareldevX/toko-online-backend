import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import { setCloudinary } from "./config/cloudinaryConfig.js";
import productRoutes from "./routes/productRoutes.js";
import apiKeyRoutes from "./routes/apiKeyRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import { checkApiKey } from "./middleware/checkApiKey.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();
setCloudinary();

app.get("/", (req, res) => {
  res.json({ status: "Server is Running!" });
});

app.use("/api/key", apiKeyRoutes);
app.use("/api/product", checkApiKey, productRoutes);
app.use("/api/contact", contactRoutes);

export default app;

// app.listen(3000, () => console.log("Server is Running..."));
