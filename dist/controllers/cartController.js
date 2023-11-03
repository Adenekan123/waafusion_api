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
exports.CartController = void 0;
const express_validator_1 = require("express-validator");
const cart_1 = require("../models/cart");
class CartController {
    static createCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { productid, quantity } = req.body;
            const { id: userid } = req.user;
            try {
                const cartExist = yield cart_1.Cart.getCartById(productid);
                if (cartExist) {
                    yield cartExist.update({
                        quantity: quantity ? quantity : cartExist.quantity + 1,
                    });
                    const carts = yield cart_1.Cart.getCarts(userid);
                    res.status(201).json({ message: "Item added", carts });
                }
                else {
                    yield cart_1.Cart.create({
                        quantity: quantity ? quantity : 1,
                        productid,
                        userid,
                    });
                    const carts = yield cart_1.Cart.getCarts(userid);
                    res.status(201).json({ message: "Item added", carts });
                }
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ error: "Server Error" });
            }
        });
    }
    static deleteCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            try {
                const { cartid } = req.query;
                const { id: userid } = req.user;
                const cartExist = yield cart_1.Cart.getCartById(cartid);
                if (!cartExist)
                    return res.status(404).json({ error: "cart item can't be identified" });
                //delete image and delete record in the database
                yield cart_1.Cart.destroy({
                    where: { id: cartExist.id },
                });
                const carts = yield cart_1.Cart.getCarts(userid);
                res
                    .status(201)
                    .json({ message: "Cart deleted successfully", carts });
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ error: "Server Error" });
            }
        });
    }
}
exports.CartController = CartController;
