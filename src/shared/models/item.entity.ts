import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { ItemCategoryEntity } from "./item-category.entity";
import {TransactionEntity} from "./transaction.entity";

@Entity("items")
export class ItemEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    total: number

    @ManyToOne(() => ItemCategoryEntity, item => item.itemId)
    category: ItemCategoryEntity

    @ManyToOne(() => TransactionEntity, item => item.items)
    @JoinColumn({ name: "transaction_id"})
    transactionId: TransactionEntity
}