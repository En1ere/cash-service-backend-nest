import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity("refresh_tokens")
export class RefreshTokenEntity extends BaseEntity {
    @PrimaryColumn()
    token: string

    @Column()
    expires: Date

    @ManyToOne(() => UserEntity, item => item.refreshTokens, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: "user_id" })
    userId: UserEntity
}