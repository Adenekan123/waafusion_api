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
exports.ProductCategory = void 0;
const sequelize_1 = require("sequelize");
const mysql_conn_1 = __importDefault(require("../utils/mysql_conn"));
class ProductCategory extends sequelize_1.Model {
    static getProductById(productid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.findOne({ where: { id: productid } });
        });
    }
}
exports.ProductCategory = ProductCategory;
ProductCategory.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, { sequelize: mysql_conn_1.default, tableName: "productcategories" });
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mysql_conn_1.default.sync();
        console.log("product category table synced");
    }
    catch (error) {
        console.error("Error syncing User table:", error);
    }
}))();
