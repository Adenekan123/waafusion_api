import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { Product } from "../models/product";
import { deleteImage } from "../utils/multer_upload";
import { AuthRequest } from "../types";
import { User } from "../models/user";

export class Productroller {
  static async createProduct(req: AuthRequest, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    if (!req.user || ((req.user as User).role as string) !== "admin")
    return res.status(401).json({ error: "Unauthorized" });
    if (!req.file)
      return res.status(400).json({ error: "Image upload failed" });

    const { name, age_range, price, tag, ratings,category } = req.body;

    try {
      // Save the image file path in the imagePath field
      const image = "uploads/" + req.file.filename;
      const product = await Product.create({
        image,
        name,
        age_range,
        price,
        tag,
        ratings,
        categoryid:category
      });
      res
        .status(201)
        .json({ message: "Product created successfully", product });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Server Error" });
    }
  }
  static async deleteProduct(req: AuthRequest, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    if (!req.user || ((req.user as User).role as string) !== "admin")
    return res.status(401).json({ error: "Unauthorized" });
    try {
      const { productid } = req.query;
      const productExist = await Product.getProductById(
        productid as string
      );
      if (!productExist)
        return res.status(404).json({ error: "Product can't be identified" });

      //delete image and delete record in the database
      if (await deleteImage(productExist.image)) {
        const product = Product.destroy({
          where: { id: productExist.id },
        });
        res
          .status(201)
          .json({ message: "Product deleted successfully", product });
      } else {
        res.status(400).json({ error: "Unable to unlink image" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Server Error" });
    }
  }
  static async updateProduct(req: AuthRequest, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (!req.user || ((req.user as User).role as string) !== "admin")
    return res.status(401).json({ error: "Unauthorized" });
    try {
      const { productid } = req.query;
      const fieldsToupdate = Object.keys(req.body) as (keyof Product)[];
      const productExist = await Product.getProductById(
        productid as string
      );
      if (!productExist)
        return res.status(404).json({ error: "Product can't be identified" });

      if (req.file) {
        const image = "uploads/" + req.file.filename;
        await deleteImage(productExist.image);
        productExist["image"] = image;
      }

      if (fieldsToupdate.length) {
        fieldsToupdate.every(
          (field) => ((productExist as any)[field] = req.body[field])
        );
      }

      const product = await productExist.save();
      res
        .status(201)
        .json({ message: "Product updated successfully", product });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Server Error" });
    }
  }
  static async fetchProducts(req: Request, res: Response) {
    try {
      const products = await Product.findAll();
      res.status(201).json(products);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Server Error" });
    }
  }
}
