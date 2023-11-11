import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import connection from "../utils/mysql_conn";
// import { Product } from "./product";

export class TokenBlacklist extends Model<
  InferAttributes<TokenBlacklist>,
  InferCreationAttributes<TokenBlacklist>
> {
  declare id: CreationOptional<number>;
  declare token: string;


  static async tokenBlacklisted(token: string) {
    return await this.findOne({ where: { token: token } });
  }

}

TokenBlacklist.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { sequelize: connection, tableName: "tokenblacklist" }
);


(async () => {
  try {
    await connection.sync();
    console.log("Token blacklist table synced");
  } catch (error) {
    console.error("Error syncing Token blacklist table:", error);
  }
})();
