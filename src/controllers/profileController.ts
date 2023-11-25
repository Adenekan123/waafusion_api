import { Response } from "express";
import { validationResult } from "express-validator";
import { User } from "../models/user";
import { AuthRequest } from "../types";
import { Profile } from "../models/profile";
import { deleteImage } from "../utils/multer_upload";

export class ProfileController {
  static async createProfile(req: AuthRequest, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { description, image } = req.body;
    const { id: userid } = req.user as User;
    let image_url = "";
    const profileExist = await Profile.getUserProfile(
      (req.user as User)?.id as unknown as string
    );
    if (profileExist)
      return res.status(404).json({ error: "Profile alredy exist" });
    try {
      if (image) {
        image_url =
          req.files && Array.isArray(req.files)
            ? req.files.map((file) => "uploads/" + file.filename).join("+")
            : "";
      }
      await Profile.create({
        description,
        userid: userid as unknown as string,
        image: image_url,
      });

      res.status(201).json({ message: "Profile updated succesfully" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Server Error" });
    }
  }
  static async updateProfile(req: AuthRequest, res: Response) {
    try {
      const profileExist = await Profile.getUserProfile(
        (req.user as User)?.id as unknown as string
      );
      if (!profileExist)
        return res.status(404).json({ error: "Profile can't be identified" });

      if (req.files) {
        const images =
          req.files && Array.isArray(req.files)
            ? req.files.map((file) => "uploads/" + file.filename)
            : [];
        await deleteImage(profileExist.image);
        profileExist["image"] = images.join("+");
      }

      if (req.body?.description)
        profileExist["description"] = req.body?.description;

      const profile = await profileExist.save();
      res
        .status(201)
        .json({ message: "Product updated successfully", profile });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Server Error" });
    }
  }
  static async updateUSer(req: AuthRequest, res: Response) {
    try {
      const userExist = await User.getUser(
        (req.user as User)?.id as unknown as string
      );
      if (!userExist)
        return res.status(404).json({ error: "Profile can't be identified" });

      if (req.body?.firstname) userExist["firstname"] = req.body?.firstname;
      if (req.body?.firstname) userExist["lastname"] = req.body?.lastname;
      if (req.body?.firstname) userExist["phone"] = req.body?.phone;

      const profile = await userExist.save();
      res
        .status(201)
        .json({ message: "Profile updated successfully", profile });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Server Error" });
    }
  }
  static async getUser(req: AuthRequest, res: Response) {
    console.log(req.user)
    try {
      const userExist = await User.getUser(
        (req.user as User)?.id as unknown as string
      );
      if (!userExist)
        return res.status(404).json({ error: "Profile can't be identified" });
      res.status(201).json(userExist);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Server Error" });
    }
  }
}
