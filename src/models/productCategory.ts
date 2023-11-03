import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import connection from "../utils/mysql_conn";
// import { Product } from "./product";

export class ProductCategory extends Model<
  InferAttributes<ProductCategory>,
  InferCreationAttributes<ProductCategory>
> {
  declare id: CreationOptional<number>;
  declare name: string;

  static async getCategoryByName(name: string) {
    return await this.findOne({ where: { name: name } });
  }
  static async getCategoryById(id: string) {
    return await this.findOne({ where: { id: id } });
  }
}

ProductCategory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize: connection, tableName: "productcategories" }
);


(async () => {
  try {
    await connection.sync();
    console.log("product category table synced");
  } catch (error) {
    console.error("Error syncing product category table:", error);
  }
})();
