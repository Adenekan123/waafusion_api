import { Request, Response } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models/user";

export class UserController {
  static async register(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, phone, username, password, role } = req.body;

    try {
      const existingUser = await User.getUserByEmail(email);
      if (existingUser)
        return res.status(400).json({ error: "User already exists" });

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const userId = role
        ? await User.create({
            username,
            email,
            phone,
            password: hashedPassword,
            role,
          })
        : await User.create({
            username,
            email,
            phone,
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
        { id: user.id,role:user.role },
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
}
