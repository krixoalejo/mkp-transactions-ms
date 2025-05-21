import { Router } from 'express';
import { TransactionController } from '../controllers/transactionController';

export const userRouter = Router();
const transactionController = new TransactionController();

// GET all users
userRouter.get('/', transactionController.getAllTransactions);

// GET a single user by ID
userRouter.get('/:id', transactionController.getTransactionById);

// POST create a new user
userRouter.post('/', transactionController.createTransaction);

// PUT update a user
userRouter.put('/:id', transactionController.updateTransaction);

// DELETE a user
userRouter.delete('/:id', transactionController.deleteTransaction);