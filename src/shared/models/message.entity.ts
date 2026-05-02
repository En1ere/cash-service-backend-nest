import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {UserEntity} from "./user.entity";

@Entity("messages")
export class MessageEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    content: string

    @Column({ default: false })
    forwarded: boolean

    @CreateDateColumn({ name: "create_at" })
    createAt: Date

    @Column({ name: "read_at", nullable: true })
    readAt: Date

    @UpdateDateColumn({ name: "updated_at", nullable: true })
    updatedAt: Date;

    @Column({ name: "deleted_at", nullable: true })
    deletedAt: Date

    @ManyToOne(() => UserEntity, item => item.outcomeMessages)
    author: UserEntity

    @ManyToOne(() => UserEntity, item => item.uuid)
    @JoinColumn({ name: "user_uuid" })
    userUuid: UserEntity

    @ManyToOne(() => UserEntity, item => item.incomeMessages)
    addressee: UserEntity
}