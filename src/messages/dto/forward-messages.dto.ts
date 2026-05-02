import {UserEntity} from "../../shared/models/user.entity";

export class ForwardMessagesDto {
    messagesIds: number[]
    addressee: UserEntity
}