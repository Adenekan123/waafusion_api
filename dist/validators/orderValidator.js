"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletOrderValidator = exports.createOrderValidator = void 0;
const express_validator_1 = require("express-validator");
exports.createOrderValidator = [
    (0, express_validator_1.body)("productid").isString().notEmpty().withMessage("can't identify product"),
    (0, express_validator_1.body)("total").isString().notEmpty().withMessage("total is required"),
];
exports.deletOrderValidator = [
    (0, express_validator_1.check)("orderid").isString().notEmpty().withMessage("can't identify order item"),
];
