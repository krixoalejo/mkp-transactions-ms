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
datasource_1.AppDataSource.initialize()
    .then(() => {
    console.log('Database connection established');
})
    .catch((error) => {
    console.error('Database connection failed', error);
});
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
//# sourceMappingURL=index.js.map