import { UserEntity } from "../../shared/models/user.entity";
import {EUserGender} from "../../types/enums/UserGenderType";

export class UserFullDto {
    login: string;
    name: string;
    email: string;
    uuid: string;
    lastName: string;
    patronymic: string;
    avatar: string;
    gender: EUserGender;
    dateOfBirth: Date;
    createdAt: Date;

    constructor(entity: UserEntity) {
        this.login = entity.login;
        this.name = entity.name;
        this.email = entity.email;
        this.uuid = entity.uuid;
        this.lastName = entity.lastName;
        this.patronymic = entity.patronymic;
        this.avatar = entity.avatar;
        this.gender = entity.gender;
        this.dateOfBirth = entity.dateOfBirth;
        this.createdAt = entity.createdAt;
    }
}