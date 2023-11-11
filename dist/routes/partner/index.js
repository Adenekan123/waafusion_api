"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const cart_1 = require("./cart");
const order_1 = require("./order");
const profile_1 = require("./profile");
exports.router = express_1.default.Router();
exports.router.use('/cart', cart_1.router);
exports.router.use('/order', order_1.router);
exports.router.use('/profile', profile_1.router);
