import {Controller, Get, UseGuards, Request, Param, Delete} from '@nestjs/common';
import { UsersService } from "./users.service";
import { UserDto } from "./dto/user.dto";
import { AuthGuard } from "../auth/auth.guard";

@Controller('users')
export class UsersController {
    constructor(
        private readonly service: UsersService
    ) {}

    @Get("me")
    @UseGuards(AuthGuard)
    async getMe(@Request() req: any): Promise<UserDto> {
        return await this.service.getMe(req.user?.id);
    }

    @Get()
    getActiveList() {
        return this.service.getActiveUsers()
    }

    @Get("all")
    getAllList() {
        return this.service.getAllUsers()
    }

    @Get(":uuid")
    async getById(@Param("uuid") uuid: string) {
        return this.service.getUserByUuid(uuid)
    }

    @Delete("delete/:uuid")
    async softDeleteUserByUuid(@Param("uuid") uuid: string) {
        return this.service.softDeleteUserByUuid(uuid);
    }

    @Delete("hardDelete/:uuid")
    async hardDeleteUserByUuid(@Param("uuid") uuid: string) {
        return this.service.hardDeleteUserByUuid(uuid);
    }
}
