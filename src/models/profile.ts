import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import connection from "../utils/mysql_conn";
import { User } from "./user";

export class Profile extends Model<
  InferAttributes<Profile>,
  InferCreationAttributes<Profile>
> {
  declare id: CreationOptional<number>;
  declare userid: string;
  declare description: string;
  declare image: CreationOptional<string>;
  // declare courses: string;

  static async getUserProfile (userid:string){
    return this.findOne({where:{userid}})
  }
}

Profile.init(
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
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // courses: {
    //   type: DataTypes.JSON,
    //   allowNull: false,
    //   get: function () {
    //     return typeof this.getDataValue("courses") === "string"
    //       ? JSON.parse(this.getDataValue("courses"))
    //       : this.getDataValue("courses");
    //   },
    // },
  },
  { sequelize: connection, tableName: "profile" }
);
Profile.belongsTo(User, { foreignKey: "userid" });
(async () => {
  try {
    await connection.sync();
    console.log("Profile table synced");
  } catch (error) {
    console.error("Error syncing Profile table:", error);
  }
})();
