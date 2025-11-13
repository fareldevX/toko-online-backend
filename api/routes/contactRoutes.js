import express from "express";
import { body, validationResult } from "express-validator";
import Contact from "../models/Contact.js";

const router = express.Router();

router.post(
  "/",
  body("name").notEmpty().withMessage("Name is required!"),
  body("email").isEmail().withMessage("Email invalid!"),
  body("message").notEmpty().withMessage("Message id required!"),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json(errors.array());

      const newMessage = new Contact(req.body);
      await newMessage.save();

      res.json(newMessage);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed send message!" });
    }
  }
);

export default router;
