import {BaseEntity, Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ItemEntity} from "./item.entity";
import {ECategoryType} from "../../enums/category-type";

@Entity("item_category")
export class ItemCategoryEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @OneToMany(() => ItemEntity, item => item.category)
    @JoinColumn({ name: "item_id" })
    itemId: ItemEntity[]

    @Column({ enum: ECategoryType})
    type: ECategoryType
}