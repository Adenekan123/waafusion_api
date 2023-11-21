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
exports.visitorOrder = void 0;
const sequelize_1 = require("sequelize");
const mysql_conn_1 = __importDefault(require("../utils/mysql_conn"));
const product_1 = require("./product");
const order_status_1 = require("./order_status");
class visitorOrder extends sequelize_1.Model {
    static getOrderById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.findOne({ where: { id: id } });
        });
    }
    static getOrders(email, name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.findAll({ where: { email, name }, include: [{ model: product_1.Product, as: "product" }] });
        });
    }
}
exports.visitorOrder = visitorOrder;
visitorOrder.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
    totalAmount: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
    },
    name: {
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
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    state: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: order_status_1.OrderStatus,
            key: "id"
        },
        defaultValue: 1
    },
}, { sequelize: mysql_conn_1.default, tableName: "visitor_orders" });
visitorOrder.belongsTo(product_1.Product, { foreignKey: "productid", as: "product" });
visitorOrder.belongsTo(order_status_1.OrderStatus, { foreignKey: "status", targetKey: "id" });
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mysql_conn_1.default.sync();
        console.log("Order table synced");
    }
    catch (error) {
        console.error("Error syncing Order table:", error);
    }
}))();