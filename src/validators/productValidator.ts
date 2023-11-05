import { body, check } from "express-validator";

export const createProductValidator = [
  body("name").notEmpty().withMessage("Invalid product name"),
  body("category").notEmpty().withMessage("category field is required"),
  body("skill").notEmpty().withMessage("skill field is required"),
  body("price").notEmpty().withMessage("Invalid price format"),
  body("ratings").notEmpty().withMessage("Invalid ratings format"),
  body("age_range").notEmpty().withMessage("Invalid age_range"),
  body("tag").notEmpty().withMessage("Invalid tag"),
];

export const deleteProductValidator = [
  check("productid").isString().notEmpty().withMessage("can't identify product"),
];
export const updateProductValidator = [
  check("productid").isString().notEmpty().withMessage("can't identify product"),
  body("productid").isEmpty().withMessage("can't identify product"),
];
