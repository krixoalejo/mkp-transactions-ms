"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
require("dotenv/config");
const datasource_1 = require("./datasource/datasource");
const transactionRouter_1 = require("./routes/transactionRouter");
const transactionEntity_1 = require("./entity/transactionEntity");
// Registrar entidades manualmente para asegurar que los metadatos estén disponibles
const entities = [transactionEntity_1.TransactionEntity];
console.log("Registered entities:", entities.map(e => e.name));
datasource_1.AppDataSource.initialize()
    .then(() => {
    console.log('Database connection established');
    startServer();
})
    .catch((error) => {
    console.error('Database connection failed', error);
    // Intentar iniciar el servidor de todos modos
    startServer();
});
function startServer() {
    const app = (0, express_1.default)();
    // Middlewares
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((0, cors_1.default)());
    app.use((0, morgan_1.default)('dev'));
    // Routes
    app.use('/api/transactions', transactionRouter_1.userRouter);
    // Health check
    app.get('/health', (req, res) => {
        res.status(200).json({ status: 'OK' });
    });
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
//# sourceMappingURL=index.js.map