import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import connection from "../utils/mysql_conn";
import { User } from "./user";

export class Order extends Model<
  InferAttributes<Order>,
  InferCreationAttributes<Order>
> {
  declare id: CreationOptional<number>;
  declare userid: CreationOptional<number>;
  declare productid: string;
  declare name: CreationOptional<string>;
  declare phone: CreationOptional<string>;
  declare email: CreationOptional<string>;
  declare address: CreationOptional<string>;
  declare state: CreationOptional<string>;
  declare total: number;

  static async getOrderById(id: string) {
    return await this.findOne({ where: { id: id } });
  }
  static async getOrdersByUser(id: string) {
    return await this.findAll({ where: { userid: id }, include: [User] });
  }
  static async getOrdersByVisitors() {
    return await this.findAll({ where: { userid: 0 } });
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
      defaultValue: 0,
      references: {
        model: User,
        key: "id",
      },
    },
    productid: {
      type: DataTypes.JSON,
      allowNull: false,
      get: function () {
        return typeof this.getDataValue("productid") === "string"
          ? JSON.parse(this.getDataValue("productid"))
          : this.getDataValue("productid");
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
  },
  { sequelize: connection, tableName: "order" }
);

Order.belongsTo(User, { foreignKey: "userid" });
User.hasMany(Order);

// Product.belongsToMany(Order, { through: Cart });
// Order.belongsToMany(Product, { through: Cart });

(async () => {
  try {
    await connection.sync();
    console.log("Order table synced");
  } catch (error) {
    console.error("Error syncing Order table:", error);
  }
})();
