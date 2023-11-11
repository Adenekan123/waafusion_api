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
exports.Order = void 0;
const sequelize_1 = require("sequelize");
const mysql_conn_1 = __importDefault(require("../utils/mysql_conn"));
const user_1 = require("./user");
class Order extends sequelize_1.Model {
    static getOrderById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.findOne({ where: { id: id } });
        });
    }
    static getOrdersByUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.findAll({ where: { userid: id }, include: [user_1.User] });
        });
    }
    static getOrdersByVisitors() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.findAll({ where: { userid: 0 } });
        });
    }
}
exports.Order = Order;
Order.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userid: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
        references: {
            model: user_1.User,
            key: "id",
        },
    },
    productid: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false,
        get: function () {
            return typeof this.getDataValue("productid") === "string"
                ? JSON.parse(this.getDataValue("productid"))
                : this.getDataValue("productid");
        },
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    phone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    state: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    total: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
    },
}, { sequelize: mysql_conn_1.default, tableName: "order" });
Order.belongsTo(user_1.User, { foreignKey: "userid" });
user_1.User.hasMany(Order);
// Product.belongsToMany(Order, { through: Cart });
// Order.belongsToMany(Product, { through: Cart });
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mysql_conn_1.default.sync();
        console.log("Order table synced");
    }
    catch (error) {
        console.error("Error syncing Order table:", error);
    }
}))();
