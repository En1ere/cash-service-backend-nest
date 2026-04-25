import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../shared/models/user.entity";
import { Repository } from "typeorm";
import { UserDto } from "./dto/user.dto";
import { SignUpDto } from "../auth/dto/sign-up.dto";
import { UuidService } from "../utils/uuid.service";
import { RefreshTokenEntity } from "../shared/models/refresh-tokens.entity";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(RefreshTokenEntity)
        private readonly refreshTokenRepository: Repository<RefreshTokenEntity>,
        @InjectRepository(UserEntity)
        private readonly usersRepository: Repository<UserEntity>,
        private readonly uuidService: UuidService
    ) {}

    async getUserById(id: number) {
        return await this.usersRepository.findOne({
            where: {
                id
            }
        })
    }

    async getUserByEmail(email: string) {
        return await this.usersRepository.findOne({
            where: {
                email
            }
        })
    }

    async getUserByLogin(login: string) {
        return await this.usersRepository.findOne({
            where: {
                login
            }
        })
    }

    async getUserByUuid(uuid: string) {
        return await this.usersRepository.findOne({
            withDeleted: true,
            where: {
                uuid
            }
        })
    }

    async getAllUsers() {
        let users:UserEntity[] = [];
        try {
           users = await this.usersRepository.find({ withDeleted: true })
        }
        catch(err) {
            console.log(err)
            return []
        }

        return (users).map(user => new UserDto(user))
    }

    async getActiveUsers() {
        let users:UserEntity[] = [];
        try {
            users = await this.usersRepository.find()
        }
        catch(err) {
            console.log(err)
            return []
        }

        return (users).map(user => new UserDto(user))
    }

    async createUser(payload: SignUpDto): Promise<UserEntity> {
        const { name, email, password, login } = payload;
        const user = new UserEntity();

        user.name = name
        user.login = login
        user.email = email
        user.password = password
        user.uuid = this.uuidService.generate()

        return await user.save()
    }

    async softDeleteUserByUuid(uuid: string) {
        const user = await this.getUserByUuid(uuid)
        if (!user) {
            throw new NotFoundException('User not found')
        }

        user.deletedAt = new Date();
        return await this.usersRepository.save(user);
    }

    async hardDeleteUserByUuid(uuid: string) {
        const userResult = await this.usersRepository.delete({
            uuid
        })

        if (userResult.affected === 0) {
            throw new NotFoundException('User not found');
        }

        return { deleted: userResult.affected, success: true }
    }
}
