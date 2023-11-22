import express from "express";
import {
  createPartnerOrderValidator,
  deletOrderValidator,
} from "../../validators/orderValidator";
import { OrderController } from "../../controllers/orderController";

export const router = express.Router();

router.get("/", OrderController.getAllOrders);
router.get("/successfull", OrderController.getSuccessfullOrders);
router.get("/pending", OrderController.getPendingOrders);
router.post("/", createPartnerOrderValidator, OrderController.createPartnerOrder);
router.delete("/", deletOrderValidator, OrderController.deleteOrder);
