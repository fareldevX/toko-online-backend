import mongoose, { Schema } from "mongoose";

const schemaProduct = new Schema({
  title: { type: String, required: true },
  description: String,
  imageUrl: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Product", schemaProduct);
