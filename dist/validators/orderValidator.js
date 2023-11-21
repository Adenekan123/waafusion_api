"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletOrderValidator = exports.createVisitorOrderValidator = exports.createPartnerOrderValidator = void 0;
const express_validator_1 = require("express-validator");
exports.createPartnerOrderValidator = [
    (0, express_validator_1.body)("orderitems").isArray().notEmpty().withMessage("order items are required"),
];
exports.createVisitorOrderValidator = [
    (0, express_validator_1.body)("orderitems").isArray().notEmpty().withMessage("order items are required"),
    (0, express_validator_1.body)("user").notEmpty().withMessage("user is required")
];
exports.deletOrderValidator = [
    (0, express_validator_1.check)("orderid")
        .isString()
        .notEmpty()
        .withMessage("can't identify order item"),
];
