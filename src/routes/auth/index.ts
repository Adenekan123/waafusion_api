import express from "express";
import { router as userRouter } from "../auth/user";
export const router = express.Router();

router.use("/user", userRouter);
