import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import connection from "../utils/mysql_conn";
import { Product } from "./product";
import { User } from "./user";

export class Cart extends Model<
  InferAttributes<Cart>,
  InferCreationAttributes<Cart>
> {
  declare id: CreationOptional<number>;
  declare userid: number;
  declare productid: number;
  declare quantity: string;

  static async getCartById(id: string) {
    return await this.findOne({ where: { id: id } });
  }
  static async getCarts(id: string) {
    return await this.findAll({
      where: { userid: id },
      include: [{ model: Product, as: "product" }],
    });
  }
  static async getCart(productid: string, userid: string) {
    return await this.findOne({
      where: { userid, productid },
      include: [Product],
    });
  }
  static async emptyCart(userid: string) {
    return await this.destroy({
      where: { userid },
    });
  }
  static async getCartByProductId(productid: string) {
    return await this.findOne({
      where: { productid: productid },
    });
  }
}

Cart.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    productid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Product,
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  { sequelize: connection, tableName: "cart" }
);

Cart.belongsTo(Product, { foreignKey: "productid", as: "product" });

Cart.belongsTo(User, { foreignKey: "userid" });
User.hasMany(Cart);

(async () => {
  try {
    await connection.sync();
    console.log("Cart table synced");
  } catch (error) {
    console.error("Error syncing Cart table:", error);
  }
})();
