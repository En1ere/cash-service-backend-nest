import {UserEntity} from "../../shared/models/user.entity";

export class CreateMessageDto {
    content: string
    author: UserEntity
    addressee: UserEntity
}

