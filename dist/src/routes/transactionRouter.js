"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const transactionController_1 = require("../controllers/transactionController");
exports.userRouter = (0, express_1.Router)();
const transactionController = new transactionController_1.TransactionController();
// GET all users
exports.userRouter.get('/', transactionController.getAllTransactions);
// GET a single user by ID
exports.userRouter.get('/:id', transactionController.getTransactionById);
// POST create a new user
exports.userRouter.post('/', transactionController.createTransaction);
// PUT update a user
exports.userRouter.put('/:id', transactionController.updateTransaction);
// DELETE a user
exports.userRouter.delete('/:id', transactionController.deleteTransaction);
//# sourceMappingURL=transactionRouter.js.map