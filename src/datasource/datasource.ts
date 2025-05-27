import { DataSource } from "typeorm";
import dotenv from "dotenv";

// Cargar variables de entorno
dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "db-transactions",
  port: parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_DATABASE || "transaction_db",
  synchronize: process.env.NODE_ENV ? true : false,
  logging: process.env.NODE_ENV === "development",
  entities: ["src/entity/*.ts"],
});
