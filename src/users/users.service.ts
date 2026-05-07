import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "../shared/models/user.entity";
import {DeleteResult, Repository} from "typeorm";
import {SignUpDto} from "../auth/dto/sign-up.dto";
import {UuidService} from "../utils/uuid.service";
import {NotFoundError} from "../exceptions/not-found.exception";
import {UserFullDto} from "./dto/user-full.dto";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly usersRepository: Repository<UserEntity>,
        private readonly uuidService: UuidService
    ) {}

    async getUserById(id: number):Promise<UserEntity|null> {
        return await this.usersRepository.findOne({
            where: {
                id
            }
        });
    }

    async getUserByEmail(email: string):Promise<UserEntity|null> {
        return await this.usersRepository.findOne({
            where: {
                email
            }
        });
    }

    async getUserByLogin(login: string):Promise<UserEntity|null> {
        return await this.usersRepository.findOne({
            where: {
                login
            }
        });
    }

    async getUserByUuid(uuid: string):Promise<UserEntity|null> {
        return await this.usersRepository.findOne({
            withDeleted: true,
            where: {
                uuid
            }
        });
    }

    async getMe(id: number):Promise<UserFullDto|null> {
        const user:UserEntity|null = await this.getUserById(id);
        if(!user) {
            throw new NotFoundError(
                'User not found',
                { id },
            );
        }

        return new UserFullDto(user as UserEntity)
    }

    async getUser(uuid: string): Promise<UserFullDto> {
        const user:UserEntity|null = await this.getUserByUuid(uuid);
        if(!user) {
            throw new NotFoundError(
                'User not found',
                { uuid },
            );
        }

        return new UserFullDto(user as UserEntity)
    }

    async getAllUsers():Promise<UserFullDto[]> {
        const users:UserEntity[] = await this.usersRepository.find({ withDeleted: true })
        return (users).map(user => new UserFullDto(user))
    }

    async getActiveUsers():Promise<UserFullDto[]> {
        const users:UserEntity[] = await this.usersRepository.find()
        return (users).map(user => new UserFullDto(user))
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

    async softDeleteUserByUuid(uuid: string): Promise<UserEntity> {
        const user:UserEntity|null = await this.getUserByUuid(uuid)
        if (!user) {
            throw new NotFoundError(
                'User not found',
                { uuid },
            );
        }

        user.deletedAt = new Date();
        return await this.usersRepository.save(user);
    }

    async hardDeleteUserByUuid(uuid: string): Promise<{deleted: number, success: boolean}> {
        const userResult:DeleteResult = await this.usersRepository.delete({
            uuid
        })
        if (userResult.affected === 0) {
            throw new NotFoundError(
                'User not found',
                { uuid },
            );
        }

        return { deleted: userResult.affected || 0, success: true }
    }
}
