import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { Op } from "sequelize";

import { Product } from "../models/product";
import { deleteImage } from "../utils/multer_upload";
import { AuthRequest } from "../types";
import { User } from "../models/user";

const strToObj = (price: string) => {
  const arr = price.replace("{", "").replace("}", "").split(",");
  return arr.reduce((acc: any, curr) => {
    const strArr = curr.split(":");
    acc = { ...acc, [strArr[0] as any]: strArr[1] };
    return acc;
  }, {});
};

export class Productroller {
  static async createProduct(req: AuthRequest, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    if (!req.user || ((req.user as User).role as string) !== "admin")
      return res.status(401).json({ error: "Unauthorized" });
    if (!req.files)
      return res.status(400).json({ error: "Image upload failed" });

    const { name, age_range, price, tag, ratings, category, skill } = req.body;
    try {
      // Save the image file path in the imagePath field
      // const image = "uploads/" + req.file.filename;
      const images =
        req.files && Array.isArray(req.files)
          ? req.files.map((file) => "uploads/" + file.filename)
          : [];

      const product = await Product.create({
        image: images.join("+"),
        name,
        age_range,
        price: typeof price === "string" ? strToObj(price) : price,
        tag,
        ratings: typeof ratings === "string" ? strToObj(ratings) : ratings,
        categoryid: category,
        skillid: skill,
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
      const productExist = await Product.getProductById(productid as string);
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
      const fieldsToupdate = Object.keys(req.body);
      const productExist = await Product.getProductById(productid as string);
      if (!productExist)
        return res.status(404).json({ error: "Product can't be identified" });

      if (req.files) {
        const images =
          req.files && Array.isArray(req.files)
            ? req.files.map((file) => "uploads/" + file.filename)
            : [];
        await deleteImage(productExist.image);
        productExist["image"] = images.join("+");
      }

      if (fieldsToupdate.length && productExist) {
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
  static async filterProducts(req: Request, res: Response) {
    const { categories, skills, ages } = req.body;
    const whereConditions: any = {};
    if (categories && Array.isArray(categories) && categories.length) {
      whereConditions.categoryid = { [Op.in]: categories };
    }

    if (skills && Array.isArray(skills) && skills.length) {
      whereConditions.skillid = { [Op.in]: skills };
    }

    if (ages && Array.isArray(ages) && ages.length) {
      whereConditions.age_range = {
        [Op.or]: ages.map((age: string) => ({
          [Op.like]: age + "%",
        })),
      };
    }
    try {
      const products = await Product.findAll({
        where: whereConditions,
      });
      // const finalProducts = parseFields(products,['price,ratings'])
      res.status(201).json(products);
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
  static async fetchMostLovedKits(req: Request, res: Response) {
    try {
      const products = await Product.findAll({
        where: { categoryid: 1, "ratings.rating": { [Op.gt]: 4.0 } },
      });
      res.status(201).json(products);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Server Error" });
    }
  }
  static async fetchBeginnersProducts(req: Request, res: Response) {
    try {
      const products = await Product.findAll({
        where: {
          name: {
            [Op.or]: [
              { [Op.like]: "%starter%" },
              { [Op.like]: "%level_1%" },
              { [Op.like]: "%advanced%" },
            ],
          },
        },
      });
      res.status(201).json(products);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Server Error" });
    }
  }
  static async fetchEducationalKits(req: Request, res: Response) {
    try {
      const products = await Product.findAll({
        where: {
          categoryid: 1,
        },
      });
      res.status(201).json(products);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Server Error" });
    }
  }
  static async fetchKitsCourses(req: Request, res: Response) {
    try {
      const products = await Product.findAll({
        where: {
          categoryid: 3,
        },
      });
      res.status(201).json(products);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Server Error" });
    }
  }
  static async fetchProductImage(req: Request, res: Response) {
    try {
      const {url} = req.query;
      res.setHeader('Content-Type','image/webp')
      res.status(201).send("dist/"+url);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Server Error" });
    }
  }
}
