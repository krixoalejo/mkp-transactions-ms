import { Request, Response } from "express";
import { TransactionService } from "../services/transactionService";
import { TransactionStatus, TransactionType } from "../entity/transactionEntity";

export class TransactionController {
  private transactionService: TransactionService;

  constructor() {
    this.transactionService = new TransactionService();
  }

  /**
   * Crea una nueva transacción
   * @param req Request
   * @param res Response
   */
  createTransaction = async (req: Request, res: Response): Promise<void> => {
    try {
      const transactionData = req.body;
      const transaction = await this.transactionService.createTransaction(transactionData);
      
      res.status(201).json({
        success: true,
        data: transaction,
        message: "Transacción creada exitosamente"
      });
    } catch (error) {
      console.error("Error al crear la transacción:", error);
      res.status(500).json({
        success: false,
        message: "Error al crear la transacción",
        error: error instanceof Error ? error.message : "Error desconocido"
      });
    }
  };

  /**
   * Obtiene todas las transacciones
   * @param req Request
   * @param res Response
   */
  getAllTransactions = async (req: Request, res: Response): Promise<void> => {
    try {
      const page = req.query.page ? parseInt(req.query.page as string) : 1;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      
      const { transactions, total } = await this.transactionService.getAllTransactions(page, limit);
      
      res.status(200).json({
        success: true,
        data: transactions,
        meta: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit)
        },
        message: "Transacciones obtenidas exitosamente"
      });
    } catch (error) {
      console.error("Error al obtener las transacciones:", error);
      res.status(500).json({
        success: false,
        message: "Error al obtener las transacciones",
        error: error instanceof Error ? error.message : "Error desconocido"
      });
    }
  };

  /**
   * Obtiene una transacción por su ID
   * @param req Request
   * @param res Response
   */
  getTransactionById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const transaction = await this.transactionService.getTransactionById(id);
      
      if (!transaction) {
        res.status(404).json({
          success: false,
          message: `Transacción con ID ${id} no encontrada`
        });
        return;
      }
      
      res.status(200).json({
        success: true,
        data: transaction,
        message: "Transacción obtenida exitosamente"
      });
    } catch (error) {
      console.error(`Error al obtener la transacción con ID ${req.params.id}:`, error);
      res.status(500).json({
        success: false,
        message: "Error al obtener la transacción",
        error: error instanceof Error ? error.message : "Error desconocido"
      });
    }
  };

  /**
   * Actualiza una transacción
   * @param req Request
   * @param res Response
   */
  updateTransaction = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const transactionData = req.body;
      
      const transaction = await this.transactionService.updateTransaction(id, transactionData);
      
      if (!transaction) {
        res.status(404).json({
          success: false,
          message: `Transacción con ID ${id} no encontrada`
        });
        return;
      }
      
      res.status(200).json({
        success: true,
        data: transaction,
        message: "Transacción actualizada exitosamente"
      });
    } catch (error) {
      console.error(`Error al actualizar la transacción con ID ${req.params.id}:`, error);
      res.status(500).json({
        success: false,
        message: "Error al actualizar la transacción",
        error: error instanceof Error ? error.message : "Error desconocido"
      });
    }
  };

  /**
   * Actualiza el estado de una transacción
   * @param req Request
   * @param res Response
   */
  updateTransactionStatus = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      if (!Object.values(TransactionStatus).includes(status)) {
        res.status(400).json({
          success: false,
          message: "Estado de transacción inválido"
        });
        return;
      }
      
      const transaction = await this.transactionService.updateTransactionStatus(id, status);
      
      if (!transaction) {
        res.status(404).json({
          success: false,
          message: `Transacción con ID ${id} no encontrada`
        });
        return;
      }
      
      res.status(200).json({
        success: true,
        data: transaction,
        message: "Estado de transacción actualizado exitosamente"
      });
    } catch (error) {
      console.error(`Error al actualizar el estado de la transacción con ID ${req.params.id}:`, error);
      res.status(500).json({
        success: false,
        message: "Error al actualizar el estado de la transacción",
        error: error instanceof Error ? error.message : "Error desconocido"
      });
    }
  };

  /**
   * Obtiene transacciones por tipo
   * @param req Request
   * @param res Response
   */
  getTransactionsByType = async (req: Request, res: Response): Promise<void> => {
    try {
      const { type } = req.params;
      const page = req.query.page ? parseInt(req.query.page as string) : 1;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      
      if (!Object.values(TransactionType).includes(type as TransactionType)) {
        res.status(400).json({
          success: false,
          message: "Tipo de transacción inválido"
        });
        return;
      }
      
      const { transactions, total } = await this.transactionService.getTransactionsByType(
        type as TransactionType,
        page,
        limit
      );
      
      res.status(200).json({
        success: true,
        data: transactions,
        meta: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit)
        },
        message: `Transacciones de tipo ${type} obtenidas exitosamente`
      });
    } catch (error) {
      console.error(`Error al obtener transacciones de tipo ${req.params.type}:`, error);
      res.status(500).json({
        success: false,
        message: "Error al obtener las transacciones por tipo",
        error: error instanceof Error ? error.message : "Error desconocido"
      });
    }
  };

  /**
   * Elimina una transacción
   * @param req Request
   * @param res Response
   */
  deleteTransaction = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const deleted = await this.transactionService.deleteTransaction(id);
      
      if (!deleted) {
        res.status(404).json({
          success: false,
          message: `Transacción con ID ${id} no encontrada`
        });
        return;
      }
      
      res.status(200).json({
        success: true,
        message: "Transacción eliminada exitosamente"
      });
    } catch (error) {
      console.error(`Error al eliminar la transacción con ID ${req.params.id}:`, error);
      res.status(500).json({
        success: false,
        message: "Error al eliminar la transacción",
        error: error instanceof Error ? error.message : "Error desconocido"
      });
    }
  };
}