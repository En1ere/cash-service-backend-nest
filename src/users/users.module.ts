import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../shared/models/user.entity";
import { UtilsModule } from "../utils/utils.module";
import { RefreshTokenEntity } from "../shared/models/refresh-tokens.entity";
import { JwtCoreModule } from "../jwt/jwt.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity, RefreshTokenEntity]),
        UtilsModule,
        JwtCoreModule
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
