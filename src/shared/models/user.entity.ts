import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EUserGender } from "../../enums/user-gender";
import { PaymentMethodEntity } from "./payment-method.entity";
import { TransactionEntity } from "./transaction.entity";
import { RefreshTokenEntity } from "./refresh-tokens.entity";
import { NewsEntity } from "./news.entity";
import { MessageEntity } from "./message.entity";
import { AlertEntity } from "./alert.entity";

@Entity("users")
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    login: string

    @Column()
    password: string

    @Column()
    email: string

    @Column()
    name: string

    @Column()
    lastName: string

    @Column()
    patronymic: string

    @Column()
    avatar: string

    @Column({ enum: EUserGender })
    gender: EUserGender

    @Column({ name: "date_of_birth" })
    dateOfBirth: Date

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date

    @CreateDateColumn({ name: "updated_at" })
    updatedAt: Date

    @CreateDateColumn({ name: "deleted_at" })
    deletedAt: Date

    @OneToMany(() => PaymentMethodEntity, item => item.userId)
    @JoinColumn({ name: "payment_methods" })
    paymentMethods: PaymentMethodEntity[]

    @OneToMany(() => TransactionEntity, item => item.userId)
    history: TransactionEntity[]

    @OneToMany(() => NewsEntity, item => item.userId)
    news: NewsEntity[]

    @OneToMany(() => MessageEntity, item => item.addressee)
    incomeMessages: MessageEntity[]

    @OneToMany(() => MessageEntity, item => item.author)
    outcomeMessages: MessageEntity[]

    @OneToMany(() => AlertEntity, item => item.userId)
    alerts: AlertEntity

    @OneToMany(() => RefreshTokenEntity, (item) => item.user)
    refreshTokens: RefreshTokenEntity[]
}