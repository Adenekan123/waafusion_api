import express from "express";
import { router as productRouter } from "./product";
import { router as orderRouter } from "./order";
export const router = express.Router();

router.use("/product", productRouter);
router.use("/order", orderRouter);
