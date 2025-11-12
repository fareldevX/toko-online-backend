import ApiKey from "../models/ApiKey.js";

export const checkApiKey = async (req, res, next) => {
  const apiKey = req.header("x-api-key");
  if (!apiKey) return res.status(401).json({ message: "API Key is required!" });

  const keyData = await ApiKey.findOne({ key: apiKey });
  if (!keyData) return res.status(403).json({ message: "Invalid API Key!" });

  req.apiKeyData = keyData;
  next();
};
