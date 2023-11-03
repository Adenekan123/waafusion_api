"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductValidator = exports.deleteProductValidator = exports.createProductValidator = void 0;
const express_validator_1 = require("express-validator");
exports.createProductValidator = [
    (0, express_validator_1.body)("name").notEmpty().withMessage("Invalid product name"),
    (0, express_validator_1.body)("category").notEmpty().withMessage("Invalid product category"),
    (0, express_validator_1.body)("price").notEmpty().withMessage("Invalid price format"),
    (0, express_validator_1.body)("ratings").notEmpty().withMessage("Invalid ratings format"),
    (0, express_validator_1.body)("age_range").notEmpty().withMessage("Invalid age_range"),
    (0, express_validator_1.body)("tag").notEmpty().withMessage("Invalid tag"),
];
exports.deleteProductValidator = [
    (0, express_validator_1.check)("productid").isString().notEmpty().withMessage("can't identify product"),
];
exports.updateProductValidator = [
    (0, express_validator_1.check)("productid").isString().notEmpty().withMessage("can't identify product"),
    (0, express_validator_1.body)("productid").isEmpty().withMessage("can't identify product"),
];
