import {Controller, Get, UseGuards, Request, Param, Delete} from '@nestjs/common';
import { UsersService } from "./users.service";
import { UserFullDto } from "./dto/user-full.dto";
import { AuthGuard } from "../auth/auth.guard";
import {UserEntity} from "../shared/models/user.entity";

@Controller('users')
export class UsersController {
    constructor(
        private readonly service: UsersService
    ) {}

    @Get("me")
    @UseGuards(AuthGuard)
    async getMe(@Request() req: any): Promise<UserFullDto|null> {
        return await this.service.getMe(req.user?.id);
    }

    @Get()
    getActiveList(): Promise<UserFullDto[]> {
        return this.service.getActiveUsers()
    }

    @Get("all")
    getAllList(): Promise<UserFullDto[]> {
        return this.service.getAllUsers()
    }

    @Get(":uuid")
    async getById(@Param("uuid") uuid: string): Promise<UserFullDto> {
        return this.service.getUser(uuid)
    }

    @Delete("delete/:uuid")
    async softDeleteUserByUuid(@Param("uuid") uuid: string): Promise<UserEntity> {
        return this.service.softDeleteUserByUuid(uuid);
    }

    @Delete("hardDelete/:uuid")
    async hardDeleteUserByUuid(@Param("uuid") uuid: string): Promise<{deleted: number, success: boolean}> {
        return this.service.hardDeleteUserByUuid(uuid);
    }
}
