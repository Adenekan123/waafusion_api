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
exports.Cart = void 0;
const sequelize_1 = require("sequelize");
const mysql_conn_1 = __importDefault(require("../utils/mysql_conn"));
const product_1 = require("./product");
const user_1 = require("./user");
class Cart extends sequelize_1.Model {
    static getCartById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.findOne({ where: { id: id } });
        });
    }
    static getCarts(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.findAll({ where: { userid: id }, include: [product_1.Product] });
        });
    }
    static getCart(productid, userid) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log({ productid, userid });
            return yield this.findOne({
                where: { userid, productid },
                include: [product_1.Product],
            });
        });
    }
    static getCartByProductId(productid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.findOne({
                where: { productid: productid },
            });
        });
    }
}
exports.Cart = Cart;
Cart.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userid: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: user_1.User,
            key: "id",
        },
    },
    productid: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: product_1.Product,
            key: "id",
        },
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
}, { sequelize: mysql_conn_1.default, tableName: "cart" });
Cart.belongsTo(product_1.Product, { foreignKey: "productid" });
Cart.belongsTo(user_1.User, { foreignKey: "userid" });
user_1.User.hasMany(Cart);
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mysql_conn_1.default.sync();
        console.log("Cart table synced");
    }
    catch (error) {
        console.error("Error syncing Cart table:", error);
    }
}))();
