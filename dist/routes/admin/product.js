"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const multer_upload_1 = require("../../utils/multer_upload");
const productController_1 = require("../../controllers/productController");
const productValidator_1 = require("../../validators/productValidator");
const productSkillValidator_1 = require("../../validators/productSkillValidator");
const producSkillsController_1 = require("../../controllers/producSkillsController");
const productCategoryValidator_1 = require("../../validators/productCategoryValidator");
const productCategoryController_1 = require("../../controllers/productCategoryController");
exports.router = express_1.default.Router();
exports.router.post("/create", multer_upload_1.upload.array("image"), productValidator_1.createProductValidator, productController_1.Productroller.createProduct);
exports.router.delete("/delete", productValidator_1.deleteProductValidator, productController_1.Productroller.deleteProduct);
exports.router.patch("/update", multer_upload_1.upload.array("image"), productValidator_1.updateProductValidator, productController_1.Productroller.updateProduct);
exports.router.get("/all", productController_1.Productroller.fetchProducts);
//skill routes
exports.router.post("/skill/create", productSkillValidator_1.createSkillValidator, producSkillsController_1.ProductSkillsController.create);
exports.router.delete("/skill/delete", productSkillValidator_1.deleteSkillValidator, producSkillsController_1.ProductSkillsController.deleteSkill);
exports.router.patch("/skill/update", productSkillValidator_1.updateSkillValidator, producSkillsController_1.ProductSkillsController.updateSkill);
//category routes
exports.router.post("/category/create", productCategoryValidator_1.createCategoryValidator, productCategoryController_1.ProductCategoryController.create);
exports.router.delete("/category/delete", productCategoryValidator_1.deleteCategoryValidator, productCategoryController_1.ProductCategoryController.deleteCategory);
exports.router.patch("/category/update", productCategoryValidator_1.updateCategoryValidator, productCategoryController_1.ProductCategoryController.updateCategory);
