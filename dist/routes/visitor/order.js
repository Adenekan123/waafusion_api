"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const orderValidator_1 = require("../../validators/orderValidator");
const orderController_1 = require("../../controllers/orderController");
exports.router = express_1.default.Router();
exports.router.post("/", orderValidator_1.createVisitorOrderValidator, orderController_1.OrderController.createVisitorOrder);
exports.router.delete("/", orderValidator_1.deletOrderValidator, orderController_1.OrderController.deleteOrder);
