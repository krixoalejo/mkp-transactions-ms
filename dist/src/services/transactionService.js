"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionService = void 0;
const datasource_1 = require("../datasource/datasource");
const transactionEntity_1 = require("../entity/transactionEntity");
class TransactionService {
    constructor() {
        this.transactionRepository = datasource_1.AppDataSource.getRepository(transactionEntity_1.TransactionEntity);
    }
    /**
     * Crea una nueva transacción
     * @param transactionData Datos de la transacción
     * @returns La transacción creada
     */
    async createTransaction(transactionData) {
        try {
            const transaction = this.transactionRepository.create(transactionData);
            const savedTransaction = await this.transactionRepository.save(transaction);
            const response = await fetch("https://fraud-prevention-api-fuylmr6llq-uc.a.run.app/api/fraud-preventions", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    transactionId: savedTransaction.id,
                    userIp: transactionData.userIp,
                    userId: transactionData.userId,
                    additionalData: {
                        amount: transactionData.amount,
                        currency: transactionData.currency,
                        paymentMethod: transactionData.paymentMethod,
                    }
                }),
            });
            const responseData = await response.json();
            if (!response.ok) {
                console.log({ responseData: responseData.detail[0] });
                throw new Error("Error en la validación de fraude");
            }
            else {
                console.log("Transacción validada correctamente");
                console.log({ responseData });
            }
            return savedTransaction;
        }
        catch (error) {
            console.error("Error en la validación de fraude:", error);
            throw error;
            // Continuar con la creación de la transacción incluso si la validación de fraude falla
            // const transaction = this.transactionRepository.create(transactionData);
            // return await this.transactionRepository.save(transaction);
        }
    }
    /**
     * Obtiene todas las transacciones con opciones de paginación
     * @param page Número de página
     * @param limit Número de elementos por página
     * @returns Lista de transacciones
     */
    async getAllTransactions(page = 1, limit = 10) {
        const [transactions, total] = await this.transactionRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            order: {
                createdAt: "DESC"
            }
        });
        return { transactions, total };
    }
    /**
     * Obtiene una transacción por su ID
     * @param id ID de la transacción
     * @returns La transacción encontrada o null si no existe
     */
    async getTransactionById(id) {
        return await this.transactionRepository.findOneBy({ id });
    }
    /**
     * Actualiza una transacción existente
     * @param id ID de la transacción
     * @param transactionData Datos a actualizar
     * @returns La transacción actualizada
     */
    async updateTransaction(id, transactionData) {
        await this.transactionRepository.update(id, transactionData);
        return await this.getTransactionById(id);
    }
    /**
     * Actualiza el estado de una transacción
     * @param id ID de la transacción
     * @param status Nuevo estado
     * @returns La transacción actualizada
     */
    async updateTransactionStatus(id, status) {
        await this.transactionRepository.update(id, { status });
        return await this.getTransactionById(id);
    }
    /**
     * Busca transacciones por tipo
     * @param type Tipo de transacción
     * @param page Número de página
     * @param limit Número de elementos por página
     * @returns Lista de transacciones
     */
    async getTransactionsByType(type, page = 1, limit = 10) {
        const [transactions, total] = await this.transactionRepository.findAndCount({
            where: { type },
            skip: (page - 1) * limit,
            take: limit,
            order: {
                createdAt: "DESC"
            }
        });
        return { transactions, total };
    }
    /**
     * Elimina una transacción
     * @param id ID de la transacción
     * @returns true si se eliminó correctamente, false si no
     */
    async deleteTransaction(id) {
        const result = await this.transactionRepository.delete(id);
        return typeof result.affected === "number" && result.affected > 0;
    }
}
exports.TransactionService = TransactionService;
//# sourceMappingURL=transactionService.js.map