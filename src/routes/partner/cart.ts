import express from "express";
import { CartController } from "../../controllers/cartController";
import { createCartValidator, deletCartValidator } from "../../validators/cartValidator";

export const router = express.Router();

router.post('/',createCartValidator,CartController.createCart);
router.delete('/',deletCartValidator,CartController.deleteCart);

