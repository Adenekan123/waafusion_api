import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import connection from "../utils/mysql_conn";
import { ProductCategory } from "./productCategory";
import { ProductSkills } from "./skills";

export class Product extends Model<
  InferAttributes<Product>,
  InferCreationAttributes<Product>
> {
  declare id: CreationOptional<number>;
  declare categoryid: number;
  declare skillid: number;
  declare name: string;
  declare tag: string;
  declare age_range: string;
  declare image: string;
  declare price: string;
  declare description: string;
  //  { curr: number; prev: number; discount: number };
  declare ratings: string;
  //  { rating: number; total_reviews: number };
  static async getProductById(productid: string) {
    return await this.findOne({ where: { id: productid } });
  }
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    categoryid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ProductCategory,
        key: "id",
      },
    },
    skillid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ProductSkills,
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tag: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age_range: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.JSON,
      allowNull: false,
      get: function () {
        return typeof this.getDataValue("price") === "string"
          ? JSON.parse(this.getDataValue("price"))
          : this.getDataValue("price");
      },
    },
    ratings: {
      type: DataTypes.JSON,
      allowNull: false,
      get: function () {
        return typeof this.getDataValue("ratings") === "string"
          ? JSON.parse(this.getDataValue("ratings"))
          : this.getDataValue("ratings");
      },
    },
  },
  { sequelize: connection, tableName: "products" }
);

Product.belongsTo(ProductCategory, { foreignKey: "categoryid" });
Product.belongsTo(ProductSkills, { foreignKey: "skillid" });


(async () => {
  try {
    await connection.sync();
    console.log("products table synced");
  } catch (error) {
    console.error("Error syncing User table:", error);
  }
})();
