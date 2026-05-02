import { MessageEntity } from "../../shared/models/message.entity";
import { UserEntity } from "../../shared/models/user.entity";

export class MessageDto {
    id: number
    content: string
    author: UserEntity
    forwarded: boolean
    createAt: Date
    readAt: Date
    updatedAt: Date
    deletedAt: Date
    addressee: UserEntity

    constructor(entity: MessageEntity) {
        this.id = entity.id
        this.content = entity.content
        this.author = entity.author
        this.forwarded = entity.forwarded
        this.createAt = entity.createAt
        this.readAt = entity.readAt
        this.updatedAt = entity.updatedAt
        this.deletedAt = entity.deletedAt
        this.addressee = entity.addressee
    }
}
