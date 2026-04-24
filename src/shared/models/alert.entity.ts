import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity("alerts")
export class AlertEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    content: string

    @Column()
    date: Date

    @Column()
    link: string

    @ManyToOne(() => UserEntity, item => item.alerts)
    userId: UserEntity
}