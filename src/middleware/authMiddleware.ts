import jwt from "jsonwebtoken";
import { NextFunction, Response } from "express";
import { AuthRequest } from "../types";

const SECRET_KEY = process.env.SECRET_KEY || '';


export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token"+err });
    }
    req.user = user;
    next();
  });
};
