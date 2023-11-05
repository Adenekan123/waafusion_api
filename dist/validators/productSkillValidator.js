"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSkillValidator = exports.deleteSkillValidator = exports.createSkillValidator = void 0;
const express_validator_1 = require("express-validator");
exports.createSkillValidator = [
    (0, express_validator_1.body)("name").notEmpty().withMessage("Invalid skill name"),
];
exports.deleteSkillValidator = [
    (0, express_validator_1.check)("skillid").isString().notEmpty().withMessage("can't identify skill"),
];
exports.updateSkillValidator = [
    (0, express_validator_1.check)("skillid").notEmpty().withMessage("can't identify skill"),
    (0, express_validator_1.body)("name").notEmpty().withMessage("can't identify skill"),
];
