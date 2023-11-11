import { body} from "express-validator";

export const createProfileValidator = [
  body("description").notEmpty().withMessage("Profile description is required")
];
