import { UserEntity } from "../../shared/models/user.entity";

export class UserDto {
    id: number;
    name: string;
    email: string;
    uuid: string;

    constructor(entity: UserEntity) {
        this.id = entity.id;
        this.name = entity.name;
        this.email = entity.email;
        this.uuid = entity.uuid;
    }
}