"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const productController_1 = require("../../controllers/productController");
const producSkillsController_1 = require("../../controllers/producSkillsController");
const productCategoryController_1 = require("../../controllers/productCategoryController");
exports.router = express_1.default.Router();
exports.router.post("/filter", productController_1.Productroller.filterProducts);
exports.router.get("/mostloved_kits", productController_1.Productroller.fetchMostLovedKits);
exports.router.get("/education_kits", productController_1.Productroller.fetchEducationalKits);
exports.router.get("/beginners", productController_1.Productroller.fetchBeginnersProducts);
exports.router.get("/image", productController_1.Productroller.fetchProductImage);
exports.router.get("/skills", producSkillsController_1.ProductSkillsController.fetchSkills);
exports.router.get("/categories", productCategoryController_1.ProductCategoryController.fetchCategories);
