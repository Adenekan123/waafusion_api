"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const cartController_1 = require("../../controllers/cartController");
const cartValidator_1 = require("../../validators/cartValidator");
exports.router = express_1.default.Router();
exports.router.get('/', cartController_1.CartController.getCarts);
exports.router.post('/', cartValidator_1.createCartValidator, cartController_1.CartController.createCart);
exports.router.delete('/', cartValidator_1.deletCartValidator, cartController_1.CartController.deleteCart);
