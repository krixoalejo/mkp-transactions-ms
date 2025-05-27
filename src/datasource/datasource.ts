import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { TransactionEntity } from "../entity/transactionEntity";
import path from "path";
import mysql from "mysql2/promise";

// Cargar variables de entorno
dotenv.config();

// Configuración para entorno de desarrollo local o producción
const isProduction = process.env.NODE_ENV === "production";
const isCloudRun = process.env.K_SERVICE !== undefined;

console.log("Environment:", {
  isProduction,
  isCloudRun,
  NODE_ENV: process.env.NODE_ENV,
  K_SERVICE: process.env.K_SERVICE,
  dirname: __dirname
});

// Configurar entidades según el entorno
let entities;
if (isProduction) {
  const entityPath = path.join(__dirname, "..", "entity", "*.js");
  console.log("Entity path:", entityPath);
  entities = [entityPath, TransactionEntity];
} else {
  entities = [TransactionEntity];
}

// Función para crear la base de datos si no existe
async function createDatabaseIfNotExists() {
  try {
    const host = isCloudRun 
      ? process.env.DB_SOCKET_PATH || "/cloudsql/logical-grammar-438423-b8:us-central1:db-transactions"
      : process.env.DB_HOST || "localhost";
    
    const connectionConfig: any = {
      host: host,
      user: process.env.DB_USERNAME || "root",
      password: process.env.DB_PASSWORD || "root",
      database: "mysql", // Conectar a la base de datos mysql que siempre existe
    };
    
    if (isCloudRun) {
      // Para Cloud SQL con socket
      connectionConfig.socketPath = host;
    } else {
      // Para conexiones TCP normales
      connectionConfig.port = parseInt(process.env.DB_PORT || "3306");
    }
    
    console.log("Trying to connect to MySQL to create database if not exists...");
    const connection = await mysql.createConnection(connectionConfig);
    
    // Crear la base de datos si no existe
    const dbName = process.env.DB_DATABASE || "transaction_db";
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
    console.log(`Database ${dbName} created or already exists`);
    
    await connection.end();
  } catch (error) {
    console.error("Error creating database:", error);
    // Continuar con la inicialización normal incluso si falla la creación
  }
}

// Crear la base de datos antes de inicializar TypeORM
createDatabaseIfNotExists();

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
  logging: true, // Habilitar logging para diagnóstico
  entities: entities,
  extra: isCloudRun 
    ? {
        socketPath: process.env.DB_SOCKET_PATH || "/cloudsql/logical-grammar-438423-b8:us-central1:db-transactions"
      } 
    : undefined
});
