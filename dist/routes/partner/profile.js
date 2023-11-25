"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const profileController_1 = require("../../controllers/profileController");
const profileValidator_1 = require("../../validators/profileValidator");
const multer_upload_1 = require("../../utils/multer_upload");
exports.router = express_1.default.Router();
exports.router.post("/", multer_upload_1.upload.array("image"), profileValidator_1.createProfileValidator, profileController_1.ProfileController.createProfile);
exports.router.get("/user", profileController_1.ProfileController.getUser);
exports.router.patch("/user", profileController_1.ProfileController.updateUSer);
exports.router.patch("/", multer_upload_1.upload.array("image"), profileController_1.ProfileController.updateProfile);
