import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { TransactionEntity } from "../entity/transactionEntity";
import path from "path";

// Cargar variables de entorno
dotenv.config();

// Configuración para entorno de desarrollo local o producción
const isProduction = process.env.NODE_ENV === "production";
const isCloudRun = process.env.K_SERVICE !== undefined;

// Configurar entidades según el entorno
const entities = isProduction 
  ? [path.join(__dirname, "..", "entity", "*.js")]
  : [TransactionEntity];

export const AppDataSource = new DataSource({
  type: "mysql",
  host: isCloudRun 
    ? process.env.DB_SOCKET_PATH || "/cloudsql/logical-grammar-438423-b8:us-central1:db-transactions"
    : process.env.DB_HOST || "localhost",
  port: isCloudRun ? undefined : parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_DATABASE || "transaction_db",
  synchronize: true,
  logging: process.env.NODE_ENV === "development",
  entities: entities,
  extra: isCloudRun 
    ? {
        socketPath: process.env.DB_SOCKET_PATH || "/cloudsql/logical-grammar-438423-b8:us-central1:db-transactions"
      } 
    : undefined
});
