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
const order_1 = require("../models/order");
const visitorOrder_1 = require("../models/visitorOrder");
const cart_1 = require("../models/cart");
class OrderController {
    static createPartnerOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { orderitems } = req.body;
            const { id: userid } = req.user;
            const neworderitems = orderitems.reduce((acc, curr) => {
                return [...acc, Object.assign(Object.assign({}, curr), { userid })];
            }, []);
            try {
                yield order_1.Order.bulkCreate(neworderitems);
                yield cart_1.Cart.emptyCart(userid);
                const orders = yield order_1.Order.getOrdersByUserId(userid);
                res.status(201).json({ message: "Your order has been recieved", orders });
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ error: "Server Error" });
            }
        });
    }
    static createVisitorOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { orderitems, user } = req.body;
            const new_orderitems = orderitems.reduce((acc, curr) => {
                return [...acc, Object.assign(Object.assign({}, curr), user)];
            }, []);
            try {
                yield visitorOrder_1.visitorOrder.bulkCreate(new_orderitems);
                const orders = yield visitorOrder_1.visitorOrder.getOrders(user === null || user === void 0 ? void 0 : user.email, user === null || user === void 0 ? void 0 : user.name);
                res.status(201).json({ message: "Your order has been recieved", orders });
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
                    return res
                        .status(404)
                        .json({ error: "order item can't be identified" });
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
    static getAllOrders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { id: userid } = req.user;
            try {
                const orders = yield order_1.Order.getOrdersByUserId(userid);
                res.status(200).json(orders);
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ error: "Server Error" });
            }
        });
    }
    static getPendingOrders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: userid } = req.user;
            try {
                const orders = yield order_1.Order.getOrdersByStatus(userid, 1);
                res.status(200).json(orders);
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ error: "Server Error" });
            }
        });
    }
    static getSuccessfullOrders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: userid } = req.user;
            try {
                const orders = yield order_1.Order.getOrdersByStatus(userid, 2);
                res.status(200).json(orders);
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ error: "Server Error" });
            }
        });
    }
}
exports.OrderController = OrderController;
