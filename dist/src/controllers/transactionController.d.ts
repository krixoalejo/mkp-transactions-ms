import { Request, Response } from "express";
export declare class TransactionController {
    private transactionService;
    constructor();
    /**
     * Crea una nueva transacción
     * @param req Request
     * @param res Response
     */
    createTransaction: (req: Request, res: Response) => Promise<void>;
    /**
     * Obtiene todas las transacciones
     * @param req Request
     * @param res Response
     */
    getAllTransactions: (req: Request, res: Response) => Promise<void>;
    /**
     * Obtiene una transacción por su ID
     * @param req Request
     * @param res Response
     */
    getTransactionById: (req: Request, res: Response) => Promise<void>;
    /**
     * Actualiza una transacción
     * @param req Request
     * @param res Response
     */
    updateTransaction: (req: Request, res: Response) => Promise<void>;
    /**
     * Actualiza el estado de una transacción
     * @param req Request
     * @param res Response
     */
    updateTransactionStatus: (req: Request, res: Response) => Promise<void>;
    /**
     * Obtiene transacciones por tipo
     * @param req Request
     * @param res Response
     */
    getTransactionsByType: (req: Request, res: Response) => Promise<void>;
    /**
     * Elimina una transacción
     * @param req Request
     * @param res Response
     */
    deleteTransaction: (req: Request, res: Response) => Promise<void>;
}
