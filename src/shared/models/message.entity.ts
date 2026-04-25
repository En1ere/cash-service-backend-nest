import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {UserEntity} from "./user.entity";

@Entity("messages")
export class MessageEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    content: string

    @Column()
    sentAt: Date

    @Column({ nullable: true })
    readAt: Date

    @Column({ nullable: true })
    deleteAt: Date

    @ManyToOne(() => UserEntity, item => item.outcomeMessages)
    author: UserEntity

    @ManyToOne(() => UserEntity, item => item.incomeMessages)
    addressee: UserEntity
}