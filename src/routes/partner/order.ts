import express from "express";
import {
  createOrderValidator,
  deletOrderValidator,
} from "../../validators/orderValidator";
import { OrderController } from "../../controllers/orderController";

export const router = express.Router();

router.post("/", createOrderValidator, OrderController.createOrder);
router.delete("/", deletOrderValidator, OrderController.deleteOrder);
