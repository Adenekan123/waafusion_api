import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { ProductCategory } from "../models/productCategory";
import { AuthRequest } from "../types";
import { User } from "../models/user";
import { ProductSkills } from "../models/skills";

export class ProductSkillsController {
  static async create(req: AuthRequest, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    if (!req.user || ((req.user as User).role as string) !== "admin")
      return res.status(401).json({ error: "Unauthorized" });

    const { name } = req.body;

    try {
      const existingSkill = await ProductSkills.getCSkillByName(name);
      if (existingSkill)
        return res.status(400).json({ error: "Skills already exists" });

      const category = await ProductSkills.create({ name });
      res.status(201).json({ message: "Skills added succesfully", category });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Server Error" });
    }
  }

  static async deleteSkill(req: AuthRequest, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    if (!req.user || ((req.user as User).role as string) !== "admin")
    return res.status(401).json({ error: "Unauthorized" });

    try {
      const { skillid } = req.query;
      const skillidExist = await ProductSkills.getCSkillById(
        skillid as string
      );
      if (!skillidExist)
        return res.status(400).json({ error: "Skill cant be identified" });

      const skill = await ProductSkills.destroy({
        where: { id: skillidExist.id },
      });
      res
        .status(201)
        .json({ message: "Skill deleted successfully", count: skill });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Server Error" });
    }
  }

  static async updateSkill(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { skillid } = req.query;
      const { name } = req.body;
      const skillExist = await ProductCategory.getCategoryById(
        skillid as string
      );
      if (!skillExist)
        return res.status(404).json({ error: "Skill can't be identified" });

        skillExist["name"] = name;

      const skill = await skillExist.save();
      res
        .status(201)
        .json({ message: "Skill updated successfully", skill });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Server Error" });
    }
  }

  static async fetchSkills(req: Request, res: Response) {
    try {
      const skills = await ProductSkills.findAll();
      res.status(201).json(skills);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Server Error" });
    }
  }
}
