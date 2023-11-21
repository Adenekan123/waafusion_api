import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import connection from "../utils/mysql_conn";
import { Product } from "./product";
import { OrderStatus } from "./order_status";

export class visitorOrder extends Model<
  InferAttributes<visitorOrder>,
  InferCreationAttributes<visitorOrder>
> {
  declare id: CreationOptional<number>;
  declare productid: number;
  declare quantity: string;
  declare totalAmount: number; // Assuming total amount is part of an order
  declare name: CreationOptional<string>;
  declare phone: CreationOptional<string>;
  declare email: CreationOptional<string>;
  declare address: CreationOptional<string>;
  declare state: CreationOptional<string>;
  declare status: CreationOptional<number>;


  static async getOrderById(id: string) {
    return await this.findOne({ where: { id: id } });
  }

  static async getOrders(email: string,name:string) {
    return await this.findAll({ where: { email,name }, include: [{ model: Product, as: "product" }] });
  }


}

visitorOrder.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    name: {
      type: DataTypes.STRING, // Adjust the data type based on your requirements
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING, // Adjust the data type based on your requirements
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING, // Adjust the data type based on your requirements
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING, // Adjust the data type based on your requirements
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING, // Adjust the data type based on your requirements
      allowNull: true,
    },
    status: {
      type: DataTypes.INTEGER, // Adjust the data type based on your requirements
      allowNull: false,
      references:{
        model:OrderStatus,
        key:"id"
      },
      defaultValue:1
    },
  },
  { sequelize: connection, tableName: "visitor_orders" }
);

visitorOrder.belongsTo(Product, { foreignKey: "productid", as: "product" });
visitorOrder.belongsTo(OrderStatus,{foreignKey:"status",targetKey:"id"});


(async () => {
  try {
    await connection.sync();
    console.log("Order table synced");
  } catch (error) {
    console.error("Error syncing Order table:", error);
  }
})();