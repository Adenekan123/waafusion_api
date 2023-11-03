import { body, check } from "express-validator";


export const createCartValidator = [
  body("productid").isString().notEmpty().withMessage("can't identify product"),
];
export const deletCartValidator = [
  check("cartid").isString().notEmpty().withMessage("can't identify cart item"),
];
