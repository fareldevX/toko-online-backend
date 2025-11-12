import crypto from "crypto";

export const generateApiKey = () => {
  return "api_" + crypto.randomBytes(12).toString("hex");
};
