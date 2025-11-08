import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    imageUrl: String,
    title: { type: String, required: true },
    description: String,
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
