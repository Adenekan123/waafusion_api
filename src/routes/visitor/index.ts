import express from "express";
import { router as productRouter } from "./product";
export const router = express.Router();

router.use("/product", productRouter);
