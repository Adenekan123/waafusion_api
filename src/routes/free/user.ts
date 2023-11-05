import express from "express";

import {UserController} from "../../controllers/userController";
import {registerValidator,loginValidator} from "../../validators/userValidaor";

export const router = express.Router();

router.post('/register',registerValidator,UserController.register);
router.post('/login',loginValidator,UserController.login);