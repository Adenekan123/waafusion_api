"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletCartValidator = exports.createCartValidator = void 0;
const express_validator_1 = require("express-validator");
exports.createCartValidator = [
    (0, express_validator_1.body)("productid").isString().notEmpty().withMessage("can't identify product"),
];
exports.deletCartValidator = [
    (0, express_validator_1.check)("cartid").isString().notEmpty().withMessage("can't identify cart item"),
];
