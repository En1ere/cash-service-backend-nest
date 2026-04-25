import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "../auth/auth.module";
import { dataSourceOptions } from "../../db/data-source";
import { UtilsModule } from "../utils/utils.module";
import { ConfigModule } from '@nestjs/config';
import { JwtCoreModule } from "../jwt/jwt.module";
import { config } from 'dotenv';
config({ path: '.env' });

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
        JwtCoreModule,
        TypeOrmModule.forRoot(dataSourceOptions),
        UsersModule,
        AuthModule,
        UtilsModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
