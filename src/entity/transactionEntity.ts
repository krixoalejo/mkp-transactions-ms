import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

export enum TransactionType {
  DEPOSIT = "deposit",
  WITHDRAWAL = "withdrawal",
  TRANSFER = "transfer",
  PAYMENT = "payment"
}

export enum TransactionStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  FAILED = "failed",
  CANCELLED = "cancelled"
}

@Entity("transactions")
export class TransactionEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "decimal", precision: 15, scale: 2 })
  amount: number;

  @Column({
    type: "enum",
    enum: TransactionType,
    default: TransactionType.PAYMENT
  })
  type: TransactionType;

  @Column({ type: "varchar", length: 255, nullable: true })
  description: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  userId: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  userIp: string;

  @Column({ type: "varchar", length: 100 })
  sourceAccount: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  destinationAccount: string;

  @Column({
    type: "enum",
    enum: TransactionStatus,
    default: TransactionStatus.PENDING
  })
  status: TransactionStatus;

  @Column({ type: "varchar", length: 50, nullable: true })
  referenceNumber: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  paymentMethod: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  currency: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

// Asegurarse de que la entidad esté registrada para TypeORM
console.log("TransactionEntity loaded:", TransactionEntity.name);