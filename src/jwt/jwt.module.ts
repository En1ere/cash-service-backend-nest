import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Module({
    imports: [ConfigModule],
    providers: [
        {
            provide: JwtService,
            inject: [ConfigService],
            useFactory: (config: ConfigService) => {
                const secret = config.get<string>('JWT_SECRET');
                if (!secret) throw new Error('JWT_SECRET must be defined');
                return new JwtService({
                    secret,
                    signOptions: { expiresIn: '15m' },
                });
            },
        },
    ],
    exports: [JwtService],
})
export class JwtCoreModule {}