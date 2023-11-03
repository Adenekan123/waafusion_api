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
exports.Productroller = void 0;
const express_validator_1 = require("express-validator");
const product_1 = require("../models/product");
const multer_upload_1 = require("../utils/multer_upload");
class Productroller {
    static createProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            if (!req.user || req.user.role !== "admin")
                return res.status(401).json({ error: "Unauthorized" });
            if (!req.file)
                return res.status(400).json({ error: "Image upload failed" });
            const { name, age_range, price, tag, ratings, category } = req.body;
            try {
                // Save the image file path in the imagePath field
                const image = "uploads/" + req.file.filename;
                const product = yield product_1.Product.create({
                    image,
                    name,
                    age_range,
                    price,
                    tag,
                    ratings,
                    categoryid: category
                });
                res
                    .status(201)
                    .json({ message: "Product created successfully", product });
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ error: "Server Error" });
            }
        });
    }
    static deleteProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            if (!req.user || req.user.role !== "admin")
                return res.status(401).json({ error: "Unauthorized" });
            try {
                const { productid } = req.query;
                const productExist = yield product_1.Product.getProductById(productid);
                if (!productExist)
                    return res.status(404).json({ error: "Product can't be identified" });
                //delete image and delete record in the database
                if (yield (0, multer_upload_1.deleteImage)(productExist.image)) {
                    const product = product_1.Product.destroy({
                        where: { id: productExist.id },
                    });
                    res
                        .status(201)
                        .json({ message: "Product deleted successfully", product });
                }
                else {
                    res.status(400).json({ error: "Unable to unlink image" });
                }
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ error: "Server Error" });
            }
        });
    }
    static updateProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            if (!req.user || req.user.role !== "admin")
                return res.status(401).json({ error: "Unauthorized" });
            try {
                const { productid } = req.query;
                const fieldsToupdate = Object.keys(req.body);
                const productExist = yield product_1.Product.getProductById(productid);
                if (!productExist)
                    return res.status(404).json({ error: "Product can't be identified" });
                if (req.file) {
                    const image = "uploads/" + req.file.filename;
                    yield (0, multer_upload_1.deleteImage)(productExist.image);
                    productExist["image"] = image;
                }
                if (fieldsToupdate.length) {
                    fieldsToupdate.every((field) => (productExist[field] = req.body[field]));
                }
                const product = yield productExist.save();
                res
                    .status(201)
                    .json({ message: "Product updated successfully", product });
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ error: "Server Error" });
            }
        });
    }
    static fetchProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield product_1.Product.findAll();
                res.status(201).json(products);
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ error: "Server Error" });
            }
        });
    }
}
exports.Productroller = Productroller;
