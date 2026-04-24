import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PaymentMethodEntity } from "./payment-method.entity";

@Entity("payment_details")
export class PaymentDetailsEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: "card_number" })
    cardNumber: string

    @Column({ name: "brand_name" })
    brandName: string

    @Column({ name: "start_date" })
    startDate: Date

    @Column({ name: "expiration_date" })
    expirationDate: Date

    @Column({ name: "current_bonuses" })
    currentBonuses: number

    @ManyToOne(() => PaymentMethodEntity, item => item.paymentsDetails)
    @JoinColumn({ name: "payment_methods_id"})
    paymentMethodId: PaymentMethodEntity
}