import mongoose, { Schema } from "mongoose";

const schemaApiKey = new Schema({
  key: {
    type: String,
    required: true,
    unique: true,
  },
  owner: { type: String, required: true },
  tier: {
    type: String,
    enum: ["free", "pro"],
    default: "free",
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("ApiKey", schemaApiKey);
