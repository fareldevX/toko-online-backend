import express from "express";
import ApiKey from "../models/ApiKey.js";
import { generateApiKey } from "../utils/generateKey.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const input = new ApiKey({
      ...req.body,
      key: generateApiKey(),
    });
    const apiKey = await input.save();

    res.status(201).json(apiKey);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed get api key!" });
  }
});

export default router;
