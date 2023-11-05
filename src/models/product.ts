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
  declare price: { curr: number; prev: number; discount: number };
  declare ratings: { rating: number; total_reviews: number };

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
    },
    ratings: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  { sequelize: connection, tableName: "products" }
);

Product.belongsTo(ProductCategory, { foreignKey: "categoryid" });
Product.belongsTo(ProductSkills, { foreignKey: "skillid" });

// Product.hasMany(Cart);

(async () => {
  try {
    await connection.sync();
    console.log("products table synced");
  } catch (error) {
    console.error("Error syncing User table:", error);
  }
})();
