import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { ProductCategory } from "../models/productCategory";
import { AuthRequest } from "../types";
import { User } from "../models/user";

export class ProductCategoryController {
  static async create(req: AuthRequest, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    if (!req.user || ((req.user as User).role as string) !== "admin")
      return res.status(401).json({ error: "Unauthorized" });

    const { name } = req.body;

    try {
      const existingCategory = await ProductCategory.getCategoryByName(name);
      if (existingCategory)
        return res.status(400).json({ error: "Category already exists" });

      const category = await ProductCategory.create({ name });
      res.status(201).json({ message: "Category added succesfully", category });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Server Error" });
    }
  }

  static async deleteCategory(req: AuthRequest, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    if (!req.user || ((req.user as User).role as string) !== "admin")
    return res.status(401).json({ error: "Unauthorized" });

    try {
      const { categoryid } = req.query;
      const categoryidExist = await ProductCategory.getCategoryById(
        categoryid as string
      );
      if (!categoryidExist)
        return res.status(400).json({ error: "category cant be identified" });

      const category = await ProductCategory.destroy({
        where: { id: categoryidExist.id },
      });
      res
        .status(201)
        .json({ message: "Product deleted successfully", count: category });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Server Error" });
    }
  }

  static async updateCategory(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { categoryid } = req.query;
      const { name } = req.body;
      const categoryExist = await ProductCategory.getCategoryById(
        categoryid as string
      );
      if (!categoryExist)
        return res.status(404).json({ error: "Cetgory can't be identified" });

      categoryExist["name"] = name;

      const category = await categoryExist.save();
      res
        .status(201)
        .json({ message: "Category updated successfully", category });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Server Error" });
    }
  }

  static async fetchCategories(req: Request, res: Response) {
    try {
      const categories = await ProductCategory.findAll();
      res.status(201).json(categories);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Server Error" });
    }
  }
}
