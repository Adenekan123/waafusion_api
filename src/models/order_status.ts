import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import connection from "../utils/mysql_conn";


export class OrderStatus extends Model<
  InferAttributes<OrderStatus>,
  InferCreationAttributes<OrderStatus>
> {
  declare id: CreationOptional<number>;
  declare status: string;
}

OrderStatus.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },   
    status: {
      type: DataTypes.STRING, // Adjust the data type based on your requirements
      allowNull: false,
      defaultValue: "pending",
    },
  },
  { sequelize: connection, tableName: "order_status" }
);

(async () => {
  try {
    await connection.sync();
    console.log("Order table synced");
  } catch (error) {
    console.error("Error syncing Order table:", error);
  }
})();