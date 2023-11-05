"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSkillsController = void 0;
const express_validator_1 = require("express-validator");
const productCategory_1 = require("../models/productCategory");
const skills_1 = require("../models/skills");
class ProductSkillsController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            if (!req.user || req.user.role !== "admin")
                return res.status(401).json({ error: "Unauthorized" });
            const { name } = req.body;
            try {
                const existingSkill = yield skills_1.ProductSkills.getCSkillByName(name);
                if (existingSkill)
                    return res.status(400).json({ error: "Skills already exists" });
                const category = yield skills_1.ProductSkills.create({ name });
                res.status(201).json({ message: "Skills added succesfully", category });
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ error: "Server Error" });
            }
        });
    }
    static deleteSkill(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            if (!req.user || req.user.role !== "admin")
                return res.status(401).json({ error: "Unauthorized" });
            try {
                const { skillid } = req.query;
                const skillidExist = yield skills_1.ProductSkills.getCSkillById(skillid);
                if (!skillidExist)
                    return res.status(400).json({ error: "Skill cant be identified" });
                const skill = yield skills_1.ProductSkills.destroy({
                    where: { id: skillidExist.id },
                });
                res
                    .status(201)
                    .json({ message: "Skill deleted successfully", count: skill });
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ error: "Server Error" });
            }
        });
    }
    static updateSkill(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            try {
                const { skillid } = req.query;
                const { name } = req.body;
                const skillExist = yield productCategory_1.ProductCategory.getCategoryById(skillid);
                if (!skillExist)
                    return res.status(404).json({ error: "Skill can't be identified" });
                skillExist["name"] = name;
                const skill = yield skillExist.save();
                res
                    .status(201)
                    .json({ message: "Skill updated successfully", skill });
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ error: "Server Error" });
            }
        });
    }
    static fetchSkills(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const skills = yield skills_1.ProductSkills.findAll();
                res.status(201).json(skills);
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ error: "Server Error" });
            }
        });
    }
}
exports.ProductSkillsController = ProductSkillsController;
