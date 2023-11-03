import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import connection from "../utils/mysql_conn";

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<number>;
  declare username: string;
  declare email: string;
  declare phone: string;
  declare password: string;
  declare role:CreationOptional<string>;

  static async getUserByEmail (email:string){
    return this.findOne({where:{email}})
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING(16),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role:{
        type:DataTypes.STRING,
        defaultValue:'partner'
    }
  },
  { sequelize: connection, tableName: "users" }
);

(async () => {
  try {
    await connection.sync();
    console.log("User table synced");
  } catch (error) {
    console.error("Error syncing User table:", error);
  }
})();