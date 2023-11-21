import { body, check } from "express-validator";

export const createPartnerOrderValidator = [
  body("orderitems").isArray().notEmpty().withMessage("order items are required"),
];

export const createVisitorOrderValidator = [
  body("orderitems").isArray().notEmpty().withMessage("order items are required"),
  body("user").notEmpty().withMessage("user is required")
    
    
];
export const deletOrderValidator = [
  check("orderid")
    .isString()
    .notEmpty()
    .withMessage("can't identify order item"),
];
