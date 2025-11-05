import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const message = new Contact(req.body);
  await message.save();

  res.status(201).json({ ok: true });
});

export default router;
