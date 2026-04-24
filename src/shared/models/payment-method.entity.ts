import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { PaymentDetailsEntity } from "./payment-details.entity";
import {TransactionEntity} from "./transaction.entity";

@Entity("payment_methods")
export class PaymentMethodEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @ManyToOne(() => UserEntity, item => item.paymentMethods)
    @JoinColumn({ name: "user_id" })
    userId: UserEntity

    @OneToMany(() => PaymentDetailsEntity, item => item.paymentMethodId)
    @JoinColumn({ name: "payment_details"})
    paymentsDetails: PaymentDetailsEntity[]

    @ManyToOne(() => TransactionEntity, item => item.paymentMethodsIds)
    @JoinColumn({ name: "transaction_id" })
    transactionId: TransactionEntity
}