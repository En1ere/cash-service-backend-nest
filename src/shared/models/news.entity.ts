import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {UserEntity} from "./user.entity";

@Entity("news")
export class NewsEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    content: string

    @Column()
    image: string

    @Column()
    link: string

    @Column()
    date: Date

    @Column()
    readAt: Date

    @ManyToOne(() => UserEntity, item => item.news)
    @JoinColumn({ name: "user_id" })
    userId: UserEntity
}