"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidator = exports.registerValidator = void 0;
const express_validator_1 = require("express-validator");
exports.registerValidator = [
    (0, express_validator_1.body)("firstname").notEmpty().withMessage("Invalid firstname"),
    (0, express_validator_1.body)("lastname").notEmpty().withMessage("Invalid lastname"),
    (0, express_validator_1.body)("state").notEmpty().withMessage("Invalid state"),
    (0, express_validator_1.body)("phone").notEmpty().withMessage("Invalid Phone"),
    (0, express_validator_1.body)("address").notEmpty().withMessage("Invalid address"),
    (0, express_validator_1.body)("email").isEmail().withMessage("Invalid email").normalizeEmail(),
    (0, express_validator_1.body)("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
];
exports.loginValidator = [
    (0, express_validator_1.body)("email").isEmail().withMessage("Invalid email").normalizeEmail(),
    (0, express_validator_1.body)("password").isLength({ min: 6 }).withMessage("Invalid password")
];
