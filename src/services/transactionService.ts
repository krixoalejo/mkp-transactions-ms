import { AppDataSource } from "../datasource/datasource";
import { TransactionEntity, TransactionStatus, TransactionType } from "../entity/transactionEntity";
import { Repository } from "typeorm";

export class TransactionService {
  private transactionRepository: Repository<TransactionEntity>;

  constructor() {
    this.transactionRepository = AppDataSource.getRepository(TransactionEntity);
  }

  /**
   * Crea una nueva transacción
   * @param transactionData Datos de la transacción
   * @returns La transacción creada
   */
  async createTransaction(transactionData: Partial<TransactionEntity>): Promise<TransactionEntity> {
    await fetch("https://fraud-prevention-api-fuylmr6llq-uc.a.run.app/api/fraud-preventions", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        transactionId: transactionData.id,
        userIp: transactionData.userIp,
        userId: transactionData.userId,
        additionalData: {
          amount: transactionData.amount,
          currency: transactionData.currency,
          paymentMethod: transactionData.paymentMethod,
        }
      }),
    });
    const transaction = this.transactionRepository.create(transactionData);
    return await this.transactionRepository.save(transaction);
  }

  /**
   * Obtiene todas las transacciones con opciones de paginación
   * @param page Número de página
   * @param limit Número de elementos por página
   * @returns Lista de transacciones
   */
  async getAllTransactions(page: number = 1, limit: number = 10): Promise<{ transactions: TransactionEntity[], total: number }> {
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
  async getTransactionById(id: string): Promise<TransactionEntity | null> {
    return await this.transactionRepository.findOneBy({ id });
  }

  /**
   * Actualiza una transacción existente
   * @param id ID de la transacción
   * @param transactionData Datos a actualizar
   * @returns La transacción actualizada
   */
  async updateTransaction(id: string, transactionData: Partial<TransactionEntity>): Promise<TransactionEntity | null> {
    await this.transactionRepository.update(id, transactionData);
    return await this.getTransactionById(id);
  }

  /**
   * Actualiza el estado de una transacción
   * @param id ID de la transacción
   * @param status Nuevo estado
   * @returns La transacción actualizada
   */
  async updateTransactionStatus(id: string, status: TransactionStatus): Promise<TransactionEntity | null> {
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
  async getTransactionsByType(
    type: TransactionType,
    page: number = 1,
    limit: number = 10
  ): Promise<{ transactions: TransactionEntity[], total: number }> {
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
  async deleteTransaction(id: string): Promise<boolean> {
    const result = await this.transactionRepository.delete(id);
    return typeof result.affected === "number" && result.affected > 0;
  }
}