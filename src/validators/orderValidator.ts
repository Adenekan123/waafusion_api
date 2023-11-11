import { body, check } from "express-validator";


export const createOrderValidator = [
  body("productid").isString().notEmpty().withMessage("can't identify product"),
  body("total").isString().notEmpty().withMessage("total is required"),
];
export const deletOrderValidator = [
  check("orderid").isString().notEmpty().withMessage("can't identify order item"),
];
