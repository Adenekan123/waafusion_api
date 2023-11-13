import { body } from "express-validator";

export const registerValidator = [
  body("firstname").notEmpty().withMessage("Invalid firstname"),
  body("lastname").notEmpty().withMessage("Invalid lastname"),
  body("state").notEmpty().withMessage("Invalid state"),
  body("phone").notEmpty().withMessage("Invalid Phone"),
  body("address").notEmpty().withMessage("Invalid address"),
  body("email").isEmail().withMessage("Invalid email").normalizeEmail(),
  body("password").isLength({min:6}).withMessage("Password must be at least 6 characters long")
];

export const loginValidator = [
    body("email").isEmail().withMessage("Invalid email").normalizeEmail(),
    body("password").isLength({min:6}).withMessage("Invalid password")

]
