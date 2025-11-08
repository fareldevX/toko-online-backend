import mongoose, { Schema } from "mongoose";

const schemaPhoto = new Schema({
  name: String,
  imageUrl: String,
});

export default mongoose.model("Photo", schemaPhoto);
