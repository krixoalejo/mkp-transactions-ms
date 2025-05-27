import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import 'dotenv/config';
import { AppDataSource } from "./datasource/datasource";
import { userRouter } from './routes/transactionRouter';
import { TransactionEntity } from './entity/transactionEntity';

// Registrar entidades manualmente para asegurar que los metadatos estén disponibles
const entities = [TransactionEntity];
console.log("Registered entities:", entities.map(e => e.name));

AppDataSource.initialize()
  .then(() => {
    console.log('Database connection established');
    startServer();
  })
  .catch((error: Error) => {
    console.error('Database connection failed', error);
    // Intentar iniciar el servidor de todos modos
    startServer();
  });

function startServer() {
  const app = express();  

  // Middlewares
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(morgan('dev'));

  // Routes
  app.use('/api/transactions', userRouter);

  // Health check
  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
  });

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}