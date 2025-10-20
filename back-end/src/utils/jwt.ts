import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const gerarToken = (payload: object) => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });
};