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
exports.Project = void 0;
const sequelize_1 = require("sequelize");
const mysql_conn_1 = __importDefault(require("../utils/mysql_conn"));
const projectType_1 = require("./projectType");
const user_1 = require("./user");
class Project extends sequelize_1.Model {
    static getProjectById(projectid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.findOne({ where: { id: projectid } });
        });
    }
}
exports.Project = Project;
Project.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    projecttypeid: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: projectType_1.ProjectType,
            key: "id",
        },
    },
    userid: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: user_1.User,
            key: "id",
        },
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    images: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    videos: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    kits: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false,
        get: function () {
            return typeof this.getDataValue("kits") === "string"
                ? JSON.parse(this.getDataValue("kits"))
                : this.getDataValue("kits");
        },
    },
    software: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false,
        get: function () {
            return typeof this.getDataValue("software") === "string"
                ? JSON.parse(this.getDataValue("software"))
                : this.getDataValue("software");
        },
    },
    collaborators: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false,
        get: function () {
            return typeof this.getDataValue("collaborators") === "string"
                ? JSON.parse(this.getDataValue("collaborators"))
                : this.getDataValue("collaborators");
        },
    },
    access: {
        type: sequelize_1.DataTypes.ENUM({ values: ["public", "private"] }),
        allowNull: false,
        defaultValue: "public",
    },
}, { sequelize: mysql_conn_1.default, tableName: "projects" });
Project.belongsTo(projectType_1.ProjectType, { foreignKey: "projecttypeid" });
// Product.hasMany(Cart);
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mysql_conn_1.default.sync();
        console.log("Projects table synced");
    }
    catch (error) {
        console.error("Error syncing Projects table:", error);
    }
}))();
