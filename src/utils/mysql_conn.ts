import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// create a new MySQL connection
const connection = new Sequelize(
  process.env.DB_NAME || "",
  process.env.DB_USER || "",
  process.env.DB_PASSWORD,
  {
    dialect: "mysql",
    host: process.env.DB_HOST,
  }
);
// connect to the MySQL database
connection
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// close the MySQL connection
// connection.close();

export default connection;
