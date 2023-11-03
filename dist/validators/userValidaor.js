"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidator = exports.registerValidator = void 0;
const express_validator_1 = require("express-validator");
exports.registerValidator = [
    (0, express_validator_1.body)("email").isEmail().withMessage("Invalid email").normalizeEmail(),
    (0, express_validator_1.body)("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
];
exports.loginValidator = [
    (0, express_validator_1.body)("email").isEmail().withMessage("Invalid email").normalizeEmail(),
    (0, express_validator_1.body)("password").isLength({ min: 6 }).withMessage("Invalid password")
];
