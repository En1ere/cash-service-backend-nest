import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../shared/models/user.entity";
import { UtilsModule } from "../utils/utils.module";
import { RefreshTokenEntity } from "../shared/models/refresh-tokens.entity";
import { JwtCoreModule } from "../jwt/jwt.module";
import {BlacklistService} from "../blacklist/blacklist.service";
import {BlacklistEntity} from "../shared/models/blacklist.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity, RefreshTokenEntity, BlacklistEntity]),
        UtilsModule,
        JwtCoreModule
    ],
    controllers: [UsersController],
    providers: [UsersService, BlacklistService],
    exports: [UsersService],
})
export class UsersModule {}
