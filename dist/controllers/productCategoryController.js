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
exports.ProductCategoryController = void 0;
const express_validator_1 = require("express-validator");
const productCategory_1 = require("../models/productCategory");
const product_1 = require("../models/product");
class ProductCategoryController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            if (!req.user || req.user.role !== "admin")
                return res.status(401).json({ error: "Unauthorized" });
            const { name } = req.body;
            try {
                const existingCategory = yield productCategory_1.ProductCategory.getCategoryByName(name);
                if (existingCategory)
                    return res.status(400).json({ error: "Category already exists" });
                const category = yield productCategory_1.ProductCategory.create({ name });
                res.status(201).json({ message: "Category added succesfully", category });
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
            if (!req.user || req.user.role !== "admin")
                return res.status(401).json({ error: "Unauthorized" });
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
    static fetchProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            try {
                const { productid } = req.params;
                const categorie = yield product_1.Product.findOne({
                    where: { id: productid },
                });
                res.status(201).json(categorie);
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ error: "Server Error" });
            }
        });
    }
}
exports.ProductCategoryController = ProductCategoryController;
