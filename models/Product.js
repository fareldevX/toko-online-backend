import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  imageUrl: String,
  title: { type: String, required: true },
  description: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Product", productSchema);
