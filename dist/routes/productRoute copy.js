"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const multer_upload_1 = require("../utils/multer_upload");
const productController_1 = require("../controllers/productController");
const productValidator_1 = require("../validators/productValidator");
exports.router = express_1.default.Router();
exports.router.post('/create', multer_upload_1.upload.array('image'), productValidator_1.createProductValidator, productController_1.Productroller.createProduct);
exports.router.delete('/delete', productValidator_1.deleteProductValidator, productController_1.Productroller.deleteProduct);
exports.router.patch('/update', multer_upload_1.upload.array('image'), productValidator_1.updateProductValidator, productController_1.Productroller.updateProduct);
exports.router.get('/all', productController_1.Productroller.fetchProducts);
