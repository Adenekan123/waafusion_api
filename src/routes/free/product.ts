import express from "express";
import { Productroller } from "../../controllers/productController";
import { ProductSkillsController } from "../../controllers/producSkillsController";
import { ProductCategoryController } from "../../controllers/productCategoryController";

export const router = express.Router();

router.post("/filter", Productroller.filterProducts);
router.get("/skills", ProductSkillsController.fetchSkills);
router.get("/categories", ProductCategoryController.fetchCategories);
