import express from "express";
import { upload } from "../../utils/multer_upload";
import { Productroller } from "../../controllers/productController";
import {
  createProductValidator,
  deleteProductValidator,
  updateProductValidator,
} from "../../validators/productValidator";
import {
  createSkillValidator,
  deleteSkillValidator,
  updateSkillValidator,
} from "../../validators/productSkillValidator";
import { ProductSkillsController } from "../../controllers/producSkillsController";
import {
  createCategoryValidator,
  deleteCategoryValidator,
  updateCategoryValidator,
} from "../../validators/productCategoryValidator";
import { ProductCategoryController } from "../../controllers/productCategoryController";

export const router = express.Router();

router.post(
  "/create",
  upload.array("image"),
  createProductValidator,
  Productroller.createProduct
);
router.delete("/delete", deleteProductValidator, Productroller.deleteProduct);
router.patch(
  "/update",
  upload.array("image"),
  updateProductValidator,
  Productroller.updateProduct
);
router.get("/all", Productroller.fetchProducts);

//skill routes
router.post(
  "/skill",
  createSkillValidator,
  ProductSkillsController.create
);
router.delete(
  "/skill",
  deleteSkillValidator,
  ProductSkillsController.deleteSkill
);
router.patch(
  "/skill",
  updateSkillValidator,
  ProductSkillsController.updateSkill
);

//category routes
router.post(
  "/category",
  createCategoryValidator,
  ProductCategoryController.create
);
router.delete(
  "/category",
  deleteCategoryValidator,
  ProductCategoryController.deleteCategory
);
router.patch(
  "/category",
  updateCategoryValidator,
  ProductCategoryController.updateCategory
);
