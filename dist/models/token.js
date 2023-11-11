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
exports.TokenBlacklist = void 0;
const sequelize_1 = require("sequelize");
const mysql_conn_1 = __importDefault(require("../utils/mysql_conn"));
// import { Product } from "./product";
class TokenBlacklist extends sequelize_1.Model {
    static tokenBlacklisted(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.findOne({ where: { token: token } });
        });
    }
}
exports.TokenBlacklist = TokenBlacklist;
TokenBlacklist.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    token: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
}, { sequelize: mysql_conn_1.default, tableName: "tokenblacklist" });
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mysql_conn_1.default.sync();
        console.log("Token blacklist table synced");
    }
    catch (error) {
        console.error("Error syncing Token blacklist table:", error);
    }
}))();
