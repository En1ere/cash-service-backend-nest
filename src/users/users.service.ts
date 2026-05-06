import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../shared/models/user.entity";
import { DeleteResult, Repository } from "typeorm";
import { UserDto } from "./dto/user.dto";
import { SignUpDto } from "../auth/dto/sign-up.dto";
import { UuidService } from "../utils/uuid.service";
import { RefreshTokenEntity } from "../shared/models/refresh-tokens.entity";
import { NotFoundError } from "../exceptions/not-found.exception";

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
        const user:UserEntity|null = await this.usersRepository.findOne({
            where: {
                id
            }
        })

        if(!user) {
            throw new NotFoundError(
                'User not found',
                { userId: id },
            );
        }

        return user;
    }

    async getUserByEmail(email: string) {
        const user:UserEntity|null = await this.usersRepository.findOne({
            where: {
                email
            }
        })

        if(!user) {
            throw new NotFoundError(
                'User not found',
                { email },
            );
        }

        return user;
    }

    async getUserByLogin(login: string) {
        const user:UserEntity|null = await this.usersRepository.findOne({
            where: {
                login
            }
        })

        if(!user) {
            throw new NotFoundError(
                'User not found',
                { login },
            );
        }

        return user;
    }

    async getUserByUuid(uuid: string) {
        const user:UserEntity|null = await this.usersRepository.findOne({
            withDeleted: true,
            where: {
                uuid
            }
        })

        if(!user) {
            throw new NotFoundError(
                'User not found',
                { uuid },
            );
        }

        return user;
    }

    async getMe(id: number) {
        const user:UserEntity = await this.getUserById(id);
        return new UserDto(user as UserEntity)
    }

    async getAllUsers() {
        const users:UserEntity[] = await this.usersRepository.find({ withDeleted: true })
        return (users).map(user => new UserDto(user))
    }

    async getActiveUsers() {
        const users:UserEntity[] = await this.usersRepository.find()
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
        const user:UserEntity = await this.getUserByUuid(uuid)
        if (!user) {
            throw new NotFoundError(
                'User not found',
                { uuid },
            );
        }

        user.deletedAt = new Date();
        return await this.usersRepository.save(user);
    }

    async hardDeleteUserByUuid(uuid: string) {
        const userResult:DeleteResult = await this.usersRepository.delete({
            uuid
        })
        if (userResult.affected === 0) {
            throw new NotFoundError(
                'User not found',
                { uuid },
            );
        }

        return { deleted: userResult.affected, success: true }
    }
}
