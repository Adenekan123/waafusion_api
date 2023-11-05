"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const productSkillValidator_1 = require("../../validators/productSkillValidator");
const producSkillsController_1 = require("../../controllers/producSkillsController");
exports.router = express_1.default.Router();
exports.router.post("/create", productSkillValidator_1.createSkillValidator, producSkillsController_1.ProductSkillsController.create);
exports.router.delete("/delete", productSkillValidator_1.deleteSkillValidator, producSkillsController_1.ProductSkillsController.deleteSkill);
exports.router.patch("/update", productSkillValidator_1.updateSkillValidator, producSkillsController_1.ProductSkillsController.updateSkill);
