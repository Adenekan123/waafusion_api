import express from "express";
import {ProductCategoryController} from "../controllers/productCategoryController";
import {createCategoryValidator,deleteCategoryValidator,updateCategoryValidator} from "../validators/productCategoryValidator"

export const router = express.Router();

router.post('/create',createCategoryValidator,ProductCategoryController.create);
router.delete('/delete',deleteCategoryValidator,ProductCategoryController.deleteCategory);
router.patch('/update',updateCategoryValidator,ProductCategoryController.updateCategory);
router.get('/all',ProductCategoryController.fetchCategories);

