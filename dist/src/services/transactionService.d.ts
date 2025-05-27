import { TransactionEntity, TransactionStatus, TransactionType } from "../entity/transactionEntity";
export declare class TransactionService {
    private transactionRepository;
    constructor();
    /**
     * Crea una nueva transacción
     * @param transactionData Datos de la transacción
     * @returns La transacción creada
     */
    createTransaction(transactionData: Partial<TransactionEntity>): Promise<TransactionEntity>;
    /**
     * Obtiene todas las transacciones con opciones de paginación
     * @param page Número de página
     * @param limit Número de elementos por página
     * @returns Lista de transacciones
     */
    getAllTransactions(page?: number, limit?: number): Promise<{
        transactions: TransactionEntity[];
        total: number;
    }>;
    /**
     * Obtiene una transacción por su ID
     * @param id ID de la transacción
     * @returns La transacción encontrada o null si no existe
     */
    getTransactionById(id: string): Promise<TransactionEntity | null>;
    /**
     * Actualiza una transacción existente
     * @param id ID de la transacción
     * @param transactionData Datos a actualizar
     * @returns La transacción actualizada
     */
    updateTransaction(id: string, transactionData: Partial<TransactionEntity>): Promise<TransactionEntity | null>;
    /**
     * Actualiza el estado de una transacción
     * @param id ID de la transacción
     * @param status Nuevo estado
     * @returns La transacción actualizada
     */
    updateTransactionStatus(id: string, status: TransactionStatus): Promise<TransactionEntity | null>;
    /**
     * Busca transacciones por tipo
     * @param type Tipo de transacción
     * @param page Número de página
     * @param limit Número de elementos por página
     * @returns Lista de transacciones
     */
    getTransactionsByType(type: TransactionType, page?: number, limit?: number): Promise<{
        transactions: TransactionEntity[];
        total: number;
    }>;
    /**
     * Elimina una transacción
     * @param id ID de la transacción
     * @returns true si se eliminó correctamente, false si no
     */
    deleteTransaction(id: string): Promise<boolean>;
}
