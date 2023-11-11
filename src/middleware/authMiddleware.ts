import jwt from "jsonwebtoken";
import { NextFunction, Response } from "express";
import { AuthRequest } from "../types";
import { TokenBlacklist } from "../models/token";

const SECRET_KEY = process.env.SECRET_KEY || "";

export const authenticateToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (await TokenBlacklist.tokenBlacklisted(token))
    return res.status(401).json({ error: "Unauthorized, You are logged out" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" + err });
    }
    req.user = user;
    next();
  });
};
