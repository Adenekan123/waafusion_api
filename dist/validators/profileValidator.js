"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProfileValidator = void 0;
const express_validator_1 = require("express-validator");
exports.createProfileValidator = [
    (0, express_validator_1.body)("description").notEmpty().withMessage("Profile description is required")
];
