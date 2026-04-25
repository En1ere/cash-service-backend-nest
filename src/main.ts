import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import cookieParser from 'cookie-parser';
import { join } from 'path';
import { NestExpressApplication } from "@nestjs/platform-express";
import { config } from "dotenv"
config();

async function bootstrap() {
    const app: NestExpressApplication = await NestFactory.create(AppModule);

    const allowedOrigins = process.env.CORS_ORIGINS?.split(',') || [];

    app.enableCors({
        origin: allowedOrigins,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
        allowedHeaders: 'Content-Type, Authorization',
    });

    app.use(cookieParser());

    app.useStaticAssets(join(__dirname, '..', 'uploads'), {
        prefix: '/uploads/',
    });

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap().then();
