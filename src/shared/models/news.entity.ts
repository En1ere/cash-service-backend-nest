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

    @Column({ nullable: true })
    image: string

    @Column({ nullable: true })
    link: string

    @Column()
    date: Date

    @Column({ nullable: true })
    readAt: Date

    @ManyToOne(() => UserEntity, item => item.news)
    @JoinColumn({ name: "user_id" })
    userId: UserEntity
}