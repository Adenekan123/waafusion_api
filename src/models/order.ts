import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import connection from "../utils/mysql_conn";
import { User } from "./user";
import { Product } from "./product";
import { OrderStatus } from "./order_status";

export class Order extends Model<
  InferAttributes<Order>,
  InferCreationAttributes<Order>
> {
  declare id: CreationOptional<number>;
  declare userid: number;
  declare productid: number;
  declare quantity: number;
  declare totalAmount: number; // Assuming total amount is part of an order
  declare status: CreationOptional<number>;

  static async getOrderById(id: string) {
    return await this.findOne({ where: { id: id } });
  }

  static async getOrdersByUserId(userid: string) {
    return await this.findAll({
      where: { userid: userid },
      include: [{ model: Product, as: "product" }],
    });
  }
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
    totalAmount: {
      type: DataTypes.FLOAT, // Adjust the data type based on your requirements
      allowNull: false,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.INTEGER, // Adjust the data type based on your requirements
      allowNull: false,
      references: {
        model: OrderStatus,
        key: "id",
      },
      defaultValue: 1,
    },
  },
  { sequelize: connection, tableName: "orders" }
);

Order.belongsTo(Product, { foreignKey: "productid", as: "product" });
Order.belongsTo(User, { foreignKey: "userid" });
Order.belongsTo(OrderStatus, { foreignKey: "status", targetKey: "id" });
User.hasMany(Order);

(async () => {
  try {
    await connection.sync();
    console.log("Order table synced");
  } catch (error) {
    console.error("Error syncing Order table:", error);
  }
})();
