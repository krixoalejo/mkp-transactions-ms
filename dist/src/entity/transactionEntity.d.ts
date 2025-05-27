export declare enum TransactionType {
    DEPOSIT = "deposit",
    WITHDRAWAL = "withdrawal",
    TRANSFER = "transfer",
    PAYMENT = "payment"
}
export declare enum TransactionStatus {
    PENDING = "pending",
    COMPLETED = "completed",
    FAILED = "failed",
    CANCELLED = "cancelled"
}
export declare class TransactionEntity {
    id: string;
    amount: number;
    type: TransactionType;
    description: string;
    userId: string;
    userIp: string;
    sourceAccount: string;
    destinationAccount: string;
    status: TransactionStatus;
    referenceNumber: string;
    paymentMethod: string;
    currency: string;
    createdAt: Date;
    updatedAt: Date;
}
