import express from "express";
import {
  createSkillValidator,
  deleteSkillValidator,
  updateSkillValidator,
} from "../validators/productSkillValidator";
import { ProductSkillsController } from "../controllers/producSkillsController";

export const router = express.Router();

router.post("/create", createSkillValidator, ProductSkillsController.create);
router.delete(
  "/delete",
  deleteSkillValidator,
  ProductSkillsController.deleteSkill
);
router.patch(
  "/update",
  updateSkillValidator,
  ProductSkillsController.updateSkill
);
router.get("/all", ProductSkillsController.fetchSkills);
