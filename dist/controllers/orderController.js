"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const express_validator_1 = require("express-validator");
const cart_1 = require("../models/cart");
const order_1 = require("../models/order");
class OrderController {
    static createOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { productid, name, email, phone, address, state, total } = req.body;
            const { id: userid } = req.user;
            try {
                if (!userid) {
                    if (!name ||
                        !email ||
                        !phone ||
                        !address ||
                        !state ||
                        !total ||
                        !productid ||
                        !total) {
                        return res
                            .status(500)
                            .json({ error: "Invalid request. Please fill all fields" });
                    }
                    yield order_1.Order.create({
                        name,
                        email,
                        phone,
                        address,
                        state,
                        productid,
                        total,
                    });
                }
                else {
                    const carts = yield cart_1.Cart.findAll({ where: { userid } });
                    yield order_1.Order.create({
                        total,
                        productid: carts.map((cart) => cart.productid),
                        userid,
                    });
                    // const carts = await Cart.getCarts(userid as unknown as string);
                    res.status(201).json({ message: "Item added", carts });
                }
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ error: "Server Error" });
            }
        });
    }
    static deleteOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            try {
                const { orderid } = req.query;
                const orderExist = yield order_1.Order.getOrderById(orderid);
                if (!orderExist)
                    return res.status(404).json({ error: "order item can't be identified" });
                //delete image and delete record in the database
                yield order_1.Order.destroy({
                    where: { id: orderExist.id },
                });
                res.status(201).json({ message: "Order deleted successfully" });
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ error: "Server Error" });
            }
        });
    }
}
exports.OrderController = OrderController;
