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
exports.Productroller = void 0;
const express_validator_1 = require("express-validator");
const sequelize_1 = require("sequelize");
const product_1 = require("../models/product");
const multer_upload_1 = require("../utils/multer_upload");
const strToObj = (price) => {
    const arr = price.replace("{", "").replace("}", "").split(",");
    return arr.reduce((acc, curr) => {
        const strArr = curr.split(":");
        acc = Object.assign(Object.assign({}, acc), { [strArr[0]]: strArr[1] });
        return acc;
    }, {});
};
class Productroller {
    static createProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            if (!req.files)
                return res.status(400).json({ error: "Image upload failed" });
            const { name, age_range, price, tag, ratings, category, skill, description } = req.body;
            try {
                // Save the image file path in the imagePath field
                // const image = "uploads/" + req.file.filename;
                const images = req.files && Array.isArray(req.files)
                    ? req.files.map((file) => "uploads/" + file.filename)
                    : [];
                const product = yield product_1.Product.create({
                    image: images.join("+"),
                    name,
                    age_range,
                    description,
                    price: typeof price === "string" ? strToObj(price) : price,
                    tag,
                    ratings: typeof ratings === "string" ? strToObj(ratings) : ratings,
                    categoryid: category,
                    skillid: skill,
                });
                res
                    .status(201)
                    .json({ message: "Product created successfully", product });
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ error: "Server Error" });
            }
        });
    }
    static deleteProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            if (!req.user || req.user.role !== "admin")
                return res.status(401).json({ error: "Unauthorized" });
            try {
                const { productid } = req.query;
                const productExist = yield product_1.Product.getProductById(productid);
                if (!productExist)
                    return res.status(404).json({ error: "Product can't be identified" });
                //delete image and delete record in the database
                if (yield (0, multer_upload_1.deleteImage)(productExist.image)) {
                    const product = product_1.Product.destroy({
                        where: { id: productExist.id },
                    });
                    res
                        .status(201)
                        .json({ message: "Product deleted successfully", product });
                }
                else {
                    res.status(400).json({ error: "Unable to unlink image" });
                }
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ error: "Server Error" });
            }
        });
    }
    static updateProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            if (!req.user || req.user.role !== "admin")
                return res.status(401).json({ error: "Unauthorized" });
            try {
                const { productid } = req.query;
                const fieldsToupdate = Object.keys(req.body);
                const productExist = yield product_1.Product.getProductById(productid);
                if (!productExist)
                    return res.status(404).json({ error: "Product can't be identified" });
                if (req.files) {
                    const images = req.files && Array.isArray(req.files)
                        ? req.files.map((file) => "uploads/" + file.filename)
                        : [];
                    yield (0, multer_upload_1.deleteImage)(productExist.image);
                    productExist["image"] = images.join("+");
                }
                if (fieldsToupdate.length && productExist) {
                    fieldsToupdate.every((field) => (productExist[field] = req.body[field]));
                }
                const product = yield productExist.save();
                res
                    .status(201)
                    .json({ message: "Product updated successfully", product });
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ error: "Server Error" });
            }
        });
    }
    static filterProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { categories, skills, ages } = req.body;
            const whereConditions = {};
            if (categories && Array.isArray(categories) && categories.length) {
                whereConditions.categoryid = { [sequelize_1.Op.in]: categories };
            }
            if (skills && Array.isArray(skills) && skills.length) {
                whereConditions.skillid = { [sequelize_1.Op.in]: skills };
            }
            if (ages && Array.isArray(ages) && ages.length) {
                whereConditions.age_range = {
                    [sequelize_1.Op.or]: ages.map((age) => ({
                        [sequelize_1.Op.like]: age + "%",
                    })),
                };
            }
            try {
                const products = yield product_1.Product.findAll({
                    where: whereConditions,
                    limit: Object.keys(whereConditions).length ? 100 : 0
                });
                // const finalProducts = parseFields(products,['price,ratings'])
                res.status(201).json(products);
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ error: "Server Error" });
            }
        });
    }
    static fetchProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield product_1.Product.findAll();
                res.status(201).json(products);
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ error: "Server Error" });
            }
        });
    }
    static fetchMostLovedKits(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield product_1.Product.findAll({
                    where: { categoryid: 1, "ratings.rating": { [sequelize_1.Op.gt]: 4.0 } },
                });
                res.status(201).json(products);
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ error: "Server Error" });
            }
        });
    }
    static fetchBeginnersProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield product_1.Product.findAll({
                    where: {
                        name: {
                            [sequelize_1.Op.or]: [
                                { [sequelize_1.Op.like]: "%starter%" },
                                { [sequelize_1.Op.like]: "%level_1%" },
                                { [sequelize_1.Op.like]: "%advanced%" },
                            ],
                        },
                    },
                });
                res.status(201).json(products);
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ error: "Server Error" });
            }
        });
    }
    static fetchEducationalKits(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield product_1.Product.findAll({
                    where: {
                        categoryid: 1,
                    },
                });
                res.status(201).json(products);
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ error: "Server Error" });
            }
        });
    }
    static fetchKitsCourses(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield product_1.Product.findAll({
                    where: {
                        categoryid: 3,
                    },
                });
                res.status(201).json(products);
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ error: "Server Error" });
            }
        });
    }
    static fetchProductImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { url } = req.query;
                res.setHeader('Content-Type', 'image/webp');
                res.status(201).send("dist/" + url);
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ error: "Server Error" });
            }
        });
    }
}
exports.Productroller = Productroller;
