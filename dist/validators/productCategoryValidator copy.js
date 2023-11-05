"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCategoryValidator = exports.deleteCategoryValidator = exports.createCategoryValidator = void 0;
const express_validator_1 = require("express-validator");
exports.createCategoryValidator = [
    (0, express_validator_1.body)("name").notEmpty().withMessage("Invalid category name"),
];
exports.deleteCategoryValidator = [
    (0, express_validator_1.check)("categoryid").isString().notEmpty().withMessage("can't identify category"),
];
exports.updateCategoryValidator = [
    (0, express_validator_1.check)("categoryid").notEmpty().withMessage("can't identify category"),
    (0, express_validator_1.body)("name").notEmpty().withMessage("can't identify category"),
];
