import { Request, Response } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models/user";
import { TokenBlacklist } from "../models/token";
import { AuthRequest } from "../types";

export class UserController {
  static async register(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      firstname,
      lastname,
      state,
      email,
      phone,
      address,
      password,
      role,
    } = req.body;

    try {
      const existingUser = await User.getUserByEmail(email);
      if (existingUser)
        return res.status(400).json({ error: "User already exists" });

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const userId = role
        ? await User.create({
            firstname,
            lastname,
            state,
            email,
            phone,
            address,
            password: hashedPassword,
            role,
          })
        : await User.create({
            firstname,
            lastname,
            state,
            email,
            phone,
            address,
            password: hashedPassword,
          });
      res.status(201).json({ message: "User registered succesfully", userId });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Server Error" });
    }
  }

  static async login(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.getUserByEmail(email);
      if (!user) return res.status(401).json({ error: "Invalid credentials" });

      //check if password matches
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid)
        return res.status(401).json({ error: "Invalid credentials" });

      //Generate access token
      const accesToken = jwt.sign(
        { id: user.id, role: user.role },
        process.env.SECRET_KEY || "",
        { expiresIn: "15M" }
      );

      const refreshToken = jwt.sign(
        { id: user.id },
        process.env.SECRET_KEY || "",
        { expiresIn: "7d" }
      );

      return res.status(200).json({ accesToken, refreshToken });
    } catch (err) {
      res.status(500).json({ error: "Server Error" });
    }
  }
  static async logout(req: AuthRequest, res: Response) {
    try {
      // Extract the token from the request, assuming it's stored in a cookie or header
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const tokenBlacklisted = await TokenBlacklist.tokenBlacklisted(token);
      if (tokenBlacklisted)
        return res
          .status(401)
          .json({ error: "Unauthorized, You are logged out" });

      await TokenBlacklist.create({ token });
      delete req.user;
      return res.status(401).json({ error: "You are logged out" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Server Error" });
    }
  }
}
