import express from "express";
import {
  createVisitorOrderValidator,
  deletOrderValidator,
} from "../../validators/orderValidator";
import { OrderController } from "../../controllers/orderController";

export const router = express.Router();

router.post(
  "/",
  createVisitorOrderValidator,
  OrderController.createVisitorOrder
);
router.delete("/", deletOrderValidator, OrderController.deleteOrder);
