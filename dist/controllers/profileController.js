"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileController = void 0;
const express_validator_1 = require("express-validator");
const profile_1 = require("../models/profile");
const multer_upload_1 = require("../utils/multer_upload");
class ProfileController {
    static createProfile(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { description, image } = req.body;
            const { id: userid } = req.user;
            let image_url = "";
            const profileExist = yield profile_1.Profile.getUserProfile((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
            if (profileExist)
                return res.status(404).json({ error: "Profile alredy exist" });
            try {
                if (image) {
                    image_url =
                        req.files && Array.isArray(req.files)
                            ? req.files.map((file) => "uploads/" + file.filename).join("+")
                            : "";
                }
                yield profile_1.Profile.create({
                    description,
                    userid: userid,
                    image: image_url,
                });
                res.status(201).json({ message: "Profile updated succesfully" });
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ error: "Server Error" });
            }
        });
    }
    static updateProfile(req, res) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const profileExist = yield profile_1.Profile.getUserProfile((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
                if (!profileExist)
                    return res.status(404).json({ error: "Profile can't be identified" });
                if (req.files) {
                    const images = req.files && Array.isArray(req.files)
                        ? req.files.map((file) => "uploads/" + file.filename)
                        : [];
                    yield (0, multer_upload_1.deleteImage)(profileExist.image);
                    profileExist["image"] = images.join("+");
                }
                if ((_b = req.body) === null || _b === void 0 ? void 0 : _b.description)
                    profileExist["description"] = (_c = req.body) === null || _c === void 0 ? void 0 : _c.description;
                const profile = yield profileExist.save();
                res
                    .status(201)
                    .json({ message: "Product updated successfully", profile });
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ error: "Server Error" });
            }
        });
    }
}
exports.ProfileController = ProfileController;
