"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
const transactionEntity_1 = require("../entity/transactionEntity");
const path_1 = __importDefault(require("path"));
// Cargar variables de entorno
dotenv_1.default.config();
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
    const entityPath = path_1.default.join(__dirname, "..", "entity", "*.js");
    console.log("Entity path:", entityPath);
    entities = [entityPath, transactionEntity_1.TransactionEntity];
}
else {
    entities = [transactionEntity_1.TransactionEntity];
}
exports.AppDataSource = new typeorm_1.DataSource({
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
//# sourceMappingURL=datasource.js.map