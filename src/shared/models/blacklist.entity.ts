import {Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn} from 'typeorm';

@Entity('blacklist')
@Unique(['token']) // Гарантирует уникальность токенов в blacklist
export class BlacklistEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    token: string;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date
}
