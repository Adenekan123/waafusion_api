import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
  } from "sequelize";
  import connection from "../utils/mysql_conn";

  
  export class ProjectType extends Model<
    InferAttributes<ProjectType>,
    InferCreationAttributes<ProjectType>
  > {
    declare id: CreationOptional<number>;
    declare name: string;
   
    
    static async getProjectTypeById(projecttypeid: string) {
      return await this.findOne({ where: { id: projecttypeid } });
    }
  }
  
  ProjectType.init(
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
    { sequelize: connection, tableName: "projecttypes" }
  );
  
  
  // Product.hasMany(Cart);
  
  (async () => {
    try {
      await connection.sync();
      console.log("Projects table synced");
    } catch (error) {
      console.error("Error syncing Projects table:", error);
    }
  })();
  