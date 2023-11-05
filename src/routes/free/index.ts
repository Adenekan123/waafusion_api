import express from "express";
import { router as productRouter } from "./product";
import { router as userRouter } from "./user";
export const router = express.Router();

router.use("/product", productRouter);
router.use("/user", userRouter);
