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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const sequelize_1 = require("sequelize");
const mysql_conn_1 = __importDefault(require("../utils/mysql_conn"));
const productCategory_1 = require("./productCategory");
class Product extends sequelize_1.Model {
    static getProductById(productid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.findOne({ where: { id: productid } });
        });
    }
}
exports.Product = Product;
Product.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    categoryid: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: productCategory_1.ProductCategory,
            key: "id",
        },
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    tag: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    age_range: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false,
    },
    ratings: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false,
    },
}, { sequelize: mysql_conn_1.default, tableName: "products" });
Product.belongsTo(productCategory_1.ProductCategory, { foreignKey: 'categoryid' });
// Product.hasMany(Cart);
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mysql_conn_1.default.sync();
        console.log("products table synced");
    }
    catch (error) {
        console.error("Error syncing User table:", error);
    }
}))();
