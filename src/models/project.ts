import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import connection from "../utils/mysql_conn";
import { ProjectType } from "./projectType";
import { User } from "./user";

export class Project extends Model<
  InferAttributes<Project>,
  InferCreationAttributes<Project>
> {
  declare id: CreationOptional<number>;
  declare projecttypeid: number;
  declare userid: number;
  declare title: string;
  declare description: string;
  declare images: string;
  declare videos: string;
  declare kits: string;
  declare software: string;
  declare collaborators: string;
  declare access: string;

  static async getProjectById(projectid: string) {
    return await this.findOne({ where: { id: projectid } });
  }
}

Project.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    projecttypeid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ProjectType,
        key: "id",
      },
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    images: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    videos: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    kits: {
      type: DataTypes.JSON,
      allowNull: false,
      get: function () {
        return typeof this.getDataValue("kits") === "string"
          ? JSON.parse(this.getDataValue("kits"))
          : this.getDataValue("kits");
      },
    },
    software: {
      type: DataTypes.JSON,
      allowNull: false,
      get: function () {
        return typeof this.getDataValue("software") === "string"
          ? JSON.parse(this.getDataValue("software"))
          : this.getDataValue("software");
      },
    },
    collaborators: {
      type: DataTypes.JSON,
      allowNull: false,
      get: function () {
        return typeof this.getDataValue("collaborators") === "string"
          ? JSON.parse(this.getDataValue("collaborators"))
          : this.getDataValue("collaborators");
      },
    },
    access: {
      type: DataTypes.ENUM({ values: ["public", "private"] }),
      allowNull: false,
      defaultValue: "public",
    },
  },
  { sequelize: connection, tableName: "projects" }
);

Project.belongsTo(ProjectType, { foreignKey: "projecttypeid" });

// Product.hasMany(Cart);

(async () => {
  try {
    await connection.sync();
    console.log("Projects table synced");
  } catch (error) {
    console.error("Error syncing Projects table:", error);
  }
})();
