import express from "express";

import { UserController } from "../../controllers/userController";
import {
  registerValidator,
  loginValidator,
} from "../../validators/userValidaor";
import { authenticateToken } from "../../middleware/authMiddleware";

export const router = express.Router();

router.post("/register", registerValidator, UserController.register);
router.post("/login", loginValidator, UserController.login);
router.get("/logout", authenticateToken, UserController.logout);
