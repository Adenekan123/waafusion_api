import { body, check } from "express-validator";

export const createSkillValidator = [
  body("name").notEmpty().withMessage("Invalid skill name"),
];

export const deleteSkillValidator = [
  check("skillid").isString().notEmpty().withMessage("can't identify skill"),
];
export const updateSkillValidator = [
  check("skillid").notEmpty().withMessage("can't identify skill"),
  body("name").notEmpty().withMessage("can't identify skill"),
];
