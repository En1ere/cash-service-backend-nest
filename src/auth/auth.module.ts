import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../shared/models/user.entity";
import { RefreshTokenEntity } from "../shared/models/refresh-tokens.entity";
import { AuthService } from "./auth.service";
import { UsersService } from "../users/users.service";
import { AuthController } from "./auth.controller";
import { UuidService } from "../utils/uuid.service";
import { ConfigModule } from '@nestjs/config';
import { JwtCoreModule } from "../jwt/jwt.module";

@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forFeature([UserEntity, RefreshTokenEntity]),
        JwtCoreModule
    ],
    providers: [AuthService, UsersService, UuidService],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule {}
