"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const userController_1 = require("../../controllers/userController");
const userValidaor_1 = require("../../validators/userValidaor");
exports.router = express_1.default.Router();
exports.router.post('/register', userValidaor_1.registerValidator, userController_1.UserController.register);
exports.router.post('/login', userValidaor_1.loginValidator, userController_1.UserController.login);
