import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import connection from "../utils/mysql_conn";
// import { Product } from "./product";

export class ProductSkills extends Model<
  InferAttributes<ProductSkills>,
  InferCreationAttributes<ProductSkills>
> {
  declare id: CreationOptional<number>;
  declare name: string;

  static async getCSkillByName(name: string) {
    return await this.findOne({ where: { name: name } });
  }
  static async getCSkillById(id: string) {
    return await this.findOne({ where: { id: id } });
  }
}

ProductSkills.init(
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
  { sequelize: connection, tableName: "productskills" }
);


(async () => {
  try {
    await connection.sync();
    console.log("product skills table synced");
  } catch (error) {
    console.error("Error syncing product skills table:", error);
  }
})();
