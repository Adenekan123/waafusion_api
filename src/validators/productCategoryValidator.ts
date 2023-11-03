import { body, check } from "express-validator";

export const createCategoryValidator = [
  body("name").notEmpty().withMessage("Invalid category name"),
];

export const deleteCategoryValidator = [
  check("categoryid").isString().notEmpty().withMessage("can't identify category"),
];
export const updateCategoryValidator = [
  check("categoryid").notEmpty().withMessage("can't identify category"),
  body("name").notEmpty().withMessage("can't identify category"),
];
