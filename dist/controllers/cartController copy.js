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
const productCategory_1 = require("../models/productCategory");
const cart_1 = require("../models/cart");
class CartController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { productid, quantity } = req.body;
            try {
                const cartExist = yield cart_1.Cart.getCartById(productid);
                if (cartExist) {
                    const cart = cartExist.update({ quantity: quantity });
                    res.status(201).json({ message: "Item added", cart });
                }
                else {
                    yield cart_1.Cart.create({
                        productid,
                        quantity: quantity ? quantity : 0,
                        Userid: req.user,
                    });
                    const carts = yield cart_1.Cart.getCarts();
                    res.status(201).json({ message: "Item added", carts });
                }
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ error: "Server Error" });
            }
        });
    }
    static deleteCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            try {
                const { categoryid } = req.query;
                const categoryidExist = yield productCategory_1.ProductCategory.getCategoryById(categoryid);
                if (!categoryidExist)
                    return res.status(400).json({ error: "category cant be identified" });
                const category = yield productCategory_1.ProductCategory.destroy({
                    where: { id: categoryidExist.id },
                });
                res
                    .status(201)
                    .json({ message: "Product deleted successfully", count: category });
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ error: "Server Error" });
            }
        });
    }
    static updateCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            try {
                const { categoryid } = req.query;
                const { name } = req.body;
                const categoryExist = yield productCategory_1.ProductCategory.getCategoryById(categoryid);
                if (!categoryExist)
                    return res.status(404).json({ error: "Cetgory can't be identified" });
                categoryExist["name"] = name;
                const category = yield categoryExist.save();
                res
                    .status(201)
                    .json({ message: "Category updated successfully", category });
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ error: "Server Error" });
            }
        });
    }
    static fetchCategories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield productCategory_1.ProductCategory.findAll();
                res.status(201).json(categories);
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ error: "Server Error" });
            }
        });
    }
}
exports.CartController = CartController;
