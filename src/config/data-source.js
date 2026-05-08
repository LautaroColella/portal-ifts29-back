require("dotenv").config();
const path = require("path");

const { DataSource } = require("typeorm");

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  synchronize: process.env.NODE_ENV === "development",
  logging: process.env.DEBUG === "true",

  entities: [path.join(__dirname, "/../entities/*.js")],
});

module.exports = AppDataSource;
