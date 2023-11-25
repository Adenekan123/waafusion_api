import express from "express";

import { ProfileController } from "../../controllers/profileController";
import { createProfileValidator } from "../../validators/profileValidator";
import { upload } from "../../utils/multer_upload";

export const router = express.Router();

router.post(
  "/",
  upload.array("image"),
  createProfileValidator,
  ProfileController.createProfile
);
router.get(
  "/user",
  ProfileController.getUser
);
router.patch("/user",ProfileController.updateUSer);
router.patch("/", upload.array("image"), ProfileController.updateProfile);
