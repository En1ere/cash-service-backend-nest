import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {UserEntity} from "./user.entity";
import {ETransactionType} from "../../enums/transaction-type";
import {PaymentMethodEntity} from "./payment-method.entity";
import {ItemEntity} from "./item.entity";

@Entity("transactions")
export class TransactionEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: "receipt_image" })
    receiptImage: string

    @ManyToOne(() => UserEntity, item => item.history)
    @JoinColumn({ name: "user_id" })
    userId: UserEntity

    @OneToMany(() => ItemEntity, item => item.transactionId)
    items: ItemEntity[]

    @Column()
    totals: number

    @Column()
    date: Date

    @Column({ enum: ETransactionType })
    type: ETransactionType

    @OneToMany(() => PaymentMethodEntity, item => item.transactionId)
    @JoinColumn({ name: "payment_methods_id" })
    paymentMethodsIds: PaymentMethodEntity[]
}