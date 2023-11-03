"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const productCategoryController_1 = require("../controllers/productCategoryController");
const productCategoryValidator_1 = require("../validators/productCategoryValidator");
exports.router = express_1.default.Router();
exports.router.post('/create', productCategoryValidator_1.createCategoryValidator, productCategoryController_1.ProductCategoryController.create);
exports.router.delete('/delete', productCategoryValidator_1.deleteCategoryValidator, productCategoryController_1.ProductCategoryController.deleteCategory);
exports.router.patch('/update', productCategoryValidator_1.updateCategoryValidator, productCategoryController_1.ProductCategoryController.updateCategory);
exports.router.get('/all', productCategoryController_1.ProductCategoryController.fetchCategories);
